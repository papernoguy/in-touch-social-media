var express = require("express");
const isAuth = require("../middleware/is-auth");
var router = express.Router();
const userAuthController = require("../controllers/user/authenticationController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get(
  "/home",
  isAuth,
  userAuthController.isLoggedIn,
  userAuthController.foo
);

module.exports = router;
