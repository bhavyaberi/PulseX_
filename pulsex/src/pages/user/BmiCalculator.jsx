import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Sliders, Award, Info } from "lucide-react";
export default function BmiCalculator() {
    const { profile, setProfile, showToast } = useApp();
    const [weight, setWeight] = useState(profile.weight);
    const [height, setHeight] = useState(profile.height);
    const [waist, setWaist] = useState(82);
    const [neck, setNeck] = useState(38);
    const [hip, setHip] = useState(97); // Hip is only used for females but good for a complete form
    const [bmi, setBmi] = useState(null);
    const [bodyFat, setBodyFat] = useState(null);
    const calculateMetrics = (e) => {
        e.preventDefault();
        // BMI Formula: kg / m^2
        const heightInM = height / 100;
        const finalBmi = Number((weight / (heightInM * heightInM)).toFixed(1));
        // U.S. Navy Body Fat Formula (Male approximation for simplicity):
        // %BF = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
        // Use Math.log10. Check if waist - neck is positive
        const circumDiff = waist - neck;
        let finalBf = 15; // default estimate
        if (circumDiff > 0) {
            finalBf = Number((86.01 * Math.log10(circumDiff) - 70.04 * Math.log10(height) + 36.76).toFixed(1));
        }
        setBmi(finalBmi);
        setBodyFat(finalBf);
        // Update profile
        setProfile(p => ({ ...p, weight, height, bmi: finalBmi, bodyFat: finalBf }));
        showToast("BMI & Body Fat records computed!", "success");
    };
    return (<div className="space-y-8 animate-fade-up max-w-2xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Sliders className="h-5 w-5 text-pulse"/>
          Conditioning Calculator
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Obtain BMI values and body fat percentages using the U.S. Navy Circumference Method.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <form onSubmit={calculateMetrics} className="card p-6 border border-line bg-surface/40 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Weight (kg)</label>
            <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Waist Circumference (cm)</label>
            <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Neck (cm)</label>
              <input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Hips (cm)</label>
              <input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
            </div>
          </div>

          <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
            Compute Composition Index
          </button>
        </form>

        {/* Results */}
        <div className="card p-6 border border-line bg-surface/40 flex flex-col justify-center items-center text-center">
          {bmi !== null && bodyFat !== null ? (<div className="space-y-6">
              <Award className="h-12 w-12 text-pulse animate-pulse mx-auto"/>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-faint">BMI Index</div>
                  <div className="font-display text-3xl font-black text-ink mt-1.5">{bmi}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-faint">Body Fat</div>
                  <div className="font-display text-3xl font-black text-ink mt-1.5">{bodyFat}%</div>
                </div>
              </div>
              <p className="text-xs text-ink-dim leading-relaxed px-2">
                Your body composition falls in the{" "}
                <span className="text-pulse font-semibold">
                  {bodyFat < 14 ? "Athletic" : bodyFat < 20 ? "Fit/Standard" : "Above Standard"}
                </span>{" "}
                classification index. Keep up training targets!
              </p>
            </div>) : (<div className="space-y-2 text-ink-dim text-xs">
              <Info className="h-8 w-8 text-ink-faint mx-auto mb-2"/>
              <span>Input metrics to generate composition reports.</span>
            </div>)}
        </div>
      </div>
    </div>);
}
