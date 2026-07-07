const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Load Environment Configuration from .env
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Body Parser Middleware (Allow incoming JSON payloads)
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Mount API Route definitions
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api/metrics", require("./routes/metricRoutes"));
app.use("/api/assessment", require("./routes/assessmentRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Base Check Route
app.get("/", (req, res) => {
  res.status(200).json({ 
    success: true,
    message: "PulseX API is running successfully..." 
  });
});

// Capture invalid routes (404)
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  next(error);
});

// Custom Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`PulseX Backend running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
