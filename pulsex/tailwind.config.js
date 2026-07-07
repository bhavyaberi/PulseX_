/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // All tokens below resolve to CSS custom properties defined in
        // src/index.css (":root" = light theme, ".dark" = dark theme).
        // This lets every existing bg-void / text-ink / border-line / etc.
        // class across the whole app automatically re-theme with zero
        // per-component changes, including Tailwind opacity modifiers
        // like bg-void/50 or border-line/50.
        // RGB-triplet + <alpha-value> is the pattern Tailwind documents for
        // CSS-variable-backed colors: it keeps opacity modifiers (bg-surface/60,
        // bg-surface/[0.04], etc.) working everywhere, including inside @apply.
        void: "rgb(var(--c-void) / <alpha-value>)",
        base: "rgb(var(--c-base) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        "surface-3": "rgb(var(--c-surface-3) / <alpha-value>)",
        // line/line-strong already carry their own baked-in alpha (translucent
        // overlay borders), so they stay as plain rgba() strings.
        line: "var(--c-line)",
        "line-strong": "var(--c-line-strong)",
        pulse: {
          DEFAULT: "#FF7A1A",
          soft: "#FF9A47",
          dim: "rgba(255,122,26,0.14)",
          bright: "#FFB578",
        },
        navy: {
          DEFAULT: "rgb(var(--c-navy) / <alpha-value>)",
          glow: "rgb(var(--c-navy-glow) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          dim: "rgb(var(--c-ink-dim) / <alpha-value>)",
          faint: "rgb(var(--c-ink-faint) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Satoshi", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 3.4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade-top":
          "radial-gradient(60% 50% at 50% 0%, rgba(255,122,26,0.16) 0%, rgba(255,122,26,0) 70%)",
        "navy-glow": "radial-gradient(50% 50% at 50% 50%, rgba(27,42,82,0.55) 0%, rgba(27,42,82,0) 70%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,122,26,0.25)",
        "glow-lg": "0 0 90px rgba(255,122,26,0.22)",
        surface: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "trace-travel": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blink-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        sheen: {
          "0%": { transform: "translateX(-130%) skewX(-18deg)" },
          "55%": { transform: "translateX(160%) skewX(-18deg)" },
          "100%": { transform: "translateX(160%) skewX(-18deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "floatY-sm": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "trace-travel": "trace-travel 2.6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 22s linear infinite",
        "blink-dot": "blink-dot 1.6s ease-in-out infinite",
        sheen: "sheen 6.5s ease-in-out infinite",
        "float-slow": "floatY 6s ease-in-out infinite",
        "float-slow-sm": "floatY-sm 5s ease-in-out infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
