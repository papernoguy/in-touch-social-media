const express = require("express");
const {validationResult, body, param} = require("express-validator");
const router = express.Router();
const adminCommunityRouter = require("./adminRoutes");
const authorization = require("../services/authorization");
const {createCommunity, queryCommunitiesValidation, queryCommunities, createCommunityValidation} = require("../controllers/community/userCommunityCRUDcontroller");
const {sendCommunityJoinRequest, cancelCommunityJoinRequest, sendCommunityJoinRequestValidation,
    cancelCommunityJoinRequestValidation, leaveCommunity, leaveCommunityValidation
} = require("../controllers/community/userMembershipController");


//All routes in this router are protected by the isLoggedIn authorization
router.use(authorization.isLoggedIn);


// admin routes for a community
router.use('/:communityId/admin', authorization.isAdmin, adminCommunityRouter);



const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


router.post('/createCommunity', createCommunityValidation(), handleValidationErrors, createCommunity);

//http://localhost:3000/communities/ -> all visible communities
//http://localhost:3000/communities?approvalPolicy=auto-join -> all communities with auto-join approval policy
//http://localhost:3000/communities?nameContains=Wa -> all communities with names containing 'Wa'
// * Note: You can use both query and body to provide the query parameters!
router.get('/', queryCommunitiesValidation(), handleValidationErrors, queryCommunities);

//http://localhost:3000/communities/654a9a3b6449db38867919b8/join
router.post('/:communityId/join',sendCommunityJoinRequestValidation(),handleValidationErrors, sendCommunityJoinRequest);

//http://localhost:3000/communities/654a9a3b6449db38867919b8/cancel
router.post('/:communityId/cancel',cancelCommunityJoinRequestValidation(),handleValidationErrors, cancelCommunityJoinRequest);

//http://localhost:3000/communities/654a9a3b6449db38867919b8/leave
router.post('/:communityId/leave',leaveCommunityValidation(),handleValidationErrors, leaveCommunity);






module.exports = router;

