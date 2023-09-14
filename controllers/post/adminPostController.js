const Post = require('../../models/post');

function deletePostByAdmin(postId) {
    // Allows an admin to delete any post, regardless of the original author.
    return null;
}

module.exports = {
    deletePostByAdmin
};
