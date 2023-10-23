const { findCommunityByName,isUserIdExists,findCommunityById } = require('./dbUtils');
const Community = require('../models/community');
async function validateSendCommunityJoinRequest(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const community = await findCommunityById(communityId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    if(community.members.membersList.includes(req.session.userId)) {
        return next(new Error('You are already a member of this community'));
    }
    if(community.members.pendingJoinRequests.includes(req.session.userId)) {
        return next(new Error('You have already sent a join request to this community'));
    }
    next();

}
async function validateCancelCommunityJoinRequest(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const community = await findCommunityById(communityId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    if(!community.members.pendingJoinRequests.includes(req.session.userId)) {
        return next(new Error('You have not sent a join request to this community'));
    }
    next();

}
async function validateAcceptCommunityJoinRequest(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const userId = req.body.userId || req.params.userId;

    // Validate that the community exists
    const community = await Community.findById(communityId);
    if (!community) {
        return res.status(404).json({ message: 'Community not found' });
    }

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Validate that the user is in the pendingJoinRequests of the community
    if (!community.members.pendingJoinRequests.includes(userId)) {
        return res.status(400).json({ message: 'User has not requested to join this community' });
    }

    next();  // If all validations pass, proceed to the next middleware
}

async function validateRejectCommunityJoinRequest(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const userId = req.body.userId || req.params.userId;

    // Validate that the community exists
    const community = await Community.findById(communityId);
    if (!community) {
        return res.status(404).json({ message: 'Community not found' });
    }

    // Validate that the user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Validate that the user is in the pendingJoinRequests of the community
    if (!community.members.pendingJoinRequests.includes(userId)) {
        return res.status(400).json({ message: 'User has not requested to join this community' });
    }

    next();  // If all validations pass, proceed to the next middleware
}

async  function getAllChatRoomsByCommunityId(req, res, next) {
    const community = await Community.findById(req.params.id).select('chatRooms');
    if (!community) {
        // The status and message will be handled by errorHandler
        return next( new Error('Community not found'));
    }
    if(community.chatRooms.length === 0) {
        return res.status(404).json({ message: 'No chat rooms found' });
    }
    next();
}
async function validateGetCommunitiesByCriteria(req, res, next) {
    let errors = [];
    // Validate userId
    if (req.query.userId) {
        if (typeof req.query.userId !== 'string') {errors.push('Invalid userId: not string');}
        if(!isUserIdExists(req.query.userId)) {errors.push('Invalid userId: such userId does not exists');}
    }

    // Validate approvalPolicy
    if (req.query.approvalPolicy){
       const allowedApprovalPolicies = Community.schema.path('privacySettings.approvalPolicy').enumValues; // i dont know why unresolved but works
       if(!allowedApprovalPolicies.includes(req.query.approvalPolicy)) {
           errors.push(`Invalid approvalPolicy value. Allowed values are: ${allowedApprovalPolicies.join('/ ')}`);
       }
    }

    // Validate visibility
    if (req.query.visibility){
        const allowedVisibilityPolicies = Community.schema.path('privacySettings.visibility').enumValues;
        if(!allowedVisibilityPolicies.includes(req.query.visibility)) {
            errors.push(`Invalid visibilityPolicy value. Allowed values are: ${allowedVisibilityPolicies.join('/ ')}`);

        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors: errors });
    }
    next();  // if no errors -> move on to the controller
}

async function validateCommunityCreation(req, res, next) {
    console.log("test");
    const errors = [];

    if (!req.body.name || typeof req.body.name !== 'string') {
        errors.push('Name is required and should be a string');
    }
    if (!req.body.bio || typeof req.body.bio !== 'string') {
        errors.push('Bio is required and should be a string');
    }

    const existingCommunity = await findCommunityByName(req.body.name);
    if (existingCommunity) {
        errors.push('A community with this name already exists');
    }

    const MIN_NAME_LENGTH = 3;
    const MAX_NAME_LENGTH = 50;
    if (req.body.name && (req.body.name.length < MIN_NAME_LENGTH || req.body.name.length > MAX_NAME_LENGTH)) {
        errors.push(`Name should be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters`);
    }
    // Check if any errors were collected
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors: errors });
    } else {
        next();
    }
}

async function getCommunityById(req, res, next) {
    console.log("test", req.body, req.params);
    const communityId = req.body.communityId || req.params.communityId;
    const community = await Community.findById(communityId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    next();
}
async function addAdmin(req, res,next) {
    const newAdminId = req.body.newAdminId || req.params.newAdminId;

    const communityId = req.body.communityId || req.params.communityId;
    const community = await findCommunityById(communityId);

    console.log("inside add admin validator", communityId, newAdminId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    if(!isUserIdExists(req.query.userId)) {
        return next(new Error('Invalid userId: such userId does not exists'));
    }
    if (newAdminId === req.session.userId) {
        return next(new Error('You cannot add yourself as an admin'));
    }
    if(community.members.adminsList.includes(req.query.userId)) {
        return next(new Error('This user is already an admin'));
    }
    next();
}
async function deleteCommunityById(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const community = await findCommunityById(communityId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    next();
}
async function updateCommunityById(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const community = await findCommunityById(communityId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    next();

    // Add details to validate
}
async function resignAsAdmin(req, res, next) {
    const communityId = req.body.communityId || req.params.communityId;
    const community = await findCommunityById(communityId);
    if (!community) {
        return next( new Error('Community not found'));
    }
    next();
}


module.exports = {
    addAdmin,
    validateCommunityCreation,
    validateGetCommunitiesByCriteria,
    getAllChatRoomsByCommunityId,
    getCommunityById,
    deleteCommunityById,
    updateCommunityById,
    resignAsAdmin,
    validateSendCommunityJoinRequest,
    validateCancelCommunityJoinRequest,
    validateAcceptCommunityJoinRequest,
    validateRejectCommunityJoinRequest
};