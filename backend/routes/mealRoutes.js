const express = require("express");
const router = express.Router();
const { logMeal, getMeals, removeMeal } = require("../controllers/mealController");
const { protect } = require("../middleware/authMiddleware");

// All routes are guarded by token authorization check
router.use(protect);

router.route("/")
  .post(logMeal)
  .get(getMeals);

router.delete("/:id", removeMeal);

module.exports = router;
