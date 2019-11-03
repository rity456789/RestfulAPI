const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../connectToDB");

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
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
