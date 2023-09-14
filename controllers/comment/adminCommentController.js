const Comment = require('../../models/comment');

function deleteCommentByAdmin(commentId) {
    // Allows an admin to delete any comment by its ID.
    return null;
}

module.exports = {
    deleteCommentByAdmin
};
