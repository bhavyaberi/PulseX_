import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Modern swipe toggle switch for Light / Dark mode.
 * Built purely with Tailwind CSS (no extra libraries).
 */
export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-line
        bg-surface-2 transition-colors duration-300 ease-premium
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pulse
        ${className}`}
    >
      {/* Track icons */}
      <Sun
        className={`absolute left-1.5 h-3.5 w-3.5 transition-opacity duration-300 ${
          isDark ? "opacity-0" : "opacity-100 text-pulse"
        }`}
      />
      <Moon
        className={`absolute right-1.5 h-3.5 w-3.5 transition-opacity duration-300 ${
          isDark ? "opacity-100 text-pulse" : "opacity-0"
        }`}
      />

      {/* Sliding knob */}
      <span
        className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-base
          shadow-surface border border-line-strong transition-transform duration-300 ease-premium
          ${isDark ? "translate-x-[26px]" : "translate-x-1"}`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-pulse" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-pulse" />
        )}
      </span>
    </button>
  );
}
