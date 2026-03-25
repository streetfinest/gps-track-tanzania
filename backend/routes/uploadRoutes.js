const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");
const path = require("path");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function getMediaType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const videoExtensions = [".mp4", ".mov", ".webm", ".ogg", ".m4v"];
  return videoExtensions.includes(ext) ? "video" : "image";
}

const teamStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const mediaType = getMediaType(file.originalname);
    return {
      folder: "gps-track/team",
      resource_type: mediaType === "video" ? "video" : "image",
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    };
  }
});

const worksStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const mediaType = getMediaType(file.originalname);
    return {
      folder: "gps-track/works",
      resource_type: mediaType === "video" ? "video" : "image",
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    };
  }
});

const teamUpload = multer({ storage: teamStorage });
const worksUpload = multer({ storage: worksStorage });

router.post("/team-media", teamUpload.array("files", 20), (req, res) => {
  if (!req.files || !req.files.length) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const files = req.files.map((file) => ({
    url: file.path,
    type: file.resource_type === "video" ? "video" : "image"
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
    url: file.path,
    type: file.resource_type === "video" ? "video" : "image"
  }));

  res.json({
    message: "Work media uploaded successfully",
    files
  });
});

module.exports = router;