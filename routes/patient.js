const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
};

router.get("/", authCheck, patientController.getPatients);
router.get("/create", authCheck, patientController.showCreateForm);
router.post("/create", authCheck, patientController.createPatient);
router.get("/edit/:id", authCheck, patientController.showEditForm);
router.post("/edit/:id", authCheck, patientController.updatePatient);
router.post("/delete/:id", authCheck, patientController.deletePatient);

module.exports = router;
