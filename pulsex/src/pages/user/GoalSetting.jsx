import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Target, CheckCircle2 } from "lucide-react";
export default function GoalSetting() {
    const { profile, setProfile, showToast } = useApp();
    const [targetWeight, setTargetWeight] = useState(profile.targetWeight);
    const [calories, setCalories] = useState(profile.dailyCalorieTarget);
    const [water, setWater] = useState(profile.dailyWaterTarget);
    const [sleep, setSleep] = useState(profile.dailySleepTarget);
    const handleSave = (e) => {
        e.preventDefault();
        setProfile(p => ({
            ...p,
            targetWeight,
            dailyCalorieTarget: calories,
            dailyWaterTarget: water,
            dailySleepTarget: sleep
        }));
        showToast("Target metrics recalibrated!", "success");
    };
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Target className="h-5 w-5 text-pulse"/>
          Goal Calibration Center
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Tune your mathematical targets. Calculations will adjust macros and alerts dynamically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form controls */}
        <form onSubmit={handleSave} className="card p-6 border border-line bg-surface/40 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Target Bodyweight (kg)</label>
            <input type="number" step="0.1" value={targetWeight} onChange={(e) => setTargetWeight(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Daily Calorie Target (kcal)</label>
            <input type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Daily Hydration Target (ml)</label>
            <input type="number" value={water} onChange={(e) => setWater(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Daily Sleep Goal (hours)</label>
            <input type="number" value={sleep} onChange={(e) => setSleep(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>

          <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
            Re-calibrated Targets
          </button>
        </form>

        {/* Habits Checklist */}
        <div className="card p-6 border border-line bg-surface/40 space-y-6">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Active Habits Checklist
          </h4>
          <div className="space-y-4">
            {[
            "Complete scheduled daily workouts",
            "Maintain calorie limits +/- 10%",
            "Drink 3.0L+ water",
            "Get 8h deep sleep",
            "Log metrics before 09:00 AM"
        ].map((habit) => (<div key={habit} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-pulse shrink-0"/>
                <span className="text-xs text-ink-dim">{habit}</span>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
