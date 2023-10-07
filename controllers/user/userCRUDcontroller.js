const User = require("../../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const { validationResult } = require("express-validator");

const app = express();

// Create a new user.
function createUser(req, res) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).redirect('../#signup').flash('errors', errors.array());
  }
  const email = req.body.email;
  const userName = req.body.Username;
  User.findOne({
    $or: [
      { email: email }, // Search by email
      { username: userName }, // Search by username
    ],
  }).then((userDoc) => {
    if (userDoc) {
      return res.redirect("../#signup");
    } else {
      return bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
        const user = new User({
          username: userName,
          passwordHash: hashedPassword,
          email: email,
        });
        return user.save().then((a) => {
          res.redirect("../#login");
        });
      });
    }
  });
}

async function searchUserById(userId) {
  // Retrieve user details by their ID.
  try {
    const user = await User.findById(userId);

    if (user) {
      // User found, send user data as a response
      return user;
    } else {
      // User not found
      throw new Error("User not found.");
    }
  } catch (err) {
    // Handle any errors that occur during the query
    console.error(err);
    throw new Error(err);
  }
}

function setUserAddressById(userId, address) {
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { address: address } },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("Updated User:", updatedUser);
      } else {
        console.log("User not found.");
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

function setUserPasswordById(userId, newPassword) {
  // Set the password for a user based on their ID.
  bcrypt.hash(newPassword, 12).then((hashedPassword) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $set: { passwordHash: hashedPassword } },
      { new: true }
    )
      .then((updatedUser) => {
        if (updatedUser) {
          console.log("Updated User:", updatedUser);
        } else {
          console.log("User not found.");
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  });
}

function setUserImageById(userId, imageUrl) {
  // Set the profile image for a user based on their ID.
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { profilePictureRef: imageUrl } },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("Updated User:", updatedUser);
      } else {
        console.log("User not found.");
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

async function deleteUserById(userId) {
  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (deletedUser) {
      console.log("User deleted:", deletedUser);
    } else {
      console.log("User not found.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

module.exports = {
  createUser,
  searchUserById,
  setUserAddressById,
  setUserPasswordById,
  setUserImageById,
  deleteUserById,
};
