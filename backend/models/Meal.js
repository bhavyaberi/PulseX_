const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String,
      required: true // YYYY-MM-DD format
    },
    type: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner", "Snacks"]
    },
    name: {
      type: String,
      required: [true, "Meal name is required"],
      trim: true
    },
    calories: {
      type: Number,
      required: [true, "Calorie value is required"],
      min: [0, "Calories cannot be negative"]
    },
    protein: {
      type: Number,
      required: [true, "Protein value is required"],
      min: [0, "Protein cannot be negative"]
    },
    carbs: {
      type: Number,
      required: [true, "Carbohydrates value is required"],
      min: [0, "Carbohydrates cannot be negative"]
    },
    fat: {
      type: Number,
      required: [true, "Fat value is required"],
      min: [0, "Fat cannot be negative"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Meal", MealSchema);
