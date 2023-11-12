const mongoose = require('mongoose');

const privateChatSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messagesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    time: {
        type: Date,
        default: Date.now
    },
});

const PrivateChat = mongoose.model('PrivateChat', privateChatSchema);
module.exports = PrivateChat;