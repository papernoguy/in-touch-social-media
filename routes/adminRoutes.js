const express = require("express");
const router = express.Router({ mergeParams: true }); // Allows access to params from parent router

const adminCommunityCRUDController = require("../controllers/community/adminCommunityCRUDcontroller");
const adminMembershipController = require("../controllers/community/adminMembershipController");

const validator = require("../services/validator");
const {validationResult, body} = require("express-validator");
const {addAdminValidation, addAdmin,resignAsAdminValidation, resignAsAdmin, validateDeleteCommunity, deleteCommunity,
    updateCommunityDetails, deleteCommunityValidation, updateCommunityValidation
} = require("../controllers/community/adminCommunityCRUDcontroller");
const {validateIsMember} = require("../services/validator");
const {rejectCommunityJoinRequest, acceptCommunityJoinRequest, acceptCommunityJoinRequestValidation,
    rejectCommunityJoinRequestValidation, removeMemberValidation, removeMember, blockUserValidation, blockUser,
    unblockUser, unblockUserValidation
} = require("../controllers/community/adminMembershipController");


const adminCommunityRouter = express.Router({ mergeParams: true });

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//http://localhost:3000/communities/654a9a1e6449db38867919b5/admin/addAdmin + userId in the body
router.post('/addAdmin', addAdminValidation(),handleValidationErrors, addAdmin);

router.post('/resignAsAdmin', resignAsAdminValidation(), handleValidationErrors, resignAsAdmin);

router.post('/deleteCommunity', deleteCommunityValidation(), handleValidationErrors, deleteCommunity);

router.post('/updateCommunityDetails', updateCommunityValidation(), handleValidationErrors, updateCommunityDetails);

router.post('/acceptCommunityJoinRequest',acceptCommunityJoinRequestValidation(), handleValidationErrors, acceptCommunityJoinRequest);

router.post('/rejectCommunityJoinRequest',rejectCommunityJoinRequestValidation(), handleValidationErrors, rejectCommunityJoinRequest);

router.post('/removeMember',removeMemberValidation(), handleValidationErrors, removeMember);

router.post('/blockUser', blockUserValidation(), handleValidationErrors, blockUser);

router.post('/unblockUser', unblockUserValidation(), handleValidationErrors, unblockUser);


module.exports = router;