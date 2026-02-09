const express = require("express");
const router = express.Router();
const Housing = require("../models/Housing");

// GET all complaints
router.get("/", async (req, res) => {
  const data = await Housing.find().sort({ createdAt: -1 });
  res.json(data);
});

// CREATE complaint
router.post("/", async (req, res) => {
  const complaint = new Housing(req.body);
  await complaint.save();
  res.json(complaint);
});

// UPDATE status
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  const updated = await Housing.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
