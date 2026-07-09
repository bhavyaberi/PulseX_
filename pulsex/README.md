# 💻 PulseX – Frontend

![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB) ![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8) ![Routing](https://img.shields.io/badge/Routing-React%20Router-CA4245) ![AI](https://img.shields.io/badge/AI-Pulse%20AI-purple)

## 📌 Overview

This is the frontend of PulseX, built with React and Vite. It gives users a clean dashboard to log workouts, plan meals, track daily health metrics, and chat with **Pulse AI** for fitness and nutrition help.

This app only handles the interface — it talks to the PulseX backend for authentication, storing data, and fetching information. Make sure the backend is running before using this app.

---

## ✨ Features

- Landing page and public pages (About, Features, Contact, FAQ, Blog)
- Signup & Login pages
- User dashboard with:
  - Fitness assessment & goal setting
  - Daily activity logging (water, sleep, steps, heart rate)
  - Workout tracking, history & calendar
  - Meal planner & nutrition dashboard
  - Progress analytics with charts
  - Profile & settings
- Hidden admin page to manage contact requests
- Dark Mode / Light Mode toggle
- Pulse AI floating chat widget

---

## 🛠️ Tech Stack

React 19, Vite, React Router, Tailwind CSS, Framer Motion, Recharts, Lucide Icons

---

## 📂 Project Structure

```
pulsex
│
├── src
│   ├── assets
│   ├── components
│   │   ├── common
│   │   ├── layout
│   │   ├── pulse-ai
│   │   └── ui
│   ├── context
│   ├── pages
│   │   ├── public
│   │   ├── auth
│   │   ├── user
│   │   └── admin
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🤖 Pulse AI

Pulse AI is a chat widget that:
- Answers fitness, workout, and nutrition questions
- Helps users navigate the website
- Works offline with simulated responses if no API key is set

---

## 📄 License

This project is for academic and educational purposes.
