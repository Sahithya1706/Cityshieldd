const Alert = require("../models/Alert");

// GET all alerts
exports.getAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
};

// CREATE alert
exports.createAlert = async (req, res) => {
  const alert = new Alert(req.body);
  await alert.save();
  res.json(alert);
};

// ASSIGN department
exports.assignAlert = async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { department: req.body.department },
    { new: true }
  );
  res.json(alert);
};

// RESOLVE alert
exports.resolveAlert = async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { status: "resolved" },
    { new: true }
  );
  res.json(alert);
};

// REOPEN alert
exports.reopenAlert = async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { status: "open" },
    { new: true }
  );
  res.json(alert);
};


exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
};