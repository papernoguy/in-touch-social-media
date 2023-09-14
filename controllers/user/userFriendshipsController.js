//userFriendships.controller.js
const User = require('../../models/user');

function sendFriendRequest(senderId, receiverId) {
    // Add user to the pendingFriendRequests of another user,
    // and add the other user to the sentFriendRequests of the user.
}

function cancelFriendRequest(senderId, receiverId) {
    // Remove user from the pendingFriendRequests of another user,
    // and remove the other user from the sentFriendRequests of the user.
}

function acceptFriendRequest(senderId, receiverId) {
    // Add user to the friends list of another user,
    // and add the other user to the friends list of the user.
    // Then remove from pending and sent requests.
}

function rejectFriendRequest(senderId, receiverId) {
    // Remove user from the pendingFriendRequests of another user,
    // and remove the other user from the sentFriendRequests of the user.
}

function removeFromFriendsList(userId, friendId) {
    // Remove user from the friends list of another user,
    // and remove the other user from the friends list of the user.
}

function addToBlockList(blockerId, blockedUserId) {
    // Add user to the block list of another user,
    // and add the other user to the block list of the user.
}

function removeFromBlockList(blockerId, blockedUserId) {
    // Remove user from the block list of another user,
    // and remove the other user from the block list of the user.
}

module.exports = {
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFromFriendsList,
    addToBlockList,
    removeFromBlockList
};
