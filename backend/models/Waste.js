const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema(
  {
    location: String,
    type: String,
    description: String,
    image: String, // <--- ADD THIS LINE
    status: {
      type: String,
      enum: ["scheduled", "done"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Waste", wasteSchema);
