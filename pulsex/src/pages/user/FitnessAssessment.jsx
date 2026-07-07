import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Sliders, Activity } from "lucide-react";
export default function FitnessAssessment() {
    const { showToast } = useApp();
    const [restingHr, setRestingHr] = useState(65);
    const [pushups, setPushups] = useState(30);
    const [squats, setSquats] = useState(40);
    const [sleepScore, setSleepScore] = useState(80);
    const [score, setScore] = useState(null);
    const calculateAssessment = (e) => {
        e.preventDefault();
        // mock assessment score calculation formula
        const hrFactor = Math.max(0, 100 - restingHr) * 0.4;
        const strengthFactor = Math.min(pushups + squats, 100) * 0.4;
        const recoveryFactor = sleepScore * 0.2;
        const finalScore = Math.round(hrFactor + strengthFactor + recoveryFactor);
        setScore(finalScore);
        showToast("Fitness Assessment compiled successfully!", "success");
    };
    return (<div className="space-y-8 animate-fade-up max-w-2xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Sliders className="h-5 w-5 text-pulse"/>
          Biometric Assessment
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Compute your conditioning capacity by submitting raw functional stats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form panel */}
        <form onSubmit={calculateAssessment} className="card p-6 border border-line bg-surface/40 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Resting Heart Rate (bpm)</label>
            <input type="number" value={restingHr} onChange={(e) => setRestingHr(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Max Pushups (60s)</label>
            <input type="number" value={pushups} onChange={(e) => setPushups(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Max Bodyweight Squats (60s)</label>
            <input type="number" value={squats} onChange={(e) => setSquats(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Subjective Recovery Sleep Index (0-100)</label>
            <input type="number" value={sleepScore} onChange={(e) => setSleepScore(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>

          <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
            Calculate Assessment Index
          </button>
        </form>

        {/* Results panel */}
        <div className="card p-6 border border-line bg-surface/40 flex flex-col justify-center items-center text-center">
          {score !== null ? (<div className="space-y-6">
              <Activity className="h-12 w-12 text-pulse animate-pulse mx-auto"/>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-faint">Your fitness index score</div>
                <div className="font-display text-5xl font-black text-ink mt-2">{score} / 100</div>
              </div>
              <p className="text-xs text-ink-dim leading-relaxed px-4">
                {score > 75
                ? "Outstanding VO2 max and conditioning level. Proceed with high volume progressive resistance plan."
                : score > 50
                    ? "Standard health indices. We recommend a 4-day structural hypertrophy plan with steady-state cardio."
                    : "Needs conditioning work. Focus on deep recovery sleep, 3.0L water, and low volume strength basics."}
              </p>
            </div>) : (<div className="space-y-3">
              <Activity className="h-10 w-10 text-ink-faint mx-auto"/>
              <div className="text-xs text-ink-dim">Submit variables to generate telemetry insights.</div>
            </div>)}
        </div>
      </div>
    </div>);
}
