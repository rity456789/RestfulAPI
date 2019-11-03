const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../connectToDB");
const router = express.Router();

const createUser = async ({ name, password }) => {
  return await User.create({ name, password });
};

// register
router.post("/register", function(req, res, next) {
  const { name, password } = req.body;
  User.findOne({
    where: { name }
  }).then(checkUser => {
    if (checkUser != null) {
      res.json({ message: "This name is existed" });
    } else {
      createUser({ name, password }).then(user =>
        res.json({ user, msg: "account created successfully" })
      );
    }
  });
});

/* POST login. */
router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "1612041");
      return res.json({ user, token, info });
    });
  })(req, res);
});

module.exports = router;
