var express = require("express");
const isAuth = require("../middleware/is-auth");
var router = express.Router();
const flash = require("connect-flash");

const userAuthController = require("../controllers/user/authenticationController");
const { render } = require("ejs");
/* GET home page. */
router.get("/", function (req, res, next) {
  const singUpErrorMessage = req.flash("singUpErrorMessage");
  const logInErrorMessage = req.flash("logInErrorMessage");
  res.render("index", {
    title: "Express",
    singUpErrorMessage: singUpErrorMessage || "",
    logInErrorMessage: logInErrorMessage || "",
  });
});
router.get(
  "/home",
  isAuth,
  userAuthController.isLoggedIn,
  userAuthController.foo
);

router.get("/privatechat", function (req, res, next) {
  res.render("privatechat", { username: req.session.username });
});

module.exports = router;
