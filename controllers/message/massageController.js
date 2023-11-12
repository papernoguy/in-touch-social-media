// userMessage.controller.js
const Message = require('../../models/message');
const User = require('../../models/user');
const { getStockData } = require('../../services/tickerInfoService')


const { validateMessageData } = require('../../services/validator'); // Import the validation middleware
async function createMessage(messageData, userId) {
    // if the massage contains ticker symbol like "$AAPL" call tickerInfoService to get the ticker info and substring it to the message:
    // example: "Hello World! $AAPL" -> "Hello World! $AAPL, Ticker: $AAPL, Price: 123.45, Change: +1.23"
    const user = await User.findOne({ _id: userId });
    const regex = /\$[^\s]*/g;
    const matches = messageData.match(regex);
    tickerName = matches[0].replace(/\$/g, '');
    const tickerData = await getStockData(tickerName);
    const message = new Message({ author: user, originalText: messageData, tickerInfo: tickerData })
    await message.save()
    return message
}

async function deleteMessage(messageId, userId) {
    // Ensure that the message is by the user
    const result = await Message.deleteOne({ _id: messageId, author: userId });
    if (result) {
        console.log("Message deleted Successfuly.");
    }
    else {
        console.log("Message not found.");
    }
}

async function getMessageById(messageId) {
    // Retrieve a specific message by its ID.
    // This would involve querying your database for a message with the given ID.
    const message = await Message.findById(messageId);
    return message
}

async function listMessagesByUser(userId) {
    // List all messages sent by a specific user.
    // This would involve querying your database for all messages with a sender ID matching the provided user ID.
    const messagesFromUser = await Message.find({ author: userId });
    return messagesFromUser
}

module.exports = {
    createMessage,
    deleteMessage,
    getMessageById,
    listMessagesByUser
};
