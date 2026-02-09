const express = require("express");
const router = express.Router();
const GeneralIssue = require("../models/GeneralIssue");
const multer = require("multer");
const path = require("path");

// MULTER
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// GET
router.get("/", async (_, res) => {
  const issues = await GeneralIssue.find().sort({ createdAt: -1 });
  res.json(issues);
});

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  const issue = new GeneralIssue({
    title: req.body.title,
    category: req.body.category,
    location: req.body.location,
    severity: req.body.severity,
    description: req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  });

  await issue.save();

  // 🔥 REAL TIME
  global.io.emit("issue:new", issue);

  res.json(issue);
});

// RESOLVE
router.put("/:id/resolve", async (req, res) => {
  const issue = await GeneralIssue.findByIdAndUpdate(
    req.params.id,
    { status: "resolved" },
    { new: true }
  );

  global.io.emit("issue:resolved", issue);

  res.json(issue);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await GeneralIssue.findByIdAndDelete(req.params.id);
  global.io.emit("issue:deleted", req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
