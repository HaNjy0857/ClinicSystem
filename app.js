const express = require("express");
const session = require("express-session");
require("./config/passport");
const passport = require("passport");
const sequelize = require("./config/database");
const patientRoutes = require("./routes/patient");
const authRoutes = require("./routes/auth");
const homeController = require("./controllers/homeController");
const flash = require("connect-flash");
const path = require("path");

const app = express();
const port = 9527;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", homeController.getHomePage);
app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);

if (require.main === module) {
  sequelize
    .sync()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
} else {
  module.exports = app;
}
