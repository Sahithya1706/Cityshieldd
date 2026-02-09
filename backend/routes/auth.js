const express = require("express");
const router = express.Router();

// ================= DUMMY LOGIN =================
router.post("/login", (req, res) => {
  const { email } = req.body;

  res.json({
    id: "admin123",
    name: "City Admin",
    email,
    role: "admin",
    token: "dummy-token",
  });
});

module.exports = router;
