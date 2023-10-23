const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePictureRef: {
        type: String,
        default: '/path/to/default/image.jpg',

    },
    address: {
        type: String,
        default: 'homeless'
    },
    bio: {
        type: String,
        default: 'Hey there im using [app name]'
    },
    
    //not necessary and maybe harmful
    joinedCommunities: [{
        communityId: {  //communities list with the date joined
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        },
        dateJoined: {
            type: Date,
            default: Date.now
        },
    }],

    friends: {
        friendsList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        pendingFriendRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        receivedFriendRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    blockedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    notificationsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }]
});


const User = mongoose.model('User', UserSchema);
module.exports = User;