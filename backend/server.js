const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// ROUTES
const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const streetLightRoutes = require("./routes/streetLight");
const wasteRoutes = require("./routes/waste");
const housingRoutes = require("./routes/housing");
const generalIssueRoutes = require("./routes/generalIssue");

const app = express();
const server = http.createServer(app);

// SOCKET
const io = new Server(server, {
  cors: { origin: "*" },
});
global.io = io;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);
  socket.on("disconnect", () =>
    console.log("🔴 Disconnected:", socket.id)
  );
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/street-lights", streetLightRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/housing", housingRoutes);
app.use("/api/general-issues", generalIssueRoutes);

// DB + SERVER
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () =>
      console.log(`🚀 Server running on ${PORT}`)
    );
  })
  .catch((err) => console.error(err));
