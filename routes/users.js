const express = require("express");
const app = express();
const router = express.Router();
const createUserController = require("../controllers/user/userCRUDcontroller");
const { check, body } = require("express-validator");

router.post(
  "/singup",
  check("email").isEmail().withMessage("Email is not valid"),
  check("Username")
    .exists()
    .withMessage("Please enter username")
    .isLength({ min: 3 })
    .withMessage("Username must be longer then 3 chars"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Custom validation to check if password and confirm password fields match
  body("cnf-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  check("dob").isDate().withMessage("Date is not valid"),
  createUserController.createUser
);

module.exports = router;
