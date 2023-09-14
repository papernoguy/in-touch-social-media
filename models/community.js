const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({

    name: String,
    bio: String,
    photoRef: String,
    dateCreated: { type: Date, default: Date.now },

    privacySettings: {
        approvalPolicy: {
            type: String,
            enum: ['auto-join', 'admin-approval'],
            default: 'admin-approval'
        },
        visibility: {
            type: String,
            enum: ['visible', 'hidden'],
            default: 'visible'
        }
    },

    members: {
        adminsList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        membersList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        pendingJoinRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        blockedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },

    chatRooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom'
    }]
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;