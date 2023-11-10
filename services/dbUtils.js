const Community = require("../models/community");
const User = require("../models/user");
const {Types} = require("mongoose"); // replace with your actual path to the Community model

const saveModel = (modelInstance, res, next) => {
    modelInstance.save()
        .then(() => {
            res.send("New record created");
        })
        .catch(err => {
            console.log(err);
            next(new Error("Error: Save to DB"));  // Forward the error to the error-handling middleware
        });
};
const findCommunityByName = (communityName) => {
    return Community.findOne({ name: communityName });
}
const findCommunityById = (communityId) => {
    return Community.findById(communityId);
}





module.exports = {
    findCommunityById,
    saveModel,
    findCommunityByName,
};


