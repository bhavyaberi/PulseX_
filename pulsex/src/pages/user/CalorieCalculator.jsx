import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Sliders, Utensils } from "lucide-react";
export default function CalorieCalculator() {
    const { profile, setProfile, showToast } = useApp();
    const [weight, setWeight] = useState(profile.weight);
    const [height, setHeight] = useState(profile.height);
    const [age, setAge] = useState(26);
    const [activity, setActivity] = useState("1.55"); // Moderate activity default
    const [result, setResult] = useState(null);
    const calculateTarget = (e) => {
        e.preventDefault();
        // Mifflin-St Jeor Equation for Men / Active
        const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        const tdee = Math.round(bmr * Number(activity));
        setResult(tdee);
        showToast("Calculated total daily energy expenditure!", "success");
    };
    const handleApply = () => {
        if (!result)
            return;
        setProfile(p => ({ ...p, dailyCalorieTarget: result }));
        showToast(`Daily calorie target set to ${result} kcal!`, "success");
    };
    return (<div className="space-y-8 animate-fade-up max-w-2xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Utensils className="h-5 w-5 text-pulse"/>
          Calorie Calculator
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Calculate your Total Daily Energy Expenditure (TDEE) and scale targets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form controls */}
        <form onSubmit={calculateTarget} className="card p-6 border border-line bg-surface/40 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Age (years)</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Weekly Activity Scale</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none">
              <option value="1.2">Sedentary (desk job, 0 training)</option>
              <option value="1.375">Lightly Active (training 1-3 days/wk)</option>
              <option value="1.55">Moderately Active (training 3-5 days/wk)</option>
              <option value="1.725">Very Active (hard training 6-7 days/wk)</option>
            </select>
          </div>

          <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
            Calculate Caloric Load
          </button>
        </form>

        {/* Results view */}
        <div className="card p-6 border border-line bg-surface/40 flex flex-col justify-center items-center text-center">
          {result !== null ? (<div className="space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-faint">Daily calorie expenditure (TDEE)</div>
                <div className="font-display text-4xl font-black text-pulse mt-2">{result} kcal</div>
              </div>
              <p className="text-xs text-ink-dim leading-relaxed px-4">
                To maintain weight, consume {result} kcal. To build muscle, consume a surplus (+300 kcal). To shred fat, consume a deficit (-400 kcal).
              </p>
              <button onClick={handleApply} className="btn-secondary !py-2.5 !px-5 !text-[12px] font-bold mt-4">
                Apply Calorie Limit Target
              </button>
            </div>) : (<div className="space-y-2 text-ink-dim text-xs">
              <Sliders className="h-8 w-8 text-ink-faint mx-auto mb-2"/>
              <span>Input variables to generate target caloric insights.</span>
            </div>)}
        </div>
      </div>
    </div>);
}
