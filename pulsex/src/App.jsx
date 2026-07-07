import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Toast from "./components/common/Toast";
import PulseAI from "./components/pulse-ai/PulseAI";
// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import AuthLayout from "./components/layout/AuthLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
// Public Pages
import Landing from "./pages/Landing";
import AboutUs from "./pages/public/About";
import Features from "./pages/public/Features";
import Contact from "./pages/public/Contact";
import FAQ from "./pages/public/FAQ";
import Blog from "./pages/public/Blog";
import Privacy from "./pages/public/Privacy";
import Terms from "./pages/public/Terms";
import NotFound from "./pages/public/NotFound";
// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
// User Dashboard Pages
import DashboardOverview from "./pages/user/DashboardOverview";
import UserProfile from "./pages/user/UserProfile";
import EditProfile from "./pages/user/EditProfile";
import FitnessAssessment from "./pages/user/FitnessAssessment";
import GoalSetting from "./pages/user/GoalSetting";
import DailyActivity from "./pages/user/DailyActivity";
import WorkoutTracking from "./pages/user/WorkoutTracking";
import ExerciseHistory from "./pages/user/ExerciseHistory";
import WorkoutCalendar from "./pages/user/WorkoutCalendar";
import WorkoutLibrary from "./pages/user/WorkoutLibrary";
import ExerciseDetails from "./pages/user/ExerciseDetails";
import Favorites from "./pages/user/Favorites";
import RecommendedWorkouts from "./pages/user/RecommendedWorkouts";
import DietDashboard from "./pages/user/DietDashboard";
import MealPlanner from "./pages/user/MealPlanner";
import CalorieCalculator from "./pages/user/CalorieCalculator";
import NutritionDashboard from "./pages/user/NutritionDashboard";
import ProgressAnalytics from "./pages/user/ProgressAnalytics";
import BmiCalculator from "./pages/user/BmiCalculator";
import Settings from "./pages/user/Settings";
// Admin Pages (private, not linked in navigation)
import ContactRequests from "./pages/admin/ContactRequests";
export default function App() {
    return (<AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing / Home Page */}
          <Route path="/" element={<Landing />}/>

          {/* Public Subpages */}
          <Route element={<PublicLayout />}>
            <Route path="/about" element={<AboutUs />}/>
            <Route path="/features" element={<Features />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/faq" element={<FAQ />}/>
            <Route path="/blog" element={<Blog />}/>
            <Route path="/privacy" element={<Privacy />}/>
            <Route path="/terms" element={<Terms />}/>
          </Route>

          {/* Authentication Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
          </Route>

          {/* Dashboard Portal (Unified Sidebar) */}
          <Route element={<DashboardLayout />}>
            {/* User Dashboard */}
            <Route path="/dashboard" element={<DashboardOverview />}/>
            <Route path="/dashboard/profile" element={<UserProfile />}/>
            <Route path="/dashboard/profile/edit" element={<EditProfile />}/>
            <Route path="/dashboard/assessment" element={<FitnessAssessment />}/>
            <Route path="/dashboard/goals" element={<GoalSetting />}/>
            <Route path="/dashboard/activity" element={<DailyActivity />}/>
            <Route path="/dashboard/workouts" element={<WorkoutTracking />}/>
            <Route path="/dashboard/workouts/history" element={<ExerciseHistory />}/>
            <Route path="/dashboard/workouts/calendar" element={<WorkoutCalendar />}/>
            <Route path="/dashboard/workouts/library" element={<WorkoutLibrary />}/>
            <Route path="/dashboard/workouts/exercise/:id" element={<ExerciseDetails />}/>
            <Route path="/dashboard/workouts/favorites" element={<Favorites />}/>
            <Route path="/dashboard/workouts/recommended" element={<RecommendedWorkouts />}/>
            <Route path="/dashboard/diet" element={<DietDashboard />}/>
            <Route path="/dashboard/diet/meal-planner" element={<MealPlanner />}/>
            <Route path="/dashboard/diet/calculator" element={<CalorieCalculator />}/>
            <Route path="/dashboard/diet/nutrition" element={<NutritionDashboard />}/>
            <Route path="/dashboard/analytics" element={<ProgressAnalytics />}/>
            <Route path="/dashboard/progress/calculator" element={<BmiCalculator />}/>
            <Route path="/dashboard/settings" element={<Settings />}/>
          </Route>

          {/* Admin Only - private, intentionally not linked anywhere in the UI */}
          <Route path="/admin/contact-requests" element={<ContactRequests />}/>

          {/* 404 Route */}
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
        <PulseAI />
      </BrowserRouter>
      <Toast />
    </AppProvider>);
}
