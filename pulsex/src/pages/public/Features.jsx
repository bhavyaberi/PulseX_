import { motion } from "framer-motion";
import { Activity, Dumbbell, Shield, Sparkles, TrendingUp, Users } from "lucide-react";
export default function Features() {
    const featureList = [
        {
            title: "Manual Activity & Biometric Logs",
            desc: "No wearable needed. Easily log steps, sleep duration, daily water intake, heart rate vitals, and active calories burned manually in a clean daily log panel.",
            icon: Activity
        },
        {
            title: "Advanced Workout Logger & Calendar",
            desc: "Log custom workouts across categories (Strength, HIIT, Cardio, Flexibility), set targets for duration and calorie burn, scheduled routines, and save favorite exercises.",
            icon: Dumbbell
        },
        {
            title: "Trainer Collaboration Mode",
            desc: "Share your unique 6-character access code with your coach. Personal Coaches can log directly into your profile to construct custom workout routines and nutrition plans.",
            icon: Users
        },
        {
            title: "Macro Meal Planner",
            desc: "Log breakfast, lunch, dinner, and snacks. Monitor your daily target calories, active protein, carbohydrates, and fats dynamically to align with your targets.",
            icon: Sparkles
        },
        {
            title: "Progress Charts & Telemetry",
            desc: "Review your body composition milestones. Inspect interactive charts for body weight, daily steps, water intake, sleep quality, and heart rate history.",
            icon: TrendingUp
        },
        {
            title: "Biometric Fitness Assessment",
            desc: "Establish height, weight, target milestones, and target BMI indices to monitor your athletic profiles.",
            icon: Shield
        }
    ];
    return (<div className="container-px mx-auto max-w-7xl pb-24 pt-12 md:pb-32">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="eyebrow mb-6 justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
          Technical Stack & Modules
        </div>
        <h1 className="font-display text-display-md md:text-display-lg font-black tracking-tight text-ink">
          Engineered for <span className="text-pulse">Performance</span>.
        </h1>
        <p className="mt-6 text-base text-ink-dim leading-relaxed">
          Explore the modular features built for advanced athletes, trainers, and fitness organizations. Every module is integrated to form a single feedback system.
        </p>
      </div>

      {/* Grid of features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, idx) => {
            const Icon = f.icon;
            return (<motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.08 }} className="card card-hover p-8 border border-line bg-surface/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pulse/10 text-pulse mb-6 border border-pulse/20">
                <Icon className="h-5 w-5"/>
              </div>
              <h3 className="font-display text-lg font-bold text-ink mb-3">{f.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed">{f.desc}</p>
            </motion.div>);
        })}
      </div>

      {/* Access Code Share Callout */}
      <div className="mt-24 rounded-3xl border border-line bg-surface/20 p-8 md:p-12 relative overflow-hidden text-center max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-radial-fade-top opacity-50 blur-3xl pointer-events-none"/>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-4">
          Connect With Your Coach
        </h2>
        <p className="text-sm text-ink-dim leading-relaxed mb-6">
          You can share your 6-character alphanumeric Trainer Access Code present in your profile settings so that your trainer can log in, see your progress, and manage your workout and meal plans directly.
        </p>
        <div className="inline-flex rounded-full bg-pulse/10 border border-pulse/20 px-4 py-1.5 text-xs font-mono font-bold text-pulse tracking-wide animate-pulse">
          Access Code Sharing Enabled 🤝
        </div>
      </div>

    </div>);
}
