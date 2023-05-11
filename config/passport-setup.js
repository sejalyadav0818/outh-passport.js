const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
// const User = require("../models/user");
const { user } = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findByPk(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("passport callback function fired:");
      console.log(profile);
      //check user already in db

      user
        .findOne({
          googleid: profile.id,
        })
        .then((currentUser) => {
          if (currentUser) {
            //user exists
            console.log("user is", currentUser);
            done(null, currentUser);
          } else {
            // create new user
            const newUser = user
              .create({
                username: profile.displayName,
                googleid: profile.id,
              })
              .then((User) => {
                console.log("new user created: ", User);
                done(null, newUser);
              });
          }
        });
      // insert user in db
    }
  )
);
// module.exports= passport;
// module.exports= passport;
