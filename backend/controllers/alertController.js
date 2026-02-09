const Alert = require("../models/Alert");

// ================= GET ALL ALERTS =================
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
};

// ================= CREATE ALERT =================
exports.createAlert = async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res.status(400).json({ message: "Failed to create alert" });
  }
};

// ================= ASSIGN DEPARTMENT =================
exports.assignAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { department: req.body.department },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to assign department" });
  }
};

// ================= RESOLVE ALERT =================
exports.resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to resolve alert" });
  }
};

// ================= REOPEN ALERT =================
exports.reopenAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status: "open" },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json(alert);
  } catch (err) {
    res.status(500).json({ message: "Failed to reopen alert" });
  }
};
