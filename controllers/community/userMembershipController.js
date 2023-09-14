const User = require('../../models/user');
const Community = require('../../models/community');

function sendCommunityJoinRequest(communityId, userId) {
    // add the user the pendingJoinRequests of a community, and add the community to the pendingJoinRequests of the user.
    return null;
}

function cancelCommunityJoinRequest(communityId, userId) {
    // remove the user from the pendingJoinRequests of a community, and remove the community from the pendingJoinRequests of the user.
    return null;
}

function removeFromJoinedCommunities(communityId, userId) {
    // remove the community from the joinedCommunities of a user,
    // and remove the user from the members list of the community.
    return null;
}

//function getShareLink(communityId) {
    // Generate a unique shareable link for a community's info page.
//    return null;
//}

module.exports = {
    sendCommunityJoinRequest,
    cancelCommunityJoinRequest,
    removeFromJoinedCommunities,
};



