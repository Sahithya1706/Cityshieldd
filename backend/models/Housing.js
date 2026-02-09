const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema(
  {
    flat: String,
    issue: String,
    description: String,
    status: {
      type: String,
      enum: ["Open", "In-Progress", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Housing", housingSchema);
