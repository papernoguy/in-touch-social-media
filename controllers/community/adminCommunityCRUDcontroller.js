const Community = require('../../models/community');
const User = require('../../models/user');
const {body} = require("express-validator");
const {Types} = require("mongoose");
const {validateCommunityExists, validateUserExists, validateIsMember, validateIsNotAdmin, validateSelfIsAdmin,
    validateCommunityDetails, validateOtherAdminsExist
} = require("../../services/validator");
const mongoose = require('mongoose');


const addAdminValidation = () => {
    return [
        validateUserExists(),
        validateIsMember(),
        validateIsNotAdmin(),
    ];
};

async function addAdmin(req, res) {
    const { communityId } = req.params;
    const { userId } = req.body;
    try {
        const community = await Community.findById(communityId);

        community.members.adminsList.push(userId);
        community.members.membersList.pull(userId);

        const updatedCommunity = await community.save();
        res.status(200).json({
            message: 'Admin added successfully',
            community: updatedCommunity
        });

    } catch (error) {
        console.error('Error in addAdmin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



const resignAsAdminValidation = () => {
    return [
        validateSelfIsAdmin(),
        validateOtherAdminsExist(),
    ];
};


async function resignAsAdmin(req, res) {
    console.log("resignAsAdmin called");
    const { communityId } = req.params;
    const resigningAdminId = req.session.userId; // This should be used to identify the resigning admin

    try {
        const community = await Community.findById(communityId);

        community.members.adminsList.pull(resigningAdminId);
        community.members.membersList.push(resigningAdminId);
        const updatedCommunity = await community.save();

        res.status(200).json({
            message: 'Admin resigned successfully',
            community: updatedCommunity
        });

    } catch (error) {
        console.error('Error in resignAsAdmin:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



const updateCommunityValidation = () => {
    return [
        validateCommunityExists(),
        validateSelfIsAdmin(),
        validateCommunityDetails(),
    ];
};


async function updateCommunityDetails(req, res) {

    try {
        // Extract communityId from the request parameters
        const { communityId } = req.params;
        let community = await Community.findById(communityId);
        const { name, bio, approvalPolicy, visibility, photoRef } = req.body;
        if (name)
            community.name = name;
        if (bio)
            community.bio = bio;
        if (approvalPolicy)
            community.approvalPolicy = approvalPolicy;
        if (visibility)
            community.visibility = visibility;
        if (photoRef)
            community.photoRef = photoRef;

        const updatedCommunity = await community.save();
        return res.status(200).json({ message: "Community updated successfully", community: updatedCommunity });

    } catch (error) {
        return res.status(500).json({ message: "Error saving the community" });
    }
}


const deleteCommunityValidation = () => {
    return [
        validateSelfIsAdmin(),
    ];
};


async function deleteCommunity(req, res) {
    const communityId = req.params.communityId;
    const session = await mongoose.startSession(); // Start a new session for the transaction
    session.startTransaction(); // Start the transaction

    try {
        const community = await Community.findById(communityId);
        if (!community) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Community not found" });
        }

        await Community.findByIdAndDelete(communityId, { session });

        await User.updateMany(
            { 'joinedCommunities.communityId': communityId },
            { $pull: { joinedCommunities: { communityId: communityId } } },
            { session } // Pass the session to this operation as well
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        //TODO: delete all messages, chatrooms etc. related to this community
        //TODO: redirect somewhere else

        res.status(200).json({ message: "Community deleted successfully" });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error:", err);
        res.status(500).json({ message: "An error occurred" });
    }
}


module.exports = {
    addAdminValidation,
    addAdmin,
    resignAsAdminValidation,
    resignAsAdmin,
    updateCommunityValidation,
    updateCommunityDetails,
    deleteCommunityValidation,
    deleteCommunity,
};
