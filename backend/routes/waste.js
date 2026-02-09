const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Waste = require("../models/Waste");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// ================= GET ALL WASTE =================
router.get("/", async (req, res) => {
  try {
    const data = await Waste.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch waste data" });
  }
});

// ================= CREATE WASTE (WITH IMAGE) =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const waste = new Waste({
      location: req.body.location,
      type: req.body.type,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      status: "scheduled",
    });

    await waste.save();
    res.status(201).json(waste);
  } catch (err) {
    res.status(400).json({ message: "Failed to create waste request" });
  }
});

// ================= MARK DONE =================
router.put("/:id/done", async (req, res) => {
  try {
    const waste = await Waste.findByIdAndUpdate(
      req.params.id,
      { status: "done" },
      { new: true }
    );

    if (!waste) {
      return res.status(404).json({ message: "Waste not found" });
    }

    res.status(200).json(waste);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark done" });
  }
});

// ================= REOPEN =================
router.put("/:id/reopen", async (req, res) => {
  try {
    const waste = await Waste.findByIdAndUpdate(
      req.params.id,
      { status: "scheduled" },
      { new: true }
    );

    if (!waste) {
      return res.status(404).json({ message: "Waste not found" });
    }

    res.status(200).json(waste);
  } catch (err) {
    res.status(500).json({ message: "Failed to reopen waste request" });
  }
});

// ================= DELETE SINGLE =================
router.delete("/:id", async (req, res) => {
  try {
    const waste = await Waste.findById(req.params.id);

    if (!waste) {
      return res.status(404).json({ message: "Waste not found" });
    }

    // 🧹 delete image from uploads
    if (waste.image) {
      const imgPath = path.join(__dirname, "..", waste.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await waste.deleteOne();
    res.status(200).json({ message: "Waste request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete waste request" });
  }
});

// ================= DELETE ALL =================
router.delete("/", async (req, res) => {
  try {
    const all = await Waste.find();

    // 🧹 delete all images
    all.forEach((w) => {
      if (w.image) {
        const imgPath = path.join(__dirname, "..", w.image);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
    });

    await Waste.deleteMany({});
    res.status(200).json({ message: "All waste requests deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete waste requests" });
  }
});

module.exports = router;
