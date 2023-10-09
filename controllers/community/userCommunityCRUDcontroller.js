const Community = require('../../models/community');
const User = require('../../models/user');
const { validationResult } = require("express-validator");
const flash = require('connect-flash');
const {searchUserById} = require("../user/userCRUDcontroller");
const { validateCommunityCreation } = require("../../services/validator");
const { saveModel } = require("../../services/dbUtils");
const errorHandler = require('../../services/error-handler');

const createCommunity =errorHandler(async (req, res) => {
    validateCommunityCreation(req);
    const userId = req.session.userId; //the first admin of the community
    const name = req.body.name;
    const bio = req.body.bio;
    const photoRef = req.body.photoRef;
    const community = new Community({
        name,
        bio,
        photoRef,
        members: {
            adminsList: [userId],
            membersList: [],
            pendingJoinRequests: [],
            blockedUsers: []
        },
        chatRooms: []
    });
    saveModel(community, res);
}, 'createCommunity'); //impelemnt!!


// http://localhost:3000/community - to get all communities
// http://localhost:3000/community/find?userId=USER_ID_HERE
// find?visibility=public / find?communityId=123 / find?approvalPolicy=admin-approval
const getCommunitiesByCriteria = errorHandler(async (req, res) => {
    let query = {};
    if (Object.keys(req.query).length > 0) {  // Check if any query parameters were provided
        if (req.query.userId) {
            query['members.membersList'] = req.query.userId;
        }
        if (req.query.approvalPolicy) {
            query['privacySettings.approvalPolicy'] = req.query.approvalPolicy;
        }
        if (req.query.visibility) {
            query['privacySettings.visibility'] = req.query.visibility;
        }
    }

    const communities = await Community.find(query);  // Will fetch all if query is {}

    if (!communities || communities.length === 0) {
        throw new Error('No communities found');
    }

    res.status(200).json(communities);
}, 'getCommunitiesByCriteria');



const getCommunityById = errorHandler(async (req, res) => {
    const community = await Community.findById(req.params.id);
    if (!community) {
        throw new Error('Community not found');
    }
    return res.status(200).json(community);
}, 'getCommunityById');


const getAllChatRoomsByCommunityId = errorHandler(async (req, res) => {
    const community = await Community.findById(req.params.id).select('chatRooms');
    if (!community) {
        // The status and message will be handled by errorHandler
        throw new Error('Community not found');
    }
    return res.status(200).json(community.chatRooms);
}, 'getAllChatRoomsByCommunityId');




module.exports = {
    createCommunity,
    getCommunitiesByCriteria,
    getCommunityById,
    getAllChatRoomsByCommunityId,
};