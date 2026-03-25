const express = require("express");
const Consultation = require("../models/Consultation");

const router = express.Router();

// GET ALL CONSULTATIONS
router.get("/", async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE CONSULTATION
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const consultation = new Consultation({
      name,
      phone,
      email: email || "",
      message: message || ""
    });

    await consultation.save();

    res.status(201).json({
      message: "Consultation submitted successfully",
      consultation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;