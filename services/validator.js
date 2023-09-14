const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Chat = require('../models/privateChat');
const Community = require('../models/community');

function validateMessageData(req, res, next) {
}
function validateUserCreation(req, res, next) {
    return null;
}

function validateUserUpdate(req, res, next) {
    return null;
}

function validatePostCreation(req, res, next) {
    return null;
}

function validateCommentCreation(req, res, next) {
    return null;
}

function validatePrivateChatCreation(req, res, next) {
    return null;
}

function validatePrivateChatMessage(req, res, next) {
    return null;
}

function validateFriendRequest(req, res, next) {
    return null;
}

function validateCommunityCreation(req, res, next) {
    return null;
}

function validateChatRoomCreation(req, res, next) {
    return null;
}

function validateCommunityJoinRequest(req, res, next) {
    return null;
}

function validatePaginationParams(req, res, next) {
    return null;
}
function validateSearchQuery(req, res, next) {
    return null;
}

function validateCommunityUpdate(req, res, next) {
    return null;
}

module.exports = {
    validateUserCreation,
    validateUserUpdate,
    validatePostCreation,
    validateCommentCreation,
    validatePrivateChatCreation,
    validatePrivateChatMessage,
    validateFriendRequest,
    validateCommunityCreation,
    validateChatRoomCreation,
    validateCommunityJoinRequest,
    validatePaginationParams,
    validateMessageData,
    validateSearchQuery,
    validateCommunityUpdate
};
