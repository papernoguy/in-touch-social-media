const User = require("../../models/user");
const bcrypt = require("bcrypt");

function loginForm(req, res) {
  res.render("login", {});
}
function loginUser(req, res) {
  const userName = req.body.userName;
  const password = req.body.Password;
  User.findOne({ username: userName }).then((user) => {
    if (!user) {
      return res.redirect("/auth?error=1");
    }
    bcrypt
      .compare(password, user.passwordHash)
      .then((result) => {
        if (result) {
          req.session.username = userName;
          req.session.isLoggedIn = true;
          return req.session.save((err) => {
            return res.redirect("/home");
          });
        }
        res.redirect("/auth?error=1");
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/auth?error=1");
      });
  });
  return null;
}

function isLoggedIn(req, res, next) {
  if (req.session.username != null) return next();
  else res.redirect("/#login");
}

function foo(req, res) {
  res.render("home", { username: req.session.username });
}

function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect("/#login");
  });
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
  loginUser,
  logoutUser,
  refreshAuthToken,
  resetPassword,
  forgotPassword,
  foo,
  isLoggedIn,
  loginForm
};
