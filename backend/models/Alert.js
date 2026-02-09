const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    level: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    city: String,
    status: {
      type: String,
      enum: ["open", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
