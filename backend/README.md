# PulseX — Backend API

Node.js / Express / MongoDB REST API powering the PulseX fitness tracker. Handles auth, user profiles, workouts, meals, daily metrics, fitness assessments, notifications, and admin-managed contact requests.

## Tech Stack

Express 4, Mongoose 8 / MongoDB, JWT (jsonwebtoken), bcryptjs, cors, dotenv, nodemon (dev only)

## Project Structure

backend/
├── config/db.js                # MongoDB connection
├── controllers/                # authController, userController, workoutController, mealController, metricController, assessmentController, notificationController, contactController
├── middleware/                 # authMiddleware (protect), adminMiddleware (protectAdmin), errorMiddleware
├── models/                     # User, WorkoutLog, Meal, DailyLog, FitnessAssessment, Notification, ContactRequest
├── routes/                     # Express routers, mounted in server.js
├── seeder.js                   # database seeding script
├── test-database.js            # DB connectivity test script
├── server.js                   # app entry point
└── package.json

The API runs on http://localhost:5001 (or PORT from .env).

## Environment Variables (.env)

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/pulsex?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development
ADMIN_SECRET=your_admin_secret_key_here

PORT — port Express listens on
MONGODB_URI — MongoDB Atlas (or local) connection string
JWT_SECRET — secret used to sign/verify user auth tokens
JWT_EXPIRE — auth token lifetime (e.g. 30d)
NODE_ENV — development / production
ADMIN_SECRET — shared secret required to access admin-only endpoints (e.g. contact requests). Not a per-user credential — checked directly against adminMiddleware.

Note: ADMIN_SECRET currently must be supplied by the admin client (the hidden /admin/contact-requests frontend route) and is typically kept in the browser's session storage for that session rather than persisted — treat it like a password.

## API Overview

All routes are mounted under /api. Public endpoints handle signup/login and the contact form. Everything else (workouts, meals, metrics, fitness assessments, notifications, user profile) requires a valid user JWT via the protect middleware. Contact request management (viewing/updating/deleting inquiries) is admin-only, gated by the protectAdmin middleware using ADMIN_SECRET. A base health-check route at / confirms the API is running, and unmatched routes fall through to a centralized 404/error handler.

## Auth Model

Passwords are hashed with bcryptjs before being stored on the User model. On login/signup, a JWT is issued (JWT_SECRET, expires per JWT_EXPIRE) and must be sent by the frontend as a Bearer token for all protected routes. authMiddleware's protect function verifies the JWT and attaches the user to req. adminMiddleware's protectAdmin function checks a request-supplied admin key against process.env.ADMIN_SECRET — a shared-secret admin gate, separate from the regular user JWT flow.

## CORS

CORS is enabled globally with default settings — restrict this to specific origins before deploying to production.