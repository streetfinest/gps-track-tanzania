const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "123456";

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { username: adminUsername, role: "admin" },
    process.env.JWT_SECRET || "gps_track_secret_key_2026",
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

module.exports = router;