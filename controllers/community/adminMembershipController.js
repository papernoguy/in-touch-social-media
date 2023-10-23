const User = require('../../models/user');
const Community = require('../../models/community');
async function acceptCommunityJoinRequest(req, res) {
    const communityId = req.body.communityId || req.params.communityId;
    const userId = req.body.userId || req.params.userId;

    // Find the community and update its members and pendingJoinRequests list
    const community = await Community.findById(communityId);
    community.members.membersList.push(userId);
    const index = community.members.pendingJoinRequests.indexOf(userId);
    if (index > -1) {
        community.members.pendingJoinRequests.splice(index, 1);
    }
    await community.save();

    // Find the user and update its joinedCommunities list
    //const user = await User.findById(userId);
    //user.joinedCommunities.push({ communityId: communityId, dateJoined: new Date() });
    //await user.save();

    res.status(200).json({ message: 'Successfully accepted the join request' });
}


async function rejectCommunityJoinRequest(req, res) {
    const communityId = req.body.communityId || req.params.communityId;
    const userId = req.body.userId || req.params.userId;

    // Find the community and remove the user from its pendingJoinRequests list
    const community = await Community.findById(communityId);
    const index = community.members.pendingJoinRequests.indexOf(userId);
    if (index > -1) {
        community.members.pendingJoinRequests.splice(index, 1);
    }
    await community.save();

    res.status(200).json({ message: 'Successfully rejected the join request' });
}

function removeMember(communityId, userId) {
    //remove the community from the joinedCommunities of a user, and remove the user from the members list of the community.
    return null;
}

function blockUser(communityId, userId) {
    // add the user to the blockedUsers list of a community
    return null;
}

function unblockUser(communityId, userId) {
    // remove the user from the blockedUsers list of a community
    return null;
}

module.exports = {
    acceptCommunityJoinRequest,
    rejectCommunityJoinRequest,
    removeMember,
    blockUser,
    unblockUser
};