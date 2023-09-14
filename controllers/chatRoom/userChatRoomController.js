//adminChatRoomCRUD.controller
const ChatRoom = require('../../models/chatRoom');
const Post = require('../../models/post');

function getChatRoomPosts(chatRoomId, paginationDetails) {
    // Retrieves all posts in a specific chatRoom, using the provided pagination details.
    return null;
}

function getChatRoomById(chatRoomId) {
    // Fetches the details of a specific chatRoom by its ID.
    return null;
}
function muteChatRoomByUserId(userId) {

    return null;
}

module.exports = {
    getChatRoomPosts,
    getChatRoomById,
    muteChatRoomByUserId
};
