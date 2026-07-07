const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"]
    },
    shareCode: {
      type: String,
      required: true,
      unique: true
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
    },
    height: {
      type: Number,
      default: null
    },
    weight: {
      type: Number,
      default: null
    },
    targetWeight: {
      type: Number,
      default: null
    },
    bodyFat: {
      type: Number,
      default: null
    },
    bmi: {
      type: Number,
      default: null
    },
    fitnessLevel: {
      type: String,
      default: "Not Configured"
    },
    workoutFrequency: {
      type: Number,
      default: null
    },
    dailyCalorieTarget: {
      type: Number,
      default: null
    },
    dailyWaterTarget: {
      type: Number,
      default: null
    },
    dailySleepTarget: {
      type: Number,
      default: null
    },
    favorites: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
