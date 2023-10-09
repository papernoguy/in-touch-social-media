const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Chat = require('../models/privateChat');
const Community = require('../models/community');


const { validationResult } = require("express-validator");

function validateCommunityCreation(req) {
    if (!req.body.name || typeof req.body.name !== 'string') {
        throw new Error('Name is required and should be a string');
    }
    if (!req.body.bio || typeof req.body.bio !== 'string') {
        throw new Error('Bio is required and should be a string');
    }
    if (!req.body.photoRef || typeof req.body.photoRef !== 'string') {
        throw new Error('PhotoRef is required and should be a string');
    }
    // Add more validations as needed
}



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
