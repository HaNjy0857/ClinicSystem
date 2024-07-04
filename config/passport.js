const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  console.log("Serialize User...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入Google Strategy的區域");
      console.log(profile);
      console.log("======================");

      try {
        let foundUser = await User.findOne({ where: { googleID: profile.id } });
        if (foundUser) {
          console.log("User registered!! No need to save to DB");
          done(null, foundUser);
        } else {
          console.log("User need register!! Need to save to DB");
          let newUser = await User.create({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            email: profile.emails[0].value,
          });
          console.log("Create new member successfully~~");
          done(null, newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        console.log("正在使用LocalStrategy");
        let foundUser = await User.findOne({ where: { email: username } });

        if (foundUser) {
          let result = await bcrypt.compare(password, foundUser.password);

          if (result) {
            return done(null, foundUser);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        } else {
          return done(null, false, { message: "Incorrect email." });
        }
      } catch (error) {
        console.log("使用LocalStrateg失敗 ${error}");
        return done(error);
      }
    }
  )
);
