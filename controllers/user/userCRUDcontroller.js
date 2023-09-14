const User = require('../../models/user');

function createUser(userData) {
    // Add a new user.
}

function searchUserById(userId) {
// Retrieve user details by their ID.
}


function setUserAddressById(userId, address) {
// Set the address for a user based on their ID.
    // address = {
}


function setUserPasswordById(userId, newPassword) {
// Set the password for a user based on their ID.
}


function setUserImageById(userId, imageUrl) {
// Set the profile image for a user based on their ID.
}


function deleteUserById(userId) {
    // Make user inactive by their ID.
}


module.exports = {
    createUser,
    searchUserById,
    setUserAddressById,
    setUserPasswordById,
    setUserImageById,
    deleteUserById,
};
