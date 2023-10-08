const express = require("express");
const userAuthController = require("../controllers/user/authenticationController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  check("userName").notEmpty().withMessage("Please enter username"),
  check("Password").notEmpty().withMessage("Please enter password"),
  userAuthController.loginUser
);
router.get("/logout", userAuthController.logoutUser);

module.exports = router;
