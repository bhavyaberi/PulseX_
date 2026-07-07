const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Meal = require("./models/Meal");
const WorkoutLog = require("./models/WorkoutLog");
const DailyLog = require("./models/DailyLog");
const FitnessAssessment = require("./models/FitnessAssessment");
const Notification = require("./models/Notification");

// Load Environment Configuration from .env
dotenv.config();

const seedDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI variable is missing in your configuration .env file");
    }

    console.log("Connecting to MongoDB Atlas Cluster...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully. Purging existing collections database data...");

    // Clear previous logs
    await User.deleteMany();
    await Meal.deleteMany();
    await WorkoutLog.deleteMany();
    await DailyLog.deleteMany();
    await FitnessAssessment.deleteMany();
    await Notification.deleteMany();

    console.log("Purge finished. Creating default athlete account (Alex Rivera)...");

    // Seed default Athlete User
    const defaultUser = await User.create({
      name: "Alex Rivera",
      email: "alex.rivera@pulsex.io",
      password: "password123", // Will be automatically encrypted by pre-save hooks
      shareCode: "PLX982",
      height: 178,
      weight: 76.5,
      targetWeight: 72.0,
      bodyFat: 16.4,
      bmi: 24.1,
      fitnessLevel: "Intermediate",
      workoutFrequency: 4,
      dailyCalorieTarget: 2200,
      dailyWaterTarget: 3000,
      dailySleepTarget: 8,
      favorites: ["w1", "w3"]
    });

    const todayStr = new Date().toISOString().split("T")[0];

    console.log("Creating default meals logs...");
    // Seed default Daily Meals
    await Meal.create([
      {
        user: defaultUser._id,
        date: todayStr,
        type: "Breakfast",
        name: "Avocado Egg Toast & Protein Shake",
        calories: 520,
        protein: 42,
        carbs: 45,
        fat: 18
      },
      {
        user: defaultUser._id,
        date: todayStr,
        type: "Lunch",
        name: "Grilled Chicken Breast with Brown Rice & Broccoli",
        calories: 650,
        protein: 55,
        carbs: 60,
        fat: 12
      }
    ]);

    console.log("Creating default completed & scheduled workouts...");
    // Seed default Workout Logs
    await WorkoutLog.create([
      {
        user: defaultUser._id,
        date: "2026-07-02",
        workoutId: "w1",
        workoutName: "Hypertrophy Push Routine",
        category: "Strength",
        duration: 45,
        calories: 380,
        isScheduled: false
      },
      {
        user: defaultUser._id,
        date: "2026-07-01",
        workoutId: "w3",
        workoutName: "Core & Stability Engine",
        category: "Strength",
        duration: 20,
        calories: 150,
        isScheduled: false
      },
      {
        user: defaultUser._id,
        date: "2026-07-06",
        workoutId: "w2",
        workoutName: "Metabolic Conditioning HIIT",
        category: "Cardio",
        duration: 30,
        calories: 420,
        isScheduled: true
      }
    ]);

    console.log("Creating default daily activity biometrics log...");
    // Seed default Daily Log
    await DailyLog.create({
      user: defaultUser._id,
      date: todayStr,
      waterIntake: 1500,
      sleepHours: 7.5,
      heartRate: 128,
      caloriesBurned: 642,
      steps: 8430,
      weight: 76.5,
      chest: 103,
      waist: 82,
      hips: 97,
      supplements: [
        { id: "s1", name: "Vitamin D3", time: "09:00 AM", taken: true },
        { id: "s2", name: "Omega-3 Fish Oil", time: "01:00 PM", taken: true },
        { id: "s3", name: "Whey Protein Shake", time: "05:00 PM", taken: false },
        { id: "s4", name: "Magnesium Bisglycinate", time: "09:00 PM", taken: false }
      ]
    });

    console.log("Creating default system notifications...");
    // Seed default Notifications
    await Notification.create({
      user: defaultUser._id,
      title: "Calibrations Online! 🚀",
      message: "PulseX database structures successfully deployed and synced.",
      type: "system",
      read: false
    });

    console.log("\n=========================================");
    console.log("Database seeded successfully!");
    console.log("Default User Email   : alex.rivera@pulsex.io");
    console.log("Default User Password: password123");
    console.log("=========================================\n");

    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
