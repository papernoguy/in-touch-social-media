const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    originalText: String,
    tickerInfo: {
        type: String, default: null,
    },
    mediaRef: String,
    time: { type: Date, default: Date.now },

});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;