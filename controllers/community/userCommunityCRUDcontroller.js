const Community = require('../../models/community');
const { saveModel } = require("../../services/dbUtils");


const createCommunity =async (req, res) => {
    const userId = req.session.userId; //the first admin of the community
    const name = req.body.name;
    const bio = req.body.bio;
    const photoRef = req.body.photoRef;
    const community = new Community({
        name, bio, photoRef,
        members: {
            adminsList: [userId],
            membersList: [],
            pendingJoinRequests: [],
            blockedUsers: []
        },
        chatRooms: []
    });
    saveModel(community, res);

};

// EXAMPLE USES OF THIS FUNCTION:
// http://localhost:3000/community/find   -> to get all communities
// http://localhost:3000/community/find?visibility=visible
// http://localhost:3000/community/find?communityId=123456
// http://localhost:3000/community/find?approvalPolicy=admin-approval
const getCommunitiesByCriteria = async (req, res) => {
    try {
        console.log("I'm inside getCommunitiesByCriteria");  // Debugging line

        let query = {};  // Initialize an empty query object

        // Check if any query parameters were provided
        if (Object.keys(req.query).length > 0) {

            // If approvalPolicy is specified, add to query
            if (req.query.approvalPolicy) {
                query['privacySettings.approvalPolicy'] = req.query.approvalPolicy;
            }
            // If visibility is specified, add to query
            if (req.query.visibility) {
                query['privacySettings.visibility'] = req.query.visibility;
            }
        }
        // Perform the MongoDB find operation. Will fetch all if query is {}
        const communities = await Community.find(query);
        // Check if communities were found
        if (!communities || communities.length === 0) {
            return res.status(404).json({ message: 'No communities found' });
        }
        res.status(200).json(communities);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//http://localhost:3000/community/6523d88e6c576574baca4ca9
const getCommunityById = async (req, res,next) => {
    const community = await Community.findById(req.params.id);
    return res.status(200).json(community);
};

const getAllChatRoomsByCommunityId = async (req, res,next) => {
    const community = await Community.findById(req.params.id).select('chatRooms');
    return res.status(200).json(community.chatRooms);
};


module.exports = {
    createCommunity,
    getCommunitiesByCriteria,
    getCommunityById,
    getAllChatRoomsByCommunityId,
};