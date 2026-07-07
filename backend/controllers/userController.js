const User = require("../models/User");

// @desc    Get logged in user profile details
// @route   GET /api/user/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile data (biometrics)
// @route   PUT /api/user/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Set updated values or fallback to previous values
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;
    user.height = req.body.height !== undefined ? req.body.height : user.height;
    user.weight = req.body.weight !== undefined ? req.body.weight : user.weight;
    user.targetWeight = req.body.targetWeight !== undefined ? req.body.targetWeight : user.targetWeight;
    user.bodyFat = req.body.bodyFat !== undefined ? req.body.bodyFat : user.bodyFat;
    user.fitnessLevel = req.body.fitnessLevel || user.fitnessLevel;
    user.workoutFrequency = req.body.workoutFrequency !== undefined ? req.body.workoutFrequency : user.workoutFrequency;
    user.dailyCalorieTarget = req.body.dailyCalorieTarget !== undefined ? req.body.dailyCalorieTarget : user.dailyCalorieTarget;
    user.dailyWaterTarget = req.body.dailyWaterTarget !== undefined ? req.body.dailyWaterTarget : user.dailyWaterTarget;
    user.dailySleepTarget = req.body.dailySleepTarget !== undefined ? req.body.dailySleepTarget : user.dailySleepTarget;

    // Dynamically calculate BMI if height and weight are populated
    if (user.height && user.weight) {
      const heightInMeters = user.height / 100;
      user.bmi = Number((user.weight / (heightInMeters * heightInMeters)).toFixed(1));
    } else {
      user.bmi = null;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Biometric profile updated successfully",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        height: updatedUser.height,
        weight: updatedUser.weight,
        targetWeight: updatedUser.targetWeight,
        bodyFat: updatedUser.bodyFat,
        bmi: updatedUser.bmi,
        fitnessLevel: updatedUser.fitnessLevel,
        workoutFrequency: updatedUser.workoutFrequency,
        dailyCalorieTarget: updatedUser.dailyCalorieTarget,
        dailyWaterTarget: updatedUser.dailyWaterTarget,
        dailySleepTarget: updatedUser.dailySleepTarget,
        shareCode: updatedUser.shareCode
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get athlete public details by access code
// @route   GET /api/user/athlete/:shareCode
// @access  Private (Allows coach lookup and access control)
const getAthleteByCode = async (req, res, next) => {
  try {
    const athlete = await User.findOne({ shareCode: req.params.shareCode.toUpperCase() }).select("-password");

    if (!athlete) {
      res.status(404);
      throw new Error("No athlete found matching this Trainer Access Code");
    }

    res.status(200).json({
      success: true,
      data: athlete
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAthleteByCode
};
