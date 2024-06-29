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
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("User registered!! No need to save to DB");
        done(null, foundUser);
      } else {
        console.log("User need register!! Need to save to DB");
        let newUser = new User({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photo[0].value,
          email: profile.email[0].value,
        });
        let savedUser = await newUser.save();
        console.log("Create new member successfully~~");
        done(null, savedUser);
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
