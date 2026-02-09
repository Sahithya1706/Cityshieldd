const express = require("express");
const router = express.Router();
const GeneralIssue = require("../models/GeneralIssue");
const multer = require("multer");
const path = require("path");

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ================= GET ALL ISSUES =================
router.get("/", async (req, res) => {
  try {
    const issues = await GeneralIssue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch issues" });
  }
});

// ================= CREATE ISSUE =================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, location, severity, description } = req.body;

    if (!category || !location || !severity) {
      return res.status(400).json({
        message: "Category, location and severity are required",
      });
    }

    const issue = new GeneralIssue({
      title: title || "Reported Issue",
      category,
      location,
      severity,
      description,
      image: req.file ? req.file.filename : null,
      status: "pending",
    });

    await issue.save();

    res.status(201).json({
      message: "Issue reported successfully",
      issue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create issue",
    });
  }
});

// ================= RESOLVE / COMPLETE ISSUE =================
router.put("/:id/resolve", async (req, res) => {
  try {
    const issue = await GeneralIssue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = "resolved";
    await issue.save();

    res.status(200).json({
      message: "Issue marked as resolved",
      issue,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to resolve issue" });
  }
});

// ================= DELETE ISSUE =================
router.delete("/:id", async (req, res) => {
  try {
    const issue = await GeneralIssue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({
      message: "Issue deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete issue" });
  }
});

module.exports = router;
