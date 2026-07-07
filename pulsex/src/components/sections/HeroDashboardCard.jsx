import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import PulseTrace from "../ui/PulseTrace";
import AnimatedNumber from "../ui/AnimatedNumber";
const EASE_PREMIUM = [0.16, 1, 0.3, 1];
export default function HeroDashboardCard() {
    const wrapRef = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springX = useSpring(rotateX, { stiffness: 160, damping: 20, mass: 0.4 });
    const springY = useSpring(rotateY, { stiffness: 160, damping: 20, mass: 0.4 });
    function handleMouseMove(e) {
        const el = wrapRef.current;
        if (!el)
            return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 8);
        rotateX.set(-py * 8);
    }
    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }
    return (<motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_PREMIUM, delay: 0.3 }} className="relative mx-auto aspect-[4/5] w-full max-w-md" style={{ perspective: 1200 }} ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Glow core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[70%] w-[70%] rounded-full bg-pulse/20 blur-[80px] animate-pulse-glow"/>
      </div>

      {/* Floating + tilting layer */}
      <motion.div className="h-full animate-float-slow" style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}>
        {/* Main glass panel */}
        <div className="card-glass relative flex h-full flex-col justify-between overflow-hidden p-7 shadow-glow-lg">
          {/* Moving glass reflection */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ink/10 to-transparent animate-sheen"/>

          <div className="relative flex items-center justify-between">
            <span className="pill !py-1 !text-[11px]">Live vitals</span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-pulse shadow-glow"/>
          </div>

          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-ink-faint">Heart rate</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold text-ink">
                <AnimatedNumber value={128} duration={1.8} delay={0.7}/>
              </span>
              <span className="text-sm text-ink-dim">bpm</span>
            </div>
            <PulseTrace className="mt-4 h-16 w-full" speed={2.4}/>
          </div>

          <div className="relative grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-ink/[0.03] p-4">
              <div className="text-[11px] uppercase tracking-widest text-ink-faint">Calories</div>
              <div className="mt-1 font-display text-xl font-bold text-ink">
                <AnimatedNumber value={642} duration={1.6} delay={0.85}/>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-ink/[0.03] p-4">
              <div className="text-[11px] uppercase tracking-widest text-ink-faint">Sleep</div>
              <div className="mt-1 font-display text-xl font-bold text-ink">
                <AnimatedNumber value={7} duration={1.2} delay={1} suffix="h "/>
                <AnimatedNumber value={42} duration={1.4} delay={1.1} suffix="m"/>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating metric chip */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE_PREMIUM }} className="card-glass absolute -left-3 sm:-left-10 top-4 flex items-center gap-3 px-4 py-3 shadow-surface animate-float-slow-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pulse/15 text-pulse">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2c-2 0-4 1.5-4 4 0 3 4 6 4 6s4-3 4-6c0-2.5-2-4-4-4Z" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
        </div>
        <div>
          <div className="text-[11px] text-ink-faint">Goal progress</div>
          <div className="font-display text-sm font-bold text-ink">
            <AnimatedNumber value={86} duration={1.5} delay={1.1} suffix="%"/>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.05, ease: EASE_PREMIUM }} className="card-glass absolute -right-3 sm:-right-8 -bottom-6 px-4 py-3 shadow-surface animate-float-slow-sm">
        <div className="text-[11px] text-ink-faint">Hydration</div>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full w-2/3 rounded-full bg-pulse"/>
          </div>
          <span className="text-xs font-semibold text-ink">
            <AnimatedNumber value={2.1} decimals={1} duration={1.4} delay={1.25} suffix="L"/>
          </span>
        </div>
      </motion.div>
    </motion.div>);
}
