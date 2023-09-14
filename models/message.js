const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: { type: Date, default: Date.now },
    originalText: String,
    tickerInfo: {
        type: String, default: null,
    },
    mediaRef: String

});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;