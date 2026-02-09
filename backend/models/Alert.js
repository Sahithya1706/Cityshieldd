const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    severity: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
