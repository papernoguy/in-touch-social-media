const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function loginUser(email, password) {

    return null;
}

function logoutUser(userId) {

    return null;
}

function refreshAuthToken(refreshToken) {
    return null;
}

function resetPassword(userId, newPassword) {
    //allow the user to set a new password
    return null;
}

function forgotPassword(email) {
    // send a reset link to the user's email.
    return null;
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAuthToken,
    resetPassword,
    forgotPassword
};
