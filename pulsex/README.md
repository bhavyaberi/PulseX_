# PulseX — Frontend

The React frontend for PulseX, a fitness tracking web app. Built with Vite, React Router, Tailwind CSS, and Framer Motion.

This app is the UI only. It talks to the backend API in ../backend for auth, workouts, meals, metrics, and more. Start the backend separately before running this app.

## Tech Stack

- React 19 + React Router 7 — SPA routing
- Vite 8 — dev server & build tooling
- Tailwind CSS 3 — styling
- Framer Motion — animations
- Recharts — progress/analytics charts
- Lucide React — icons
- Lenis — smooth scrolling
- oxlint — linting

## Project Structure

pulsex/
├── src/
│   ├── assets/            # images/logos
│   ├── components/
│   │   ├── common/        # Footer, Toast
│   │   ├── layout/        # PublicLayout, AuthLayout, DashboardLayout, Navbar
│   │   ├── pulse-ai/      # Pulse AI chat widget (ChatWindow, MessageItem, api.js)
│   │   └── ui/            # AnimatedNumber, GradientBlobs, Magnetic, Particles, PulseTrace, ThemeToggle
│   ├── context/            # AppContext, ThemeContext
│   ├── pages/
│   │   ├── public/        # About, Features, Contact, FAQ, Blog, Privacy, Terms, NotFound
│   │   ├── auth/           # Login, Signup
│   │   ├── user/           # Dashboard pages: overview, goals, workouts, meals, progress, settings, etc.
│   │   └── admin/          # ContactRequests (hidden admin-only route)
│   ├── App.jsx             # route definitions
│   ├── main.jsx            # app entry point
│   └── index.css           # Tailwind + global styles
├── public/
├── index.html
├── vite.config.js          # includes a local Pulse AI chat proxy middleware
├── tailwind.config.js
└── package.json

## Key Routes

Landing page at /. Public pages: about, features, contact, faq, blog, privacy, terms. Auth pages: login, signup. Dashboard pages under /dashboard cover overview, assessment, goals, activity, workouts (tracking, history, calendar, library, favorites), diet (meal planner, nutrition), progress analytics, settings, and profile. There is also a hidden admin-only route for contact requests, not linked in navigation.

## Environment Variables

Create pulsex/.env from .env.example:

VITE_GEMINI_API_KEY=your_gemini_api_key_here

Despite the variable name in the example file, the current Pulse AI proxy (in vite.config.js) reads GROQ_API_KEY from the environment to call the Groq API (llama-3.3-70b-versatile). If no key is configured, Pulse AI automatically falls back to an offline simulated response mode — the app still works without any AI key.

## Pulse AI Chat Widget

Implements a floating chat assistant that is aware of PulseX's page structure and can guide users around the site, answers fitness/nutrition/wellness questions, sends requests to a local /api/chat endpoint (Vite middleware in vite.config.js) which proxies to the Groq API server-side so the key is never exposed to the browser, includes basic in-memory rate limiting (20 requests/minute per IP), and falls back to a simulated offline mode if GROQ_API_KEY isn't set.

## Notes

The admin contact-requests page is intentionally not linked from the navigation and requires the backend's admin secret to fetch data. Design system uses a dark glassmorphism aesthetic; global tokens live in src/index.css.

