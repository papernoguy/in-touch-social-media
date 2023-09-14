const Notification = require('../../models/notification');
const User = require('../../models/user');
const Chatroom = require('../../models/chatRoom');

function muteNotificationFromChatroom(userId, chatroomId) {
    //ChatRoomObserversList
    return null;
}

function unmuteNotificationFromChatroom(userId, chatroomId) {
    return null;
}

function clearNotification(userId, notificationId) {
    return null;
}

function getNotifications(userId) {
    return null;
}

module.exports = {
    muteNotificationFromChatroom,
    unmuteNotificationFromChatroom,
    clearNotification,
    getNotifications
};
