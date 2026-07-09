# 🏋️ PulseX – AI-Powered Fitness Tracking Platform

![License](https://img.shields.io/badge/License-Academic-blue) ![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB) ![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green) ![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Auth](https://img.shields.io/badge/Auth-JWT-orange) ![AI](https://img.shields.io/badge/AI-Groq-purple)

## 📌 Overview

PulseX is a full-stack fitness tracking platform that helps users manage their entire fitness journey in one place. Users can log workouts, plan meals, track daily health metrics like water intake, sleep, and steps, and monitor their progress over time through simple charts.

The platform also includes **Pulse AI**, a smart chat assistant built on the Groq API. It can answer fitness and nutrition questions and guide users around the website. If the AI service isn't available, it automatically falls back to a simple offline response mode so the app never breaks.

---

## ✨ Features

### 🙋 User
- Secure Signup & Login (JWT Authentication)
- Fitness Assessment & BMI/Calorie Calculators
- Daily Activity Logging (water, sleep, steps, heart rate)
- Workout Logging, Scheduling & History
- Meal Planning & Nutrition Tracking
- Goal Setting & Progress Analytics
- In-app Notifications
- Dark Mode / Light Mode

### 🛡️ Admin
- View and manage contact form submissions
- Secure access using an admin-only secret key

### 🤖 Pulse AI
- Chat assistant for fitness and nutrition queries
- Understands the website's pages and can guide users
- Falls back to offline mode if no API key is set

---

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, React Router, Tailwind CSS, Framer Motion, Recharts

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

**AI:** Groq API (Llama 3.3 70B)

---

## 📂 Project Structure

```
PulseX
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seeder.js
│   ├── package.json
│   └── server.js
│
├── pulsex
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public
│   ├── index.html
│   └── package.json
│
├── README.md
└── package.json
```

---

## ⚙️ Installation

**1. Clone the repository**
```
git clone https://github.com/your-username/PulseX.git
cd PulseX
```

**2. Set up the backend**
```
cd backend
npm install
cp .env.example .env
```
Fill in your MongoDB URI, JWT secret, and admin secret in `.env`, then start it:
```
npm run dev
```

**3. Set up the frontend**
```
cd pulsex
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5001`.

---

## 🔑 Environment Variables

**backend/.env**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
NODE_ENV=development
ADMIN_SECRET=your_admin_secret
```

**pulsex/.env**
```
VITE_GEMINI_API_KEY=your_groq_api_key
```

---

## 📄 License

This project is for academic and educational purposes.

---

## 👥 Contributors

- Bebo
- Pritam
- Aarshi
