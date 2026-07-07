const mongoose = require("mongoose");

const WorkoutLogSchema = new mongoose.Schema(
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
    workoutId: {
      type: String,
      required: true // maps to predefined front-end IDs (w1, w2, etc.) or custom
    },
    workoutName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true, // in minutes
      min: [1, "Duration must be at least 1 minute"]
    },
    calories: {
      type: Number,
      required: true,
      min: [0, "Calories cannot be negative"]
    },
    isScheduled: {
      type: Boolean,
      default: false // true if planned in calendar, false if completed/logged
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("WorkoutLog", WorkoutLogSchema);
