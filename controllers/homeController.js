exports.getHomePage = (req, res) => {
  const clinicName = "有間診所";
  const clinicAddress = "Champs-Élysées";
  const clinicPhone = "0988888888";

  res.render("index", {
    user: req.user,
    clinicName,
    clinicAddress,
    clinicPhone,
  });
};
