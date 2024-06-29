const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.get("/", patientController.getPatients);
router.post("/create", patientController.createPatient);
router.get("/edit/:id", patientController.editPatient);
router.post("/edit/:id", patientController.updatePatient);

module.exports = router;
