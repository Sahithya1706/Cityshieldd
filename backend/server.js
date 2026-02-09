const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ===== IMPORT ROUTES =====
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const streetLightRoutes = require("./routes/streetLight");
const wasteRoutes = require("./routes/waste");
const housingRoutes = require("./routes/housing");
const generalIssueRoutes = require("./routes/generalIssue");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("CityShield Backend is running 🚀");
});

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/street-lights", streetLightRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/housing", housingRoutes);
app.use("/api/general-issues", generalIssueRoutes);

// ================= STATIC UPLOADS =================
app.use("/uploads", express.static("uploads"));

// ================= PORT =================
const PORT = process.env.PORT || 5000;

// ================= DB CONNECT + SERVER START =================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
