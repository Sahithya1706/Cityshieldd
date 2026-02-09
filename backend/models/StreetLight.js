const mongoose = require("mongoose");

const streetLightSchema = new mongoose.Schema(
  {
    location: String,
    issue: String,
    description: String,
    status: {
      type: String,
      enum: ["pending", "fixed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StreetLight", streetLightSchema);
