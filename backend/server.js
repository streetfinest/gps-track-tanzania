const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const teamRoutes = require("./routes/teamRoutes");
const workRoutes = require("./routes/workRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const featureRoutes = require("./routes/featureRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("GPS Track Tanzania API Running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/works", workRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/features", featureRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gps_tracking";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });