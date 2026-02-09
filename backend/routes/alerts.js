const express = require("express");
const router = express.Router();
const {
  getAlerts,
  createAlert,
  resolveAlert,
  reopenAlert,
} = require("../controllers/alertController");

router.get("/", getAlerts);
router.post("/", createAlert);
router.put("/:id/resolve", resolveAlert);
router.put("/:id/reopen", reopenAlert);

module.exports = router;
