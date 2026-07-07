const express = require("express");
const router = express.Router();
const {
  getTodayMetrics,
  logWater,
  resetWater,
  logSleep,
  logSteps,
  logHeartRate,
  logCaloriesBurned,
  logMeasurements,
  toggleSupplement,
  getMetricsHistory
} = require("../controllers/metricController");
const { protect } = require("../middleware/authMiddleware");

// All routes are guarded by token authorization check
router.use(protect);

router.get("/today", getTodayMetrics);
router.post("/water", logWater);
router.post("/water/reset", resetWater);
router.post("/sleep", logSleep);
router.post("/steps", logSteps);
router.post("/heartrate", logHeartRate);
router.post("/calories", logCaloriesBurned);
router.post("/measurements", logMeasurements);
router.put("/supplements/:supplementId", toggleSupplement);
router.get("/history", getMetricsHistory);

module.exports = router;
