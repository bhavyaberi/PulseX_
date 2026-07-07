const Meal = require("../models/Meal");

// Get client's current date YYYY-MM-DD
const getLocalDateString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

// @desc    Log a new meal
// @route   POST /api/meals
// @access  Private
const logMeal = async (req, res, next) => {
  try {
    const { date, type, name, calories, protein, carbs, fat } = req.body;

    if (!type || !name || calories === undefined || protein === undefined || carbs === undefined || fat === undefined) {
      res.status(400);
      throw new Error("Please fill in all nutrition logging fields");
    }

    const logDate = date || getLocalDateString();

    const meal = await Meal.create({
      user: req.user._id,
      date: logDate,
      type,
      name,
      calories,
      protein,
      carbs,
      fat
    });

    res.status(201).json({
      success: true,
      message: "Meal logged successfully",
      data: meal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get meals for a specific date
// @route   GET /api/meals
// @access  Private
const getMeals = async (req, res, next) => {
  try {
    const logDate = req.query.date || getLocalDateString();
    const meals = await Meal.find({
      user: req.user._id,
      date: logDate
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: meals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a logged meal
// @route   DELETE /api/meals/:id
// @access  Private
const removeMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      res.status(404);
      throw new Error("Meal record not found");
    }

    // Verify record ownership
    if (meal.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to remove this record");
    }

    await meal.deleteOne();

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logMeal,
  getMeals,
  removeMeal
};
