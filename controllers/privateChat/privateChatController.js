// createPrivateChat(): users
// getPrivateChatMessages(): Get messages from a private chat with pagination
// sendPrivateChatMessage(): create a message and add it to the private chat messages list
// deletePrivateChatMessage(): delete a message and remove it from the private chat messages list (by the message author only)

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
    // Retrieve messages from a private chat with the provided ID, with pagination.
    // PaginationOptions might include details about which page of results to retrieve and how many results per page.
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
