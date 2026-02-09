const express = require("express");
const router = express.Router();
const StreetLight = require("../models/StreetLight");

// ================= GET ALL FAULTS =================
router.get("/", async (req, res) => {
  const faults = await StreetLight.find().sort({ createdAt: -1 });
  res.json(faults);
});

// ================= CREATE FAULT =================
router.post("/", async (req, res) => {
  const fault = new StreetLight(req.body);
  await fault.save();
  res.json(fault);
});

// ================= MARK FIXED =================
router.put("/:id/fix", async (req, res) => {
  const fault = await StreetLight.findByIdAndUpdate(
    req.params.id,
    { status: "fixed" },
    { new: true }
  );
  res.json(fault);
});

// ================= REOPEN =================
router.put("/:id/reopen", async (req, res) => {
  const fault = await StreetLight.findByIdAndUpdate(
    req.params.id,
    { status: "pending" },
    { new: true }
  );
  res.json(fault);
});

module.exports = router;
