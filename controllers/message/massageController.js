// userMessage.controller.js
const Message = require('../../models/message');
const User = require('../../models/user');


const { validateMessageData } = require('../../services/validator'); // Import the validation middleware
function createMessage(messageData) {
    // if the massage contains ticker symbol like "$AAPL" call tickerInfoService to get the ticker info and substring it to the message:
    // example: "Hello World! $AAPL" -> "Hello World! $AAPL, Ticker: $AAPL, Price: 123.45, Change: +1.23"
    return null;
}

function deleteMessage(messageId, userId) {
    // Ensure that the message is by the user
    return null;
}

function getMessageById(messageId) {
    // Retrieve a specific message by its ID.
    // This would involve querying your database for a message with the given ID.
    return null;
}

function listMessagesByUser(userId) {
    // List all messages sent by a specific user.
    // This would involve querying your database for all messages with a sender ID matching the provided user ID.
    return null;
}

module.exports = {
    createMessage,
    deleteMessage,
    getMessageById,
    listMessagesByUser
};
