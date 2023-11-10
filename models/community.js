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
            default: [],
        }],
        pendingJoinRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }],
        blockedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }]
    },

    chatRooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom',
        default: [],
    }]
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;