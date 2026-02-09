const express = require("express");
const router = express.Router();
const StreetLight = require("../models/StreetLight");

// ================= GET ALL FAULTS =================
router.get("/", async (req, res) => {
  try {
    const faults = await StreetLight.find().sort({ createdAt: -1 });
    res.status(200).json(faults);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch street lights" });
  }
});

// ================= CREATE FAULT =================
router.post("/", async (req, res) => {
  try {
    const fault = new StreetLight(req.body);
    await fault.save();
    res.status(201).json(fault);
  } catch (err) {
    res.status(400).json({ message: "Failed to create fault" });
  }
});

// ================= MARK FIXED =================
router.put("/:id/fix", async (req, res) => {
  try {
    const fault = await StreetLight.findByIdAndUpdate(
      req.params.id,
      { status: "fixed" },
      { new: true }
    );

    if (!fault) {
      return res.status(404).json({ message: "Fault not found" });
    }

    res.status(200).json(fault);
  } catch (err) {
    res.status(500).json({ message: "Failed to fix street light" });
  }
});

// ================= REOPEN FAULT =================
router.put("/:id/reopen", async (req, res) => {
  try {
    const fault = await StreetLight.findByIdAndUpdate(
      req.params.id,
      { status: "pending" },
      { new: true }
    );

    if (!fault) {
      return res.status(404).json({ message: "Fault not found" });
    }

    res.status(200).json(fault);
  } catch (err) {
    res.status(500).json({ message: "Failed to reopen street light" });
  }
});

// ================= DELETE SINGLE FAULT =================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await StreetLight.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Fault not found" });
    }

    res.status(200).json({ message: "Street light fault deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete fault" });
  }
});

// ================= DELETE ALL FAULTS =================
router.delete("/", async (req, res) => {
  try {
    await StreetLight.deleteMany({});
    res.status(200).json({ message: "All street light faults deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete street light faults" });
  }
});

module.exports = router;
