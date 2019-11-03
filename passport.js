const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require("./connectToDB");

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password"
    },
    function(name, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return User.findOne({ name, password })
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect username or password."
            });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
