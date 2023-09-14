const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;