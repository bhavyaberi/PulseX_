# PulseX

PulseX is a full-stack fitness tracking platform with a React (Vite) frontend and a Node.js / Express / MongoDB backend. It lets users track workouts, meals, daily metrics (water, sleep, steps, heart rate), run fitness assessments, set goals, and view progress analytics — with an integrated "Pulse AI" fitness chat assistant.

## Monorepo Structure

PulseX/
├── pulsex/     # Frontend — React + Vite + Tailwind CSS
├── backend/    # Backend — Node.js + Express + MongoDB
└── package.json  # Root convenience scripts

Each folder is a self-contained app with its own package.json, dependencies, and .env file. See pulsex/README.md and backend/README.md for setup details of each app.

## Tech Stack

Frontend: React 19, React Router 7, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons, Lenis smooth scroll

Backend: Express, MongoDB (Mongoose), JWT authentication, bcrypt password hashing

AI Assistant: "Pulse AI" chat widget, powered by the Groq API (Llama 3.3 70B) via a local Vite dev-server middleware, with an offline simulated fallback when no API key is set

## Core Features

- Email/password authentication with JWT
- User profiles with fitness assessment and BMI/calorie calculators
- Daily activity logging: water, sleep, steps, heart rate, calories burned, body measurements
- Workout logging, scheduling/calendar, favorites, and history
- Meal planning and nutrition tracking
- Goal setting and progress analytics (charts)
- In-app notifications
- Public contact form with an admin-only inbox to review/manage inquiries
- Pulse AI chat assistant, aware of the site's pages and navigation

## Prerequisites

- Node.js 18+
- npm
- A MongoDB connection string (local MongoDB or MongoDB Atlas)

## Environment Variables Overview

backend/.env: PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRE, NODE_ENV, ADMIN_SECRET
pulsex/.env: GROQ_API_KEY (optional, enables live Pulse AI responses)

Never commit real .env files — only the .env.example templates are tracked.

## License

This project is currently unlicensed / for personal & educational use. Add a license here if you plan to open-source or distribute it.