import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Activity, Dumbbell, LineChart, LogOut, Menu, Settings, Sliders, Target, User, Utensils, X } from "lucide-react";
import logoMark from "../../assets/images/pulsex-mark.png";
import ThemeToggle from "../ui/ThemeToggle";
export default function DashboardLayout() {
    const { profile, showToast } = useApp();
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // Route protection checker
    const isLoggedIn = sessionStorage.getItem("pulse_is_logged_in") === "true";
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login", { replace: true });
        }
    }, [isLoggedIn, navigate]);
    if (!isLoggedIn) {
        return null; // Prevent layout flashing before navigation
    }
    // Define sidebar navigation items
    const userNav = [
        { label: "Overview", icon: Activity, path: "/dashboard" },
        { label: "Assessment", icon: Sliders, path: "/dashboard/assessment" },
        { label: "Goals", icon: Target, path: "/dashboard/goals" },
        { label: "Daily Logs", icon: User, path: "/dashboard/activity" },
        { label: "Workout Tracking", icon: Dumbbell, path: "/dashboard/workouts" },
        { label: "Meal Planner", icon: Utensils, path: "/dashboard/diet" },
        { label: "Progress Analytics", icon: LineChart, path: "/dashboard/analytics" },
        { label: "Profile Settings", icon: Settings, path: "/dashboard/profile" }
    ];
    const currentNav = userNav;
    // Breadcrumbs helper
    const getBreadcrumbs = () => {
        const parts = location.pathname.split("/").filter(Boolean);
        return parts.map((part, i) => {
            const path = "/" + parts.slice(0, i + 1).join("/");
            const label = part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");
            return { label, path };
        });
    };
    const breadcrumbs = getBreadcrumbs();
    return (<div className="relative flex min-h-screen bg-void text-ink overflow-hidden">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"/>

      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-line bg-base/50 backdrop-blur-xl">
        {/* Brand header */}
        <div className="flex h-20 items-center gap-2.5 px-6 border-b border-line">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoMark} alt="PulseX" className="h-8 w-8 object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(255,122,26,0.3))" }}/>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Pulse<span className="text-pulse">X</span>
            </span>
          </Link>
        </div>

        {/* Sidebar Scrollable Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (<Link key={item.path} to={item.path} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${active
                    ? "bg-pulse/10 text-pulse border border-pulse/20"
                    : "text-ink-dim hover:text-ink hover:bg-ink/[0.03] border border-transparent"}`}>
                <Icon className={`h-4 w-4 ${active ? "text-pulse" : "text-ink-faint group-hover:text-ink"}`}/>
                {item.label}
              </Link>);
        })}
        </nav>

        {/* Profile Details & Logout */}
        <div className="p-4 border-t border-line bg-void/35 space-y-3">
          <div className="flex items-center gap-3 p-1">
            <img src={profile.avatar} alt={profile.name} className="h-9 w-9 rounded-full object-cover border border-line-strong"/>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-ink truncate">{profile.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-pulse font-semibold">Athlete</div>
            </div>
          </div>
          <button onClick={() => {
              navigate("/", { replace: true });
              sessionStorage.removeItem("pulse_is_logged_in");
              sessionStorage.removeItem("pulse_token");
              showToast("Signed out successfully.", "info");
          }} className="w-full flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/40 px-3 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all duration-300">
            <LogOut className="h-3.5 w-3.5"/>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileOpen && (<div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-void/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}/>

          <aside className="relative flex w-64 max-w-xs flex-col bg-base border-r border-line p-4 shadow-surface z-50">
            <div className="flex items-center justify-between pb-6 mb-2 border-b border-line">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <img src={logoMark} alt="PulseX" className="h-7 w-7 object-contain"/>
                <span className="font-display text-md font-bold text-ink">PulseX</span>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button onClick={() => setMobileOpen(false)} className="h-8 w-8 rounded-full border border-line flex items-center justify-center text-ink-dim hover:text-ink">
                  <X className="h-4 w-4"/>
                </button>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {currentNav.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (<Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${active ? "bg-pulse/10 text-pulse border border-pulse/10" : "text-ink-dim hover:text-ink"}`}>
                    <Icon className="h-4 w-4"/>
                    {item.label}
                  </Link>);
            })}
            </nav>

            <div className="border-t border-line pt-4 space-y-3">
              <div className="flex items-center gap-3 p-2 bg-ink/[0.02] rounded-xl border border-line">
                <img src={profile.avatar} alt="Profile" className="h-8 w-8 rounded-full object-cover"/>
                <div>
                  <div className="text-xs font-bold text-ink truncate max-w-[120px]">{profile.name}</div>
                  <span className="text-[10px] text-pulse uppercase font-semibold">Athlete</span>
                </div>
              </div>
              <button onClick={() => {
                  navigate("/", { replace: true });
                  sessionStorage.removeItem("pulse_is_logged_in");
                  sessionStorage.removeItem("pulse_token");
                  showToast("Signed out successfully.", "info");
              }} className="w-full flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/40 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut className="h-3.5 w-3.5"/>
                Sign Out
              </button>
            </div>
          </aside>
        </div>)}

      {/* RIGHT SIDE MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 border-b border-line flex items-center justify-between px-6 md:px-8 bg-void/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-ink-dim hover:text-ink p-1.5 rounded-full border border-line">
              <Menu className="h-4 w-4"/>
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-ink-dim">
              <Link to="/" className="hover:text-ink transition-colors">PulseX</Link>
              {breadcrumbs.map((crumb, idx) => (<span key={crumb.path} className="flex items-center gap-1.5">
                  <span className="text-ink-faint">/</span>
                  <Link to={crumb.path} className={`hover:text-ink transition-colors ${idx === breadcrumbs.length - 1 ? "text-ink font-semibold" : ""}`}>
                    {crumb.label}
                  </Link>
                </span>))}
            </nav>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Profile trigger */}
            <Link to="/dashboard/profile" className="flex items-center gap-2">
              <img src={profile.avatar} alt="Profile" className="h-8 w-8 rounded-full object-cover border border-line hover:border-pulse transition-all duration-300"/>
            </Link>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>);
}
