const mongoose = require('mongoose');
const User = require('../../models/user');
const Community = require('../../models/community');
const {validateCommunityExists, validateSelfIsNotAdmin, validateSelfIsNotMember, validateSelfIsAdmin,
    validateIsNotMember,validateIsBlocked, validateIsPending,validateIsNotBlocked, validateIsMember, validateUserExists,
    validateIsNotAdmin
} = require("../../services/validator");



const acceptCommunityJoinRequestValidation = () => {
    return [
        validateSelfIsAdmin(),
        validateIsNotMember(),
        validateIsNotBlocked(),
        validateIsPending(),
    ];
};


async function acceptCommunityJoinRequest(req, res) {
    const communityId = req.params.communityId;
    const userId = req.body.userId;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const community = await Community.findById(communityId).session(session);
        if (!community) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Community not found' });
        }

        if (!community.members.membersList.includes(userId)) {
            community.members.membersList.push(userId);
        }

        const index = community.members.pendingJoinRequests.indexOf(userId);
        if (index > -1) {
            community.members.pendingJoinRequests.splice(index, 1);
        }

        await community.save({ session });

        const user = await User.findById(userId).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'User not found' });
        }

        user.joinedCommunities.push({ communityId: communityId });

        await user.save({ session });
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: 'User Successfully added to the community' });

    } catch (error) {
        console.error('Error in acceptCommunityJoinRequest:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const rejectCommunityJoinRequestValidation = () => {
    return [
        validateSelfIsAdmin(),
        validateIsNotMember(),
        validateIsPending(),
    ];
};


async function rejectCommunityJoinRequest(req, res) {
    const communityId = req.params.communityId;
    const userId = req.body.userId;  // Assuming you're passing the user ID in the request body

    try {
        const community = await Community.findById(communityId);
        community.members.pendingJoinRequests.pull(userId);
        await community.save();

        res.status(200).json({ message: 'Rejected request successfully' });
    } catch (error) {
        console.error('Error in rejectCommunityJoinRequest:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const removeMemberValidation = () => {
    return [
        validateSelfIsAdmin(),
        validateIsNotAdmin(),
        validateIsMember(),
    ];
};


async function removeMember(req, res) {
    const { communityId } = req.params;
    const { userId } = req.body;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const community = await Community.findById(communityId).session(session);

        // Remove the user from the community's members list
        community.members.membersList.pull(userId);
        await community.save({ session });

        // Find the user and remove the community from their joined communities
        const user = await User.findById(userId).session(session);
        user.joinedCommunities.pull({ communityId });
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Member removed successfully',
            communityId: communityId
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error in removeMember:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



const blockUserValidation = () => {
    return [
        validateSelfIsAdmin(),
        validateIsNotAdmin(),
        validateIsMember(),
        validateIsNotBlocked(),
    ];
};


async function blockUser(req, res) {
    const { communityId } = req.params;
    const { userId } = req.body;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const community = await Community.findById(communityId).session(session);
        const user = await User.findById(userId).session(session);

        if (!community || !user) {
            throw new Error('Community or User not found');
        }

        // Block the user in the community
        community.members.blockedUsers.push(userId);
        community.members.membersList.pull(userId); // Remove user from community members list
        await community.save({ session }); // Pass the session to the save method

        // Remove the community from the user's joined communities
        user.joinedCommunities = user.joinedCommunities.filter(joinedCommunity =>
            joinedCommunity._id.toString() !== communityId
        );
        await user.save({ session }); // pass the session to the save method

        await session.commitTransaction();
        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error in blockUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        session.endSession();
    }
}






const unblockUserValidation = () => {
    return [
        validateSelfIsAdmin(),
        validateUserExists(),
        validateIsBlocked(),

    ];
};


async function unblockUser(req, res) {
    const { communityId } = req.params;
    const { userId } = req.body;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const community = await Community.findById(communityId).session(session);

        const index = community.members.blockedUsers.indexOf(userId);
        if (index !== -1) {
            community.members.blockedUsers.splice(index, 1);
            await community.save({ session });
        } else {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'User is not blocked' });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
        // If there is an error, abort the transaction and log the error
        await session.abortTransaction();
        session.endSession();
        console.error('Error in unblockUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    acceptCommunityJoinRequestValidation,
    acceptCommunityJoinRequest,
    rejectCommunityJoinRequest,
    rejectCommunityJoinRequestValidation,
    removeMemberValidation,
    removeMember,
    blockUserValidation,
    blockUser,
    unblockUserValidation,
    unblockUser
};