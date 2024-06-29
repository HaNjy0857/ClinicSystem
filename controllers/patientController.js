const Patient = require("../models/patient");

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.render("patients", { patients });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createPatient = async (req, res) => {
  try {
    await Patient.create(req.body);
    res.redirect("/patients");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.editPatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.render("editPatient", { patient });
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
    res.redirect("/patients");
  } catch (error) {
    res.status(400).send(error);
  }
};
