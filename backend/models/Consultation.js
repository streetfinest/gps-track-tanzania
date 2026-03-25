const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    message: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema);