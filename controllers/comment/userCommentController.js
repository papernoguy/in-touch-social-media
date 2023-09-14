const User = require('../../models/user');
const Comment = require('../../models/comment'); // Assuming you have a Comment model separate from User.

function createComment(userId, commentContent) {

}

function deleteComment(userId, commentId) {
    // Delete the comment (by the comment author only).
    // use authorisation to check if the user is the author of the comment.
}

function getCommentById(commentId) {

}

module.exports = {
    createComment,
    deleteComment,
    getCommentById
};
