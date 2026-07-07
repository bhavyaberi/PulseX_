const mongoose = require("mongoose");

const FitnessAssessmentSchema = new mongoose.Schema(
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
    restingHr: {
      type: Number,
      required: true
    },
    pushups: {
      type: Number,
      required: true
    },
    squats: {
      type: Number,
      required: true
    },
    sleepScore: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true // overall computed percentage
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("FitnessAssessment", FitnessAssessmentSchema);
