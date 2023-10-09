const express = require("express");
const userCommunityCRUDController = require("../../controllers/community/userCommunityCRUDController");
const { check } = require("express-validator");
const Community = require("../../models/community");
const router = express.Router();
const errorHandler = require("../../services/error-handler");


router.post('/createCommunity', userCommunityCRUDController.createCommunity);
router.get('/', userCommunityCRUDController.getCommunitiesByCriteria);
router.get('/:id', userCommunityCRUDController.getCommunityById);
router.get('/:id/chatRooms', userCommunityCRUDController.getAllChatRoomsByCommunityId);

module.exports = router;
