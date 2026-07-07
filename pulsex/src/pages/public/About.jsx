import React from "react";
import { BookOpen, Award, Target, Rocket } from "lucide-react";
export default function AboutUs() {
    return (<div className="container-px mx-auto max-w-4xl pb-24 pt-12 md:pb-32 space-y-16 animate-fade-up">
      {/* Header section */}
      <div>
        <div className="eyebrow mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
          ABOUT US
        </div>
        <h1 className="font-display text-display-md md:text-display-lg font-black tracking-tight text-ink">
          We build technology that <br />
          supports <span className="text-pulse">fitness journeys</span>.
        </h1>
        <p className="mt-8 text-base text-ink-dim leading-relaxed">
          PulseX was founded in 2026 by a team of B.Tech Computer Science Engineering students who noticed that while many fitness applications exist, very few provide a simple, centralized platform for tracking every aspect of a user's fitness journey in one place.
        </p>
        <p className="mt-4 text-base text-ink-dim leading-relaxed">
          As students passionate about both technology and fitness, we wanted to create a digital ecosystem where users could monitor workouts, meals, body weight, heart rate, sleep, and overall progress without needing multiple applications or complicated tools. PulseX was built to bridge the gap between fitness tracking and consistency by turning personal health data into actionable insights and achievable goals.
        </p>
      </div>

      {/* Grid of values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-8 border border-line bg-surface/40 hover:border-pulse/30 transition-all duration-300">
          <div className="font-display text-xs font-bold text-pulse uppercase tracking-wider mb-2">01</div>
          <h3 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-pulse"/>
            Technology-Driven
          </h3>
          <p className="text-xs text-ink-dim leading-relaxed">
            We use software to simplify fitness management. PulseX organizes your workouts, nutrition, body metrics, and progress into a single, easy-to-use platform.
          </p>
        </div>

        <div className="card p-8 border border-line bg-surface/40 hover:border-pulse/30 transition-all duration-300">
          <div className="font-display text-xs font-bold text-pulse uppercase tracking-wider mb-2">02</div>
          <h3 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-pulse"/>
            Personalized Progress
          </h3>
          <p className="text-xs text-ink-dim leading-relaxed">
            Every fitness journey is different. PulseX helps users monitor their own data and progress over time, making it easier to stay motivated and make informed decisions.
          </p>
        </div>

        <div className="card p-8 border border-line bg-surface/40 hover:border-pulse/30 transition-all duration-300">
          <div className="font-display text-xs font-bold text-pulse uppercase tracking-wider mb-2">03</div>
          <h3 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-pulse"/>
            Built by Students
          </h3>
          <p className="text-xs text-ink-dim leading-relaxed">
            As Computer Science students, we combined our technical skills with our interest in health and fitness to create a platform that is accessible, practical, and user-focused.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="card-glass p-8 md:p-10 shadow-glow-lg border border-line bg-surface/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-full bg-pulse/5 blur-[80px] pointer-events-none"/>
        <h2 className="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-pulse"/>
          Our Vision
        </h2>
        <p className="text-sm text-ink-dim leading-relaxed mb-4">
          We believe fitness should be guided by data, consistency, and simplicity rather than guesswork. PulseX aims to become a complete digital fitness ecosystem where users can track their journey, understand their progress, and stay committed to their goals.
        </p>
        <p className="text-sm text-ink-dim leading-relaxed">
          What started as a student project has grown into a platform built with the ambition of making fitness tracking smarter, more organized, and more engaging for everyone.
        </p>
      </div>
    </div>);
}
