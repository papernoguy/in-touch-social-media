// privateChat.controller.js
const PrivateChat = require('../../models/privateChat');
const Message = require('../../models/message');
const User = require('../../models/user');
const { createMessage, getMessageById } = require('../message/massageController');

async function createPrivateChat(user1Id, user2Id) {
    // cehck if it doesnt exist and user not blocked
    //create a new private chat instance.
    const user1 = await User.findOne({ _id: user1Id });
    const user2 = await User.findOne({ _id: user2Id });
    await PrivateChat.findOne({
        $and: [
            { user1: user1Id }, // Search by email
            { user2: user2Id }, // Search by username
        ],
    }).then((chat) => {
        if (!chat) {
            const privateChat = new PrivateChat({
                user1: user1,
                user2: user2,
                messagesList: []
            });
            return privateChat.save().then(() => {
                console.log('Chat created successfully');
            });
        } else {
            console.log('Chat already exsist');
        }
    })
}

async function getPrivateChatMessages(privateChatId) {
    const chat = await PrivateChat.findById(privateChatId)
    for (const messageId of chat.messagesList) {
        try {
          const message = await getMessageById(messageId.toString());
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
}



async function sendPrivateChatMessage(privateChatId, messageData, userId) {
    // Logic to create a new message and add it to the list of messages in a private chat.
    const message = await createMessage(messageData, userId);
    const chatFilter = { _id: privateChatId };
    const updatechat = {
        $push: { "messagesList": message }
    };
    const result = await PrivateChat.updateOne(chatFilter, updatechat)
    if (result) {
        console.log("Chat Updated Successfuly");
    }
    else {
        console.log("User not found.");
    }
}



async function deletePrivateChatMessage(privateChatId, messageId) {
    const chatFilter = { _id: privateChatId };
    const updatechat = {
        $pull: { "messagesList": messageId }
    };
    const chatResult = await PrivateChat.updateOne(chatFilter, updatechat)
    const messageResult = await Message.findByIdAndRemove(messageId)
    if (chatResult) {
        console.log("Chat Updated Successfuly");
    }
    else {
        console.log("Chat not found.");
    }
    if (messageResult) {
        console.log("Message deleted Successfuly");
    }
    else {
        console.log("Message not found.");
    }
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
