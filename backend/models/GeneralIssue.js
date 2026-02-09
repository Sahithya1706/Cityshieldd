const mongoose = require("mongoose");

const generalIssueSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    location: String,
    severity: String,
    description: String,
    image: String,
    status: {
      type: String,
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneralIssue", generalIssueSchema);
