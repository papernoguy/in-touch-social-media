const Community = require('../../models/community');
const { findCommunityByName} = require("../../services/dbUtils");
const {Types} = require("mongoose");
const { body, query, validationResult, param} = require('express-validator');
const {validateCommunityDetails, validateUserExists, validateIsMember, validateIsNotAdmin} = require("../../services/validator");


const createCommunity = async (req, res) => {

    try {
        const userId = req.session.userId; // the first admin of the community
        const { name, bio, photoRef, approvalPolicy, visibility } = req.body;
        const community = new Community({
            name,
            bio,
            photoRef,
            privacySettings: {
                approvalPolicy,
                visibility,
            },
            members: {
                adminsList: [userId],
            },
        });

        // Save the community to the database
        const savedCommunity = await community.save();
        return res.status(201).json(savedCommunity);
    } catch (error) {
        console.error("error in createCommunity: ", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const queryCommunities = async (req, res) => {

    try {
        let query = {};
        // Use query or body, with query taking precedence if both are provided
        const approvalPolicy = req.query.approvalPolicy || req.body.approvalPolicy;
        if (approvalPolicy) {
            query['privacySettings.approvalPolicy'] = approvalPolicy;
        }

        const visibility = req.query.visibility || req.body.visibility;
        if (visibility) {
            query['privacySettings.visibility'] = visibility;
        }

        const communityId = req.query.communityId || req.body.communityId;
        if (communityId) {
            query['_id'] = new Types.ObjectId(communityId);
        }

        const adminId = req.query.adminId || req.body.adminId;
        if (adminId) {
            query['members.adminsList'] = new Types.ObjectId(adminId);
        }

        const memberId = req.query.memberId || req.body.memberId;
        if (memberId) {
            query['members.membersList'] = new Types.ObjectId(memberId);
        }

        const pendingJoinRequestId = req.query.pendingJoinRequestId || req.body.pendingJoinRequestId;
        if (pendingJoinRequestId) {
            query['members.pendingJoinRequests'] = new Types.ObjectId(pendingJoinRequestId);
        }

        const blockedUserId = req.query.blockedUserId || req.body.blockedUserId;
        if(blockedUserId){
            query['members.blockedUsers'] = new Types.ObjectId(blockedUserId);
        }

        const name = req.query.name || req.body.name;
        if (name) {
            query['name'] = { $regex: name, $options: 'i' }; // i for case insensitive
        }

        const dateCreated = req.query.dateCreated || req.body.dateCreated;
        if (dateCreated) {
            // Assuming you want to find communities created on a specific date
            const date = new Date(dateCreated);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            query['dateCreated'] = {
                $gte: date,
                $lt: nextDay
            };
        }

        const nameContains = req.query.nameContains || req.body.nameContains;
        if (nameContains) {
            // Escape special regex characters to avoid regex injection
            const searchString = req.query.nameContains.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            query['name'] = { $regex: searchString, $options: 'i' }; // Contains the provided string, case-insensitive
        }

        const communities = await Community.find(query);
        if (!communities.length) {
            return res.status(404).json({ message: 'No communities found' });
        }
        res.status(200).json(communities);

    } catch (err) {
        console.error("error in queryCommunities: ", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// this controller will be implemented later when chat rooms are implemented
const getChatRoomsByCommunityId = async (req, res) => {

    const community = await Community.findById(req.params.id).select('chatRooms');
    return res.status(200).json(community.chatRooms);
};


const queryCommunitiesValidation = () => {
    console.log("inside queryCommunitiesValidation");
    return [
        // Validate 'approvalPolicy' in query or body
        query('approvalPolicy')
            .optional()
            .isIn(['auto-join', 'admin-approval'])
            .withMessage('Invalid approvalPolicy value. Allowed values are: auto-join, admin-approval'),
        body('approvalPolicy')
            .optional()
            .isIn(['auto-join', 'admin-approval'])
            .withMessage('Invalid approvalPolicy value. Allowed values are: auto-join, admin-approval'),

        // In future change to 'visible' only
        query('visibility')
            .optional()
            .isIn(['visible', 'hidden'])
            .withMessage('Invalid visibility value. Allowed values are: visible, hidden'),
        body('visibility')
            .optional()
            .isIn(['visible', 'hidden'])
            .withMessage('Invalid visibility value. Allowed values are: visible, hidden'),

    ];
};

const getChatRoomsByCommunityIdValidation = () => {
    return [
        param('id')
            .custom(async value => {
                if (!Types.ObjectId.isValid(value)) {
                    throw new Error('Invalid community id');
                }
            }),
    ];
};

const createCommunityValidation = () => {
    return [
        validateCommunityDetails(),
        ];
};


module.exports = {
    createCommunity,
    queryCommunities,
    getChatRoomsByCommunityId,
    createCommunityValidation,
    queryCommunitiesValidation,
    getChatRoomsByCommunityIdValidation,
};