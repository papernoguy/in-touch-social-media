const User = require('../../models/user');
const Community = require('../../models/community');

function sendCommunityJoinRequest(req, res) {
    // it can be auto-approval//
    const userId = req.session.userId;
    const communityId = req.body.communityId || req.params.communityId;
    Community.findById(communityId).then(community => {
        community.members.pendingJoinRequests.push(userId);
        community.save().then(() => {
            res.status(200).json(community);
        });
    })
}

function cancelCommunityJoinRequest(req, res) {
    // remove the user from the pendingJoinRequests of a community
    const userId = req.session.userId;
    const communityId = req.body.communityId || req.params.communityId;
    Community.findById(communityId).then(community => {
        const index = community.members.pendingJoinRequests.indexOf(userId);
        community.members.pendingJoinRequests.splice(index, 1);
        community.save().then(() => {
            res.status(200).json(community);
        });
    });
}


function leaveCommunity(req, res) {
    const userId = req.session.userId;
    const communityId = req.body.communityId || req.params.communityId;

    // Find and update the community
    Community.findById(communityId).then(community => {
        const index = community.members.membersList.indexOf(userId);
        if (index > -1) {
            community.members.membersList.splice(index, 1);
        }
        community.save();
    });

    // Find and update the user
    User.findById(userId).then(user => {
        const joinedCommunities = user.joinedCommunities;
        const communityIndex = joinedCommunities.findIndex(c => c.communityId.toString() === communityId);

        if (communityIndex > -1) {
            joinedCommunities.splice(communityIndex, 1);
        }
        user.save();
    });
    res.status(200).json({ message: 'Successfully left the community' });
}



module.exports = {
    sendCommunityJoinRequest,
    cancelCommunityJoinRequest,
    leaveCommunity,
};



