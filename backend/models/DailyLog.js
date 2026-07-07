const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema(
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
    waterIntake: {
      type: Number,
      default: 0 // in ml
    },
    sleepHours: {
      type: Number,
      default: 0
    },
    heartRate: {
      type: Number,
      default: 0 // current/resting bpm
    },
    caloriesBurned: {
      type: Number,
      default: 0 // active calories burned
    },
    steps: {
      type: Number,
      default: 0
    },
    weight: {
      type: Number,
      default: null // weight in kg
    },
    chest: {
      type: Number,
      default: null // in cm
    },
    waist: {
      type: Number,
      default: null // in cm
    },
    hips: {
      type: Number,
      default: null // in cm
    },
    supplements: [
      {
        id: {
          type: String,
          required: true // e.g. s1, s2, s3
        },
        name: {
          type: String,
          required: true
        },
        time: {
          type: String,
          required: true
        },
        taken: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Unique index to prevent duplicate logging entries on the same date for the same user
DailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyLog", DailyLogSchema);
