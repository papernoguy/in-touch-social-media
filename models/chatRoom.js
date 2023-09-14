const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    chatName: String,
    postsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    Subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;