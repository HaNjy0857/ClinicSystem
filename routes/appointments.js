const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/", appointmentController.getAppointments);
router.post("/create", appointmentController.createAppointment);
router.post("/cancel/:id", appointmentController.cancelAppointment);

module.exports = router;
