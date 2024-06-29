const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

router.get("/signup", authController.getSignup);

router.get("/google", authController.getGoogleAuth);

router.post("/signup", authController.postSignup);

router.get("/google/redirect", authController.getGoogleRedirect);

module.exports = router;
