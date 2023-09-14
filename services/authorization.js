const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Chat = require('../models/privateChat');
const Community = require('../models/community');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    return null;
}

function isPostAuthor(req, res, next) {
    return null;
}

function isCommentAuthor(req, res, next) {
    return null;
}

function canAccessPrivateChat(req, res, next) {
    return null;
}

function isCommunityMember(req, res, next) {
    return null;
}

function isCommunityAdmin(req, res, next) {
    return null;
}

module.exports = {
    verifyToken,
    isPostAuthor,
    isCommentAuthor,
    canAccessPrivateChat,
    isCommunityMember,
    isCommunityAdmin
};
   
