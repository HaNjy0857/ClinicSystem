const Patient = require("../models/patient");

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.render("patient", { user: req.user, patients });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.showCreateForm = (req, res) => {
  res.render("patientDetail", { user: req.user, mode: "create" });
};

exports.createPatient = async (req, res) => {
  try {
    console.log("createPatientING!!!");
    await Patient.create(req.body);
    res.redirect("/patient");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    res.render("patientDetail", { user: req.user, patient, mode: "edit" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    await patient.update(req.body);
    res.redirect("/patient");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    await patient.destroy();
    res.redirect("/patient");
  } catch (error) {
    res.status(500).send(error);
  }
};
