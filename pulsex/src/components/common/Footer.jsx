import { Link } from "react-router-dom";
import logoMark from "../../assets/images/pulsex-mark.png";
export default function Footer() {
    return (<footer className="relative overflow-hidden border-t border-line bg-void pb-12 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-30 [mask-image:linear-gradient(to_bottom,transparent,#000)]"/>
      
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src={logoMark} alt="PulseX" className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110" style={{ filter: "drop-shadow(0 0 8px rgba(255,122,26,0.3))" }}/>
              <span className="font-display text-lg font-bold tracking-tight text-ink">
                Pulse<span className="text-pulse">X</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-dim">
              PulseX is the digital fitness ecosystem that helps you track your workouts, meals, weight, heart rate, sleep, and progress in one place — turning your data into personalized insights and plans you can actually follow.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Product</h4>
            <ul className="mt-5 space-y-3.5">
              <li>
                <Link to="/features" className="text-sm text-ink-dim hover:text-pulse transition-colors duration-300">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Company</h4>
            <ul className="mt-5 space-y-3.5">
              <li>
                <Link to="/about" className="text-sm text-ink-dim hover:text-pulse transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-ink-dim hover:text-pulse transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-ink-dim hover:text-pulse transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} PulseX Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-xs text-ink-faint hover:text-ink transition-colors duration-300">
              Terms of Use
            </Link>
            <Link to="/privacy" className="text-xs text-ink-faint hover:text-ink transition-colors duration-300">
              Privacy Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>);
}
