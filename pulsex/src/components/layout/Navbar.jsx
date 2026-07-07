import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logoMark from "../../assets/images/pulsex-mark.png";
import Magnetic from "../ui/Magnetic";
import ThemeToggle from "../ui/ThemeToggle";
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
];
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="fixed top-0 inset-x-0 z-50">
      <div className={`container-px mx-auto flex items-center justify-between transition-all duration-500 ease-premium ${scrolled ? "py-3" : "py-6"}`}>
        <div className={`flex w-full items-center justify-between rounded-full border transition-all duration-500 ease-premium ${scrolled
            ? "border-line bg-void/70 backdrop-blur-xl shadow-surface px-4 py-2"
            : "border-transparent bg-transparent px-2 py-2"}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoMark} alt="PulseX" className="h-9 w-9 object-contain transition-transform duration-500 ease-premium group-hover:scale-110" style={{ filter: "drop-shadow(0 0 10px rgba(255,122,26,0.35))" }}/>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Pulse<span className="text-pulse">X</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
            const active = location.pathname === link.href;
            return (<Magnetic key={link.href} strength={10}>
                  <Link to={link.href} className={`nav-link ${active ? "text-pulse after:w-full" : ""}`}>
                    {link.label}
                  </Link>
                </Magnetic>);
        })}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Magnetic strength={10}>
              <Link to="/login" className="btn-ghost">
                Log in
              </Link>
            </Magnetic>
            <Magnetic strength={12}>
              <Link to="/signup" className="btn-primary !py-2.5 !px-5 !text-[13px]">
                Get started
              </Link>
            </Magnetic>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-full text-ink" onClick={() => setOpen((v) => !v)}>
            <div className="relative h-4 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-ink transition-all duration-300 ${open ? "top-[7px] rotate-45" : "top-0"}`}/>
              <span className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}/>
              <span className={`absolute left-0 h-[1.5px] w-5 bg-ink transition-all duration-300 ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`}/>
            </div>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="md:hidden overflow-hidden container-px mx-auto">
        <div className="card mt-2 flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.href;
            return (<Link key={link.href} to={link.href} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${active
                    ? "bg-pulse/10 text-pulse font-semibold"
                    : "text-ink-dim hover:bg-ink/5 hover:text-ink"}`}>
                {link.label}
              </Link>);
        })}
          <div className="mt-2 flex gap-2 px-3 pb-1">
            <Link to="/login" className="btn-secondary flex-1 !py-2.5 !text-[13px]">
              Log in
            </Link>
            <Link to="/signup" className="btn-primary flex-1 !py-2.5 !text-[13px]">
              Get started
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.header>);
}
