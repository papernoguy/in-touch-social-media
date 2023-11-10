const mongoose = require('mongoose');
const Community = require('../../models/community');
const User = require('../../models/user');
const {param, body} = require('express-validator');
const {validateObjectId, validateCommunityExists, validateSelfIsNotPending, validateSelfIsNotAdmin, validateSelfIsNotMember,
    validateSelfIsNotBlocked, validateSelfIsPending,
    validateSelfIsMember
} = require("../../services/validator");


const sendCommunityJoinRequestValidation = () => {
    return [
        validateCommunityExists(),
        validateSelfIsNotMember(),
        validateSelfIsNotAdmin(),
        validateSelfIsNotPending(),
        validateSelfIsNotBlocked(),
    ];
};


async function sendCommunityJoinRequest(req, res) {
    const userId = req.session.userId;
    const communityId = req.params.communityId;
    try {
        const community = await Community.findById(communityId);
        if (community.privacySettings.approvalPolicy === 'auto-join') {
            community.members.membersList.push(userId);
            const user = await User.findById(userId);
            user.joinedCommunities.push(communityId);
            await user.save();
        } else {
            community.members.pendingJoinRequests.push(userId);
        }

        const updatedCommunity = await community.save();
        res.status(200).json({
            message: community.privacySettings.approvalPolicy === 'auto-join' ? 'Joined community successfully' : 'Join request sent successfully',
            community: updatedCommunity
        })

    } catch (error) {
        console.error('Error in sendCommunityJoinRequest:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const cancelCommunityJoinRequestValidation = () => {
    return [
        validateCommunityExists(),
        validateSelfIsPending(),
    ];
};


async function cancelCommunityJoinRequest(req, res) {
    const userId = req.session.userId;
    const communityId = req.params.communityId;
    try {
        const community = await Community.findById(communityId);

        // double check if the user has a pending join request
        const requestIndex = community.members.pendingJoinRequests.indexOf(userId);
        if (requestIndex > -1) {
            community.members.pendingJoinRequests.splice(requestIndex, 1);
        } else {
            return res.status(400).json({ message: 'No pending join request to cancel' });
        }

        const updatedCommunity = await community.save();
        res.status(200).json(updatedCommunity);

    } catch (error) {
        console.error('Error in cancelCommunityJoinRequest:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const leaveCommunityValidation = () => {
    return [
        validateSelfIsNotAdmin(),
        validateSelfIsMember(),
    ];
};


async function leaveCommunity(req, res) {
    const userId = req.session.userId;
    const communityId = req.params.communityId;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const community = await Community.findById(communityId).session(session);
        const user = await User.findById(userId).session(session);

        //remove user from community
        community.members.membersList.pull(userId);

        //remove community from user
        user.joinedCommunities = user.joinedCommunities.filter(joinedCommunity =>
            joinedCommunity._id.toString() !== communityId
        );

        await community.save({ session });
        await user.save({ session });
        await session.commitTransaction();

        res.status(200).json({
            message: 'Successfully left the community',
            communityId: communityId
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error in leaveCommunity:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        session.endSession();
    }
}





module.exports = {
    sendCommunityJoinRequest,
    cancelCommunityJoinRequest,
    leaveCommunity,
    sendCommunityJoinRequestValidation,
    cancelCommunityJoinRequestValidation,
    leaveCommunityValidation,
};



