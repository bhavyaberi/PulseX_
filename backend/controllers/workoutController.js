const WorkoutLog = require("../models/WorkoutLog");
const User = require("../models/User");
const DailyLog = require("../models/DailyLog");

// Get client's current date YYYY-MM-DD
const getLocalDateString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

// @desc    Log a completed workout
// @route   POST /api/workouts/log
// @access  Private
const logWorkout = async (req, res, next) => {
  try {
    const { date, workoutId, workoutName, category, duration, calories } = req.body;

    if (!workoutId || !workoutName || !category || !duration || !calories) {
      res.status(400);
      throw new Error("Please fill in all completed workout fields");
    }

    const logDate = date || getLocalDateString();

    // Create WorkoutLog in database
    const workoutLog = await WorkoutLog.create({
      user: req.user._id,
      date: logDate,
      workoutId,
      workoutName,
      category,
      duration,
      calories,
      isScheduled: false
    });

    // Automatically update/increment calories burned in the DailyLog metrics record for the day
    let dailyLog = await DailyLog.findOne({ user: req.user._id, date: logDate });
    if (!dailyLog) {
      dailyLog = new DailyLog({
        user: req.user._id,
        date: logDate,
        caloriesBurned: calories
      });
    } else {
      dailyLog.caloriesBurned += calories;
    }
    await dailyLog.save();

    res.status(201).json({
      success: true,
      message: "Workout completed and biometrics updated",
      data: workoutLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get completed workouts history
// @route   GET /api/workouts/history
// @access  Private
const getWorkoutHistory = async (req, res, next) => {
  try {
    const logs = await WorkoutLog.find({
      user: req.user._id,
      isScheduled: false
    }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Schedule a workout on calendar
// @route   POST /api/workouts/schedule
// @access  Private
const scheduleWorkout = async (req, res, next) => {
  try {
    const { date, workoutId, workoutName, category, duration, calories } = req.body;

    if (!date || !workoutId || !workoutName || !category || !duration || !calories) {
      res.status(400);
      throw new Error("Please fill in all scheduling fields");
    }

    const scheduledWorkout = await WorkoutLog.create({
      user: req.user._id,
      date,
      workoutId,
      workoutName,
      category,
      duration,
      calories,
      isScheduled: true
    });

    res.status(201).json({
      success: true,
      message: "Workout scheduled on your fitness calendar",
      data: scheduledWorkout
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get scheduled workouts calendar entries
// @route   GET /api/workouts/calendar
// @access  Private
const getScheduledCalendar = async (req, res, next) => {
  try {
    const calendar = await WorkoutLog.find({
      user: req.user._id,
      isScheduled: true
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: calendar
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle workout favorites
// @route   POST /api/workouts/favorite/:workoutId
// @access  Private
const toggleFavoriteWorkout = async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const index = user.favorites.indexOf(workoutId);
    let isFavorite = false;

    if (index === -1) {
      // Add to favorites
      user.favorites.push(workoutId);
      isFavorite = true;
    } else {
      // Remove from favorites
      user.favorites.splice(index, 1);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isFavorite ? "Added to favorites" : "Removed from favorites",
      data: {
        workoutId,
        isFavorite
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user favorited workout IDs
// @route   GET /api/workouts/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a completed or scheduled workout log
// @route   DELETE /api/workouts/log/:id
// @access  Private
const deleteWorkoutLog = async (req, res, next) => {
  try {
    const log = await WorkoutLog.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!log) {
      res.status(404);
      throw new Error("Workout log record not found");
    }

    // Subtract calories from daily active logs if completed workout
    if (!log.isScheduled) {
      const dailyLog = await DailyLog.findOne({ user: req.user._id, date: log.date });
      if (dailyLog) {
        dailyLog.caloriesBurned = Math.max(0, dailyLog.caloriesBurned - log.calories);
        await dailyLog.save();
      }
    }

    await log.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workout log record removed successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logWorkout,
  getWorkoutHistory,
  scheduleWorkout,
  getScheduledCalendar,
  toggleFavoriteWorkout,
  getFavorites,
  deleteWorkoutLog
};
