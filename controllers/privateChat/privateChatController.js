// privateChat.controller.js
const PrivateChat = require('../../models/privateChat');
const Message = require('../../models/message');
const User = require('../../models/user');

function createPrivateChat(user1Id, user2Id) {
    // cehck if it doesnt exist and user not blocked
    //create a new private chat instance.
    return null;
}

function getPrivateChatMessages(privateChatId, paginationOptions) {
    // PaginationOptions =  how many messages to return and from which index
    return null;
}

function sendPrivateChatMessage(privateChatId, messageData) {
    // Logic to create a new message and add it to the list of messages in a private chat.
    return null;
}

function deletePrivateChatMessage(privateChatId, messageId, userId) {
    // Logic to delete a message from a private chat.
    // Ensure that the message is either owned by the user or the user has appropriate permissions to delete it.
    return null;
}

module.exports = {
    createPrivateChat,
    getPrivateChatMessages,
    sendPrivateChatMessage,
    deletePrivateChatMessage
};
