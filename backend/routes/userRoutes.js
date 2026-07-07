const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getAthleteByCode } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Protected profile actions (GET, PUT)
router.route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);

// Protected coach-athlete connection lookup (GET)
router.get("/athlete/:shareCode", protect, getAthleteByCode);

module.exports = router;
