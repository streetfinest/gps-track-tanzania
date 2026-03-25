const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortText: { type: String, default: "" },
    fullText: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", featureSchema);