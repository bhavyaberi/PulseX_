import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PulseTrace from "../ui/PulseTrace";
import GradientBlobs from "../ui/GradientBlobs";
import Particles from "../ui/Particles";
import Magnetic from "../ui/Magnetic";
import HeroDashboardCard from "./HeroDashboardCard";
const EASE_PREMIUM = [0.16, 1, 0.3, 1];
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE_PREMIUM, delay: 0.15 + i * 0.09 },
    }),
};
export default function Hero() {
    return (<section className="relative overflow-hidden bg-void pb-24 pt-40 md:pb-32 md:pt-48">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"/>

      {/* Ambient orange lighting — breathes gently like a heartbeat */}
      <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-radial-fade-top" animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}/>

      {/* Cinematic motion-trail streaks — abstract energy, not literal photography */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-screen">
        <div className="absolute left-[8%] top-[12%] h-[2px] w-[38%] rotate-[-14deg] bg-gradient-to-r from-transparent via-pulse to-transparent blur-[2px]"/>
        <div className="absolute left-[2%] top-[22%] h-[1.5px] w-[26%] rotate-[-14deg] bg-gradient-to-r from-transparent via-pulse-soft to-transparent blur-[1.5px]"/>
        <div className="absolute right-[4%] bottom-[18%] h-[2px] w-[30%] rotate-[10deg] bg-gradient-to-r from-transparent via-navy-glow to-transparent blur-[2px]"/>
      </div>

      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-navy-glow blur-3xl"/>

      <GradientBlobs />
      <Particles count={20}/>
      <div className="noise-layer pointer-events-none absolute inset-0 opacity-[0.035]"/>

      <div className="container-px relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: copy */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="pill mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
            Intelligent fitness, engineered like software
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-display-xl font-black">
            Move.
            <br />
            <span className="relative inline-block">
              Measure.
              <PulseTrace className="absolute -bottom-2 left-0 h-6 w-full" d="M0,14 L110,14 L124,4 L138,22 L152,14 L320,14" viewBox="0 0 320 24" dashArray="30 290" strokeWidth={3} speed={2.8}/>
            </span>
            <br />
            <span className="text-ink-dim">Master.</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-9 max-w-lg text-lg leading-relaxed text-ink-dim">
            PulseX is the digital fitness ecosystem that helps you track your workouts, meals, weight, heart rate, sleep, and progress in one place — turning your data into personalized insights and plans you can actually follow.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-11 max-w-md">
            <Magnetic strength={10}>
              <Link to="/signup" className="btn-primary flex w-full justify-center items-center gap-2 py-3.5 text-sm font-bold text-center">
                Start Your Journey!
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-16 flex items-center gap-8 border-t border-line pt-8">
            {[
            ["120K+", "Athletes tracked"],
            ["4.9/5", "App rating"],
            ["8.2M", "Workouts logged"],
        ].map(([stat, label]) => (<div key={label}>
                <div className="font-display text-2xl font-bold text-ink">{stat}</div>
                <div className="mt-1 text-xs text-ink-faint">{label}</div>
              </div>))}
          </motion.div>
        </div>

        {/* Right: abstract animated pulse / dashboard visual */}
        <HeroDashboardCard />
      </div>
    </section>);
}
