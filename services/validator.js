const { findCommunityByName,isUserIdExists,findCommunityById } = require('./dbUtils');
const Community = require('../models/community');
const {Types} = require("mongoose");
const {body, param} = require("express-validator");
const User = require("../models/user");


const validateDocumentExists = (model, idParam, idLocation, locationType, notFoundMessage) => {
    return idLocation(idParam)
        .exists({ checkFalsy: true }).withMessage(`${idParam} is required in ${locationType}`)
        .bail()
        .isMongoId().withMessage(`Invalid ${idParam} format`)
        .bail()
        .custom(async (id, { req }) => {
            const document = await model.findById(id);
            if (!document) {
                return Promise.reject(`${notFoundMessage}: Not found`);
            }
            return true;
        });
};

const validateCommunityExists = () => validateDocumentExists(Community, 'communityId', param, 'params', 'validateCommunityExists: Community not found');
const validateUserExists = () => validateDocumentExists(User, 'userId', body, 'body', 'validateUserExists: User not found');

/////////////////////////////////////////////////////////////////
const validateCommunityDetails = () => {
    return [
        body('name')
            .trim()
            .isLength({ min: 3, max: 50 })
            .withMessage('Name should be between 3 and 50 characters')
            .bail()
            .custom(async (value, { req }) => {
                const existingCommunity = await findCommunityByName(value);
                if (existingCommunity) {
                    if (!req.params.communityId || existingCommunity._id.toString() !== req.params.communityId) {
                        throw new Error('A community with this name already exists');
                    }
                }
            }),

        body('bio')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Bio is required and should be a string'),
        body('approvalPolicy')
            .optional()
            .isIn(['auto-join', 'admin-approval'])
            .withMessage("Approval policy must be 'auto-join', 'admin-approval', or not set"),
        body('visibility')
            .optional()
            .isIn(['visible', 'hidden'])
            .withMessage("Visibility must be 'visible', 'hidden', or not set"),
        body('photoRef')
            .optional()
            .isURL()
            .withMessage("PhotoRef should be a valid URL")
            .trim(),
    ];
};



////////////////////////////////////////
const validateMembershipStatus = (userIdProvider, listKey, errorMessage, shouldBeMember) => {
    return param('communityId').custom(async (communityId, { req }) => {
        const userId = userIdProvider(req);
        const community = await Community.findById(communityId);
        if (!community) {
            return Promise.reject('Community not found');
        }

        const isMember = community.members[listKey] && community.members[listKey].includes(userId);

        // If shouldBeMember is true, reject if NOT a member; if false, reject if IS a member.
        if ((shouldBeMember && !isMember) || (!shouldBeMember && isMember)) {
            return Promise.reject(errorMessage);
        }
        return true;
    });
};


const validateIsNotAdmin = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'adminsList',
        'validateIsNotAdmin: User is already an admin of this community',
        false
    );

const validateIsAdmin = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'adminsList',
        'User is not an admin of this community',
        true
    );

const validateSelfIsNotAdmin = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'adminsList',
        'User (self) is already an admin of this community',
        false
    );

const validateSelfIsAdmin = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'adminsList',
        'User (self) is not an admin of this community',
        true
    );



const validateSelfIsNotPending = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'pendingJoinRequests',
        'validateSelfIsNotPending: User (self) is already pending join request to the community',
        false
    );

const validateSelfIsPending = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'pendingJoinRequests',
        'validateSelfIsNotPending: User (self) is not pending join request to the community',
        true
    );

const validateIsPending = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'pendingJoinRequests',
        'User is not pending join request to the community',
        true
    );

const validateIsNotPending = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'pendingJoinRequests',
        'User is already pending join request to the community',
        false
    );

const validateSelfIsNotBlocked = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'blockedUsers',
        'User (self) is blocked from this community',
        false
    );

const validateSelfIsBlocked = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'blockedUsers',
        'User (self) is not blocked from this community',
        true
    );

const validateIsBlocked = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'blockedUsers',
        'User is not blocked from this community',
        true
    );

const validateIsNotBlocked = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'blockedUsers',
        'User is already blocked from this community',
        false
    );

const validateSelfIsNotMember = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'membersList',
        'User (self) is already a member of this community',
        false
    );

const validateSelfIsMember = () =>
    validateMembershipStatus(
        (req) => req.session.userId,
        'membersList',
        'User (self) is not a member of this community',
        true
    );

const validateIsMember = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'membersList',
        'User is not a member this community',
        true
    );

const validateIsNotMember = () =>
    validateMembershipStatus(
        (req) => req.body.userId,
        'membersList',
        'User is already a member of this community',
        false
    );

const validateOtherAdminsExist = () => {
    return param('communityId').custom(async (communityId, { req }) => {
        const community = await Community.findById(communityId);
        // Check if the resigning user is the only admin
        if (community.members.adminsList.length <= 1) {
            return Promise.reject('Community only has one admin, Please assign another admin first.');
        }
        return true;
    });
};


module.exports = {
    validateCommunityExists,
    validateUserExists,

    validateCommunityDetails,

    validateIsMember,
    validateIsNotMember,
    validateSelfIsNotMember,
    validateSelfIsMember,

    validateIsAdmin,
    validateIsNotAdmin,
    validateSelfIsAdmin,
    validateSelfIsNotAdmin,

    validateIsPending,
    validateIsNotPending,
    validateSelfIsPending,
    validateSelfIsNotPending,


    validateIsBlocked,
    validateIsNotBlocked,
    validateSelfIsBlocked,
    validateSelfIsNotBlocked,

    validateOtherAdminsExist,
};