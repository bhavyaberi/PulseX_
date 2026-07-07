import { Outlet, Link } from "react-router-dom";
import logoMark from "../../assets/images/pulsex-mark.png";
import GradientBlobs from "../ui/GradientBlobs";
import Particles from "../ui/Particles";
import ThemeToggle from "../ui/ThemeToggle";
export default function AuthLayout() {
    return (<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-4 py-12">
      {/* Grid and ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]"/>
      
      {/* Glow core */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pulse/15 blur-[100px]"/>
      
      <GradientBlobs />
      <Particles count={15}/>

      <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.02]"/>

      {/* Theme toggle, top-right corner */}
      <div className="absolute right-4 top-4 md:right-6 md:top-6 z-10">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md">
        {/* App Logo branding above card */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img src={logoMark} alt="PulseX" className="h-8 w-8 object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(255,122,26,0.3))" }}/>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Pulse<span className="text-pulse">X</span>
            </span>
          </Link>
        </div>

        {/* Card wrap */}
        <div className="card-glass relative overflow-hidden p-8 md:p-10 shadow-glow-lg border border-ink/10 bg-surface/50 backdrop-blur-2xl">
          <Outlet />
        </div>
      </div>
    </div>);
}
