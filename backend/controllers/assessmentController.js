const FitnessAssessment = require("../models/FitnessAssessment");
const User = require("../models/User");

// Get client's current date YYYY-MM-DD
const getLocalDateString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

// @desc    Log a new fitness assessment score
// @route   POST /api/assessment
// @access  Private
const logAssessment = async (req, res, next) => {
  try {
    const { restingHr, pushups, squats, sleepScore, score, date } = req.body;

    if (restingHr === undefined || pushups === undefined || squats === undefined || sleepScore === undefined || score === undefined) {
      res.status(400);
      throw new Error("Please fill in all fitness assessment inputs");
    }

    const logDate = date || getLocalDateString();

    const assessment = await FitnessAssessment.create({
      user: req.user._id,
      date: logDate,
      restingHr,
      pushups,
      squats,
      sleepScore,
      score
    });

    // Update user profile fitness level string based on score
    const user = await User.findById(req.user._id);
    if (user) {
      let fitnessLevel = "Beginner";
      if (score >= 85) fitnessLevel = "Elite";
      else if (score >= 70) fitnessLevel = "Advanced";
      else if (score >= 50) fitnessLevel = "Intermediate";
      
      user.fitnessLevel = fitnessLevel;
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Fitness assessment logged and training level recalculated",
      data: assessment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get assessment history
// @route   GET /api/assessment
// @access  Private
const getAssessmentHistory = async (req, res, next) => {
  try {
    const assessments = await FitnessAssessment.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: assessments
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logAssessment,
  getAssessmentHistory
};
