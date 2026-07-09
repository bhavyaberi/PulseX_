# ⚙️ PulseX – Backend

![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green) ![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Auth](https://img.shields.io/badge/Auth-JWT-orange)

## 📌 Overview

This is the backend API for PulseX. It's built with Node.js, Express, and MongoDB, and handles everything the frontend needs — user accounts, workouts, meals, daily metrics, fitness assessments, notifications, and contact form requests.

Users log in and get a JWT token, which they use to access their protected data. Admins use a separate secret key to manage contact form submissions.

---

## ✨ What It Handles

- User signup & login (with hashed passwords)
- User profile management
- Workout logging, scheduling & history
- Meal logging
- Daily metrics: water, sleep, steps, heart rate, calories, measurements
- Fitness assessments
- Notifications
- Public contact form + admin-only inbox to manage messages

---

## 🛠️ Tech Stack

Express, MongoDB (Mongoose), JWT, bcrypt, cors, dotenv, nodemon

---

## 📂 Project Structure

```
backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── seeder.js
├── test-database.js
├── package.json
└── server.js
```

---

## 🔐 How Auth Works

1. User signs up or logs in → password is checked/hashed with bcrypt
2. A JWT token is generated and sent back to the frontend
3. The frontend includes this token on every request to protected routes
4. Admin routes are protected separately using `ADMIN_SECRET`, not a user token

---

## 📄 License

This project is for academic and educational purposes.
