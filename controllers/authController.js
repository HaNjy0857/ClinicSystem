const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  return res.render("login", { user: req.user });
};

exports.postLogin = (req, res, next) => {
  console.log("Login request received with email:", req.body.email);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Error during authentication", err);
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed", info);
      req.flash(
        "error",
        info ? info.message : "Login failed! Incorrect username or password."
      );
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log("Error during login", err);
        return next(err);
      }
      console.log("Authentication successful");
      req.flash("success", "You are now logged in.");
      return res.redirect("/");
    });
  })(req, res, next);
};

// exports.postLogin = passport.authenticate("local", {
//   failureRedirect: "/auth/login",
//   failureFlash: "Login failed! Incorrect username or password.",
// });

exports.getLogout = (req, res) => {
  req.logOut((err) => {
    if (err) return res.send(err);
    return res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  return res.render("signup", { user: req.user });
};

exports.getGoogleAuth = (req, res) => {
  console.log("getGoogleAuth");
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res);
};

exports.postSignup = async (req, res) => {
  let { name, email, password } = req.body;
  if (password.length < 8) {
    req.flash("error_msg", "password needs to be greater than 8 characters");
    return res.redirect("/auth/signup");
  }

  try {
    const foundEmail = await User.findOne({ where: { email } });
    if (foundEmail) {
      req.flash(
        "error_msg",
        "This email address is already registered. Please register with another email or login with this email."
      );
      return res.redirect("/auth/signup");
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPassword });

    req.flash(
      "success_msg",
      "Congratulations, registration successful! You can now log in."
    );
    return res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Failed to register user.");
    return res.redirect("/auth/signup");
  }
};

// exports.getGoogleRedirect = passport.authenticate("google", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
// });
exports.getGoogleRedirect = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.log("No user found:", info);
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("Google authentication successful");
      return res.redirect("/");
    });
  })(req, res, next);
};
