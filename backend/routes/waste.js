const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Waste = require("../models/Waste");

// ================= MULTER CONFIGURATION =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// ================= ROUTES =================

// GET all
router.get("/", async (req, res) => {
  try {
    const data = await Waste.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE (Now handles the Image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const wasteData = {
      location: req.body.location,
      type: req.body.type,
      description: req.body.description,
      status: req.body.status || "scheduled",
      // Save the relative path to the DB
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const waste = new Waste(wasteData);
    await waste.save();
    console.log("record saved:", waste);
    res.status(201).json(waste);
  } catch (error) {
    // If Mongoose validation fails (like the 'pending' error), the server stays alive!
    res.status(400).json({ message: error.message });
  }
});

// MARK DONE
router.put("/:id/done", async (req, res) => {
  const waste = await Waste.findByIdAndUpdate(
    req.params.id,
    { status: "done" },
    { new: true }
  );
  res.json(waste);
});

// REOPEN
router.put("/:id/reopen", async (req, res) => {
  const waste = await Waste.findByIdAndUpdate(
    req.params.id,
    { status: "scheduled" },
    { new: true }
  );
  res.json(waste);
});

module.exports = router;
