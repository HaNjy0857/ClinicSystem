const Appointment = require("../models/appointment");
const { sendLineNotification } = require("../helpers/lineNotify");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.render("appointments", { appointments });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    // 假設有病人 ID 和約診時間的屬性
    const patientId = appointment.patientId;
    const appointmentTime = appointment.time;

    // 發送 LINE 通知給病人
    const message = `您的下次約診時間是 ${appointmentTime}，請準時前來診所。`;
    await sendLineNotification(message);

    res.redirect("/appointments");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).send();
    }
    await appointment.destroy();
    res.redirect("/appointments");
  } catch (error) {
    res.status(500).send(error);
  }
};
