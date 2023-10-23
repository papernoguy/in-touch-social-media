const express = require("express");
const router = express.Router();
const adminCommunityCRUDController = require("../controllers/community/adminCommunityCRUDcontroller");
const adminMembershipController = require("../controllers/community/adminMembershipController");

const validator = require("../services/validator");

router.post('/addAdmin', validator.addAdmin, adminCommunityCRUDController.addAdmin);
router.post('/resignAsAdmin', validator.resignAsAdmin, adminCommunityCRUDController.resignAsAdmin);
router.post('/updateCommunityById', validator.updateCommunityById, adminCommunityCRUDController.updateCommunityById);
router.post('/deleteCommunityById', validator.deleteCommunityById, adminCommunityCRUDController.deleteCommunityById);

router.post('/acceptCommunityJoinRequest', validator.validateAcceptCommunityJoinRequest, adminMembershipController.acceptCommunityJoinRequest);
router.post('/acceptCommunityJoinRequest', validator.validateAcceptCommunityJoinRequest, adminMembershipController.acceptCommunityJoinRequest);
module.exports = router;