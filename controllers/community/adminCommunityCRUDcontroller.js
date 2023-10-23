const Community = require('../../models/community');
const User = require('../../models/user');

//http://localhost:3000/admin/addAdmin?communityId=yourCommunityIdHere&userId=yourUserIdHere
function addAdmin(req, res) {
    const communityId = req.body.communityId || req.params.communityId;
    const newAdminId = req.body.newAdminId || req.params.newAdminId;
    Community.findById(communityId)
        .then(community => {
            community.members.adminsList.push(newAdminId);

            // Save the updated community
            return community.save();
        })
        .then(() => {
            res.status(200).json(community);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not save changes' });
        });
    //ADD TO MEMBER LIST!
}

function resignAsAdmin(req, res) {
    const communityId = req.body.communityId || req.params.communityId;
    const resigningAdminId = req.session.userId;
    Community.findById(communityId)
        .then(community => {
            community.members.adminsList.remove(resigningAdminId);

            // Save the updated community
            return community.save();
        })
        .then(() => {
            res.status(200).json(community);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Could not save changes' });
        });
}



function updateCommunityById(communityId, updateData) {
    // Update community details by its ID.
    return null;
}

async function deleteCommunityById(req, res) {
    const communityId = req.body.communityId || req.params.communityId;

    try {
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        await Community.findByIdAndDelete(communityId);

        for (const userId of community.members.membersList) {
            const user = await User.findById(userId);
            if (user) {
                const index = user.joinedCommunities.findIndex(joinedCommunity => joinedCommunity.communityId.toString() === communityId);
                if (index !== -1) {
                    user.joinedCommunities.splice(index, 1);
                    await user.save();
                }
            }
        }

        res.status(200).json(community);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "An error occurred" });
    }
}


module.exports = {
    addAdmin,
    resignAsAdmin,
    updateCommunityById,
    deleteCommunityById
};
