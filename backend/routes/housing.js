const express = require("express");
const router = express.Router();
const Housing = require("../models/Housing");

// ================= GET ALL COMPLAINTS =================
router.get("/", async (req, res) => {
  try {
    const data = await Housing.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

// ================= CREATE COMPLAINT =================
router.post("/", async (req, res) => {
  try {
    const complaint = new Housing(req.body);
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ message: "Failed to create complaint" });
  }
});

// ================= UPDATE STATUS =================
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Housing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

// ================= DELETE SINGLE COMPLAINT =================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Housing.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete complaint" });
  }
});

// ================= DELETE ALL COMPLAINTS =================
router.delete("/", async (req, res) => {
  try {
    await Housing.deleteMany({});
    res.status(200).json({ message: "All housing complaints deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete housing complaints" });
  }
});

module.exports = router;
