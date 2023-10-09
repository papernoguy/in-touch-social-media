const User = require('../../models/user');
const Community = require('../../models/community');
function acceptCommunityJoinRequest(communityId, userId) {
    // add the user to members list of a community,
    // and add the community to the joinedCommunities of the user.
    // then remove from pending and sent requests.
    return null;
}

function rejectCommunityJoinRequest(communityId, userId) {
    // remove the user from the pendingJoinRequests of a community,
    //and remove the community from the pendingJoinRequests of the user./
    return null;
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