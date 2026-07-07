const DailyLog = require("../models/DailyLog");
const User = require("../models/User");

// Get client's current date YYYY-MM-DD
const getLocalDateString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

// Default supplements template
const defaultSupplements = [
  { id: "s1", name: "Vitamin D3", time: "09:00 AM", taken: false },
  { id: "s2", name: "Omega-3 Fish Oil", time: "01:00 PM", taken: false },
  { id: "s3", name: "Whey Protein Shake", time: "05:00 PM", taken: false },
  { id: "s4", name: "Magnesium Bisglycinate", time: "09:00 PM", taken: false }
];

// Helper to find or create a DailyLog document for a given date
const getOrCreateDailyLog = async (userId, date) => {
  let log = await DailyLog.findOne({ user: userId, date });
  if (!log) {
    log = await DailyLog.create({
      user: userId,
      date,
      supplements: defaultSupplements
    });
  }
  return log;
};

// @desc    Get metrics for a specific date (defaults to today)
// @route   GET /api/metrics/today
// @access  Private
const getTodayMetrics = async (req, res, next) => {
  try {
    const logDate = req.query.date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);
    res.status(200).json({
      success: true,
      data: log
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log/Add water intake
// @route   POST /api/metrics/water
// @access  Private
const logWater = async (req, res, next) => {
  try {
    const { amount, date } = req.body; // amount in ml

    if (amount === undefined || amount === null) {
      res.status(400);
      throw new Error("Please provide water amount");
    }

    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    log.waterIntake = (log.waterIntake || 0) + Number(amount);
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Water logged successfully",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset water intake
// @route   POST /api/metrics/water/reset
// @access  Private
const resetWater = async (req, res, next) => {
  try {
    const { date } = req.body;
    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    log.waterIntake = 0;
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Water intake reset",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log sleep duration
// @route   POST /api/metrics/sleep
// @access  Private
const logSleep = async (req, res, next) => {
  try {
    const { hours, date } = req.body;

    if (hours === undefined || hours === null) {
      res.status(400);
      throw new Error("Please provide sleep hours");
    }

    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    log.sleepHours = Number(hours);
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Sleep hours logged successfully",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log steps count
// @route   POST /api/metrics/steps
// @access  Private
const logSteps = async (req, res, next) => {
  try {
    const { steps, date } = req.body;

    if (steps === undefined || steps === null) {
      res.status(400);
      throw new Error("Please provide steps count");
    }

    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    log.steps = Number(steps);
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Steps logged successfully",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log current/resting heart rate
// @route   POST /api/metrics/heartrate
// @access  Private
const logHeartRate = async (req, res, next) => {
  try {
    const { rate, date } = req.body;

    if (!rate) {
      res.status(400);
      throw new Error("Please provide heart rate value");
    }

    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    log.heartRate = Number(rate);
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Heart rate logged successfully",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log active calories burned
// @route   POST /api/metrics/calories
// @access  Private
const logCaloriesBurned = async (req, res, next) => {
  try {
    const { calories, date } = req.body;

    if (calories === undefined || calories === null) {
      res.status(400);
      throw new Error("Please provide calories burned");
    }

    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    log.caloriesBurned = Number(calories);
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Active calories logged successfully",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log weight & measurements biometrics
// @route   POST /api/metrics/measurements
// @access  Private
const logMeasurements = async (req, res, next) => {
  try {
    const { weight, chest, waist, hips, date } = req.body;
    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    // Set metrics in daily record if supplied
    if (weight !== undefined && weight !== null) {
      log.weight = Number(weight);
      
      // Keep main user profile model weight synchronized
      const user = await User.findById(req.user._id);
      if (user) {
        user.weight = Number(weight);
        // Recalculate BMI automatically if height is present
        if (user.height) {
          const heightInMeters = user.height / 100;
          user.bmi = Number((user.weight / (heightInMeters * heightInMeters)).toFixed(1));
        }
        await user.save();
      }
    }
    if (chest !== undefined && chest !== null) log.chest = Number(chest);
    if (waist !== undefined && waist !== null) log.waist = Number(waist);
    if (hips !== undefined && hips !== null) log.hips = Number(hips);

    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: "Biometrics logged successfully",
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle supplement checkbox
// @route   PUT /api/metrics/supplements/:supplementId
// @access  Private
const toggleSupplement = async (req, res, next) => {
  try {
    const { supplementId } = req.params;
    const { date } = req.body;
    const logDate = date || getLocalDateString();
    const log = await getOrCreateDailyLog(req.user._id, logDate);

    const supplement = log.supplements.find(s => s.id === supplementId);
    if (!supplement) {
      res.status(404);
      throw new Error("Supplement record not found");
    }

    supplement.taken = !supplement.taken;
    const updatedLog = await log.save();

    res.status(200).json({
      success: true,
      message: `${supplement.name} status updated`,
      data: updatedLog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get historical logs for charts (weight, steps, water, sleep)
// @route   GET /api/metrics/history
// @access  Private
const getMetricsHistory = async (req, res, next) => {
  try {
    // Fetch logs sorted chronologically
    const history = await DailyLog.find({ user: req.user._id }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
