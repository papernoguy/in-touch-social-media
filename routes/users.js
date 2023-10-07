const express = require("express");
const app = express();
const router = express.Router();
const createUserController = require("../controllers/user/userCRUDcontroller");
const { check } = require("express-validator");

router.post(
  "/singup",
  check('email').isEmail(),
  check('Username').exists().isLength({min:3}),
  check('password').exists().isStrongPassword(),
  createUserController.createUser
);

module.exports = router;
