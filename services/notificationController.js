const Notification = require('../models/notification');
const User = require('../models/user');
function generateNewMessageNotification(senderId, receiverId, messageId) {
    // create a notification when a user receives a new message.
    // checking if the receiver has notifications enabled, then creating the notification.
    return null;
}

function generateFriendRequestNotification(senderId, receiverId) {
    return null;
}

function generateFriendRequestAcceptedNotification(senderId, receiverId) {
    return null;
}

function generateNewCommentNotification(postAuthorId, commenterId, postId) {
    return null;
}
function generateNewPostNotification(senderId, receiverId, messageId) {
    // create a notification when a user receives a new message.
    // checking if the receiver has notifications enabled, then creating the notification.
    return null;
}

module.exports = {
    generateNewMessageNotification,
    generateFriendRequestNotification,
    generateFriendRequestAcceptedNotification,
    generateNewCommentNotification
};


//implements CRUD
