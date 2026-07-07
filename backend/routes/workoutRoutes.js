const express = require("express");
const router = express.Router();
const {
  logWorkout,
  getWorkoutHistory,
  scheduleWorkout,
  getScheduledCalendar,
  toggleFavoriteWorkout,
  getFavorites,
  deleteWorkoutLog
} = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");

// All routes are guarded by token authorization check
router.use(protect);

router.post("/log", logWorkout);
router.get("/history", getWorkoutHistory);
router.post("/schedule", scheduleWorkout);
router.get("/calendar", getScheduledCalendar);
router.post("/favorite/:workoutId", toggleFavoriteWorkout);
router.get("/favorites", getFavorites);
router.delete("/log/:id", deleteWorkoutLog);

module.exports = router;
