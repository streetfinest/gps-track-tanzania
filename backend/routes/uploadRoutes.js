const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const teamDir = path.join(__dirname, "..", "uploads", "team");
const worksDir = path.join(__dirname, "..", "uploads", "works");

if (!fs.existsSync(teamDir)) fs.mkdirSync(teamDir, { recursive: true });
if (!fs.existsSync(worksDir)) fs.mkdirSync(worksDir, { recursive: true });

const teamStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, teamDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"))
});

const worksStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, worksDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"))
});

const teamUpload = multer({ storage: teamStorage });
const worksUpload = multer({ storage: worksStorage });

function getMediaType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const videoExtensions = [".mp4", ".mov", ".webm", ".ogg"];
  return videoExtensions.includes(ext) ? "video" : "image";
}

router.post("/team-media", teamUpload.array("files", 20), (req, res) => {
  if (!req.files || !req.files.length) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const files = req.files.map((file) => ({
    url: `http://localhost:5000/uploads/team/${file.filename}`,
    type: getMediaType(file.originalname)
  }));

  res.json({
    message: "Team media uploaded successfully",
    files
  });
});

router.post("/work-media", worksUpload.array("files", 20), (req, res) => {
  if (!req.files || !req.files.length) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const files = req.files.map((file) => ({
    url: `http://localhost:5000/uploads/works/${file.filename}`,
    type: getMediaType(file.originalname)
  }));

  res.json({
    message: "Work media uploaded successfully",
    files
  });
});

module.exports = router;