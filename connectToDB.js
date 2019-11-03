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

module.exports = User;
