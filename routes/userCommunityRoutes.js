const express = require("express");
const userCommunityCRUDController = require("../controllers/community/userCommunityCRUDcontroller");
const userMembershipController = require("../controllers/community/userMembershipController");
const { check } = require("express-validator");
const Community = require("../models/community");
const router = express.Router();
const errorHandler = require("../services/error-handler");
const validator = require("../services/validator");


router.post('/createCommunity', validator.validateCommunityCreation, userCommunityCRUDController.createCommunity);
router.get('/find', validator.validateGetCommunitiesByCriteria, userCommunityCRUDController.getCommunitiesByCriteria);
router.get('/:id', validator.getCommunityById, userCommunityCRUDController.getCommunityById);
router.get('/:id/chatRooms', validator.getAllChatRoomsByCommunityId, userCommunityCRUDController.getAllChatRoomsByCommunityId);

router.post('/sendJoinRequest', validator.validateSendCommunityJoinRequest, userMembershipController.sendCommunityJoinRequest);
router.post('/cancelJoinRequest', validator.validateCancelCommunityJoinRequest, userMembershipController.cancelCommunityJoinRequest);

router.use(errorHandler);
module.exports = router;

