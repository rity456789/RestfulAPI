const express = require("express");
const bodyParser = require("body-parser");

// import passport and passport-jwt modules
const passport = require("passport");
const passportJWT = require("passport-jwt");
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "1612041";

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

const app = express();
// parse application/json
app.use(bodyParser.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//use passport
app.use(passport.initialize());

// add a basic route
app.get("/", function(req, res) {
  res.json({ message: "Express is up!" });
});

// start the app
app.listen(3000, function() {
  console.log("Express is running on port 3000");
});

// parse application/json
app.use(bodyParser.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const Sequelize = require("sequelize");

// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: "aRDSJkQR6L",
  host: "remotemysql.com",
  username: "aRDSJkQR6L",
  password: "vFZdhkqndH",
  dialect: "mysql"
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));

// create user model
const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// create table with user model
User.sync()
  .then(() => console.log("Oh yeah! User table created successfully"))
  .catch(err => console.log("BTW, did you enter wrong database credentials?"));

// create some helper functions to work on the database
const createUser = async ({ name, password }) => {
  return await User.create({ name, password });
};
const getUser = async obj => {
  return await User.findOne({
    where: obj
  });
};

// register route
app.post("/register", function(req, res, next) {
  const { name, password } = req.body;
  createUser({ name, password }).then(user =>
    res.json({ user, msg: "account created successfully" })
  );
});
