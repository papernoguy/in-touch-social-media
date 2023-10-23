const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Chat = require('../models/privateChat');
const Community = require('../models/community');


function isAdmin(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const userId=  req.session.userId;
    const community = Community.findById(communityId);
    Community.findById(communityId)
            .then(community => {
                if (community.members.adminsList.includes(userId)) {
                    console.log("isAdmin true")
                    next();
                } else {
                    res.status(403).json({ message: 'No authorization, you are not the admin of the following community' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Something went wrong' });
            });

}
function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(403).json({ message: 'No authorization, you are not logged in' });
    }
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
    isAdmin,
    isLoggedIn,
    isPostAuthor,
    isCommentAuthor,
    canAccessPrivateChat,
    isCommunityMember,
    isCommunityAdmin
};
   
