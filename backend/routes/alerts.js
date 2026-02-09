const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");

// ================= GET ALL ALERTS =================
router.get("/", async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json(alerts);
});

// ================= CREATE ALERT =================
router.post("/", async (req, res) => {
  const alert = new Alert(req.body);
  await alert.save();
  res.json(alert);
});

// ================= ASSIGN DEPARTMENT =================
router.put("/:id/assign", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { department: req.body.department },
    { new: true }
  );
  res.json(alert);
});

// ================= RESOLVE ALERT =================
router.put("/:id/resolve", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { status: "resolved" },
    { new: true }
  );
  res.json(alert);
});

// ================= REOPEN ALERT =================
router.put("/:id/reopen", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { status: "open" },
    { new: true }
  );
  res.json(alert);
});

module.exports = router;
