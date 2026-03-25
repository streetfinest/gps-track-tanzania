const express = require("express");
const Feature = require("../models/Feature");

const router = express.Router();

// GET ALL FEATURES
router.get("/", async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE FEATURE
router.post("/", async (req, res) => {
  try {
    const { title, shortText, fullText } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Feature title is required" });
    }

    const feature = new Feature({
      title,
      shortText: shortText || "",
      fullText: fullText || ""
    });

    await feature.save();

    res.status(201).json({
      message: "Feature saved successfully",
      feature
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE FEATURE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.json({
      message: "Feature updated successfully",
      feature: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE FEATURE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feature.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Feature not found" });
    }

    res.json({ message: "Feature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;