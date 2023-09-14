const mongoose = require('mongoose');

// Define the Post schema
const PostSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Assuming you have a User model
    },
    text: {
        type: String,
        required: true
    },
    likesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Each like references a User who liked the post
    }],
    commentsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'  // Each comment id references a Comment model
    }],
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    //Add additional media

});

// Create the model from the schema
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;  // Export the model to use elsewhere in your project
