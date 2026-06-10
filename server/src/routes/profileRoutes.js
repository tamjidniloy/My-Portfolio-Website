const express = require("express");
const {
  getProfile,
  createProfile,
  updateProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", getProfile);
router.post("/", protect, createProfile);
router.put("/", protect, updateProfile);
module.exports = router;
