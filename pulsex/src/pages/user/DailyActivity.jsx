import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Activity, Footprints, Moon, Droplets, Heart } from "lucide-react";
export default function DailyActivity() {
    const { waterIntake, addWater, resetWater, sleepHours, logSleep, stepsHistory, logSteps, heartRate, logHeartRate, caloriesBurned, logCaloriesBurned } = useApp();
    const [inputSteps, setInputSteps] = useState("");
    const [inputSleep, setInputSleep] = useState("");
    const [inputHeartRate, setInputHeartRate] = useState("");
    const [inputCalories, setInputCalories] = useState("");
    const handleLogSteps = (e) => {
        e.preventDefault();
        if (!inputSteps || isNaN(Number(inputSteps)))
            return;
        logSteps(Number(inputSteps));
        setInputSteps("");
    };
    const handleLogSleep = (e) => {
        e.preventDefault();
        if (!inputSleep || isNaN(Number(inputSleep)))
            return;
        logSleep(Number(inputSleep));
        setInputSleep("");
    };
    const handleLogHeartRate = (e) => {
        e.preventDefault();
        if (!inputHeartRate || isNaN(Number(inputHeartRate)))
            return;
        logHeartRate(Number(inputHeartRate));
        setInputHeartRate("");
    };
    const handleLogCalories = (e) => {
        e.preventDefault();
        if (!inputCalories || isNaN(Number(inputCalories)))
            return;
        logCaloriesBurned(Number(inputCalories));
        setInputCalories("");
    };
    const currentSteps = stepsHistory[stepsHistory.length - 1]?.steps || 0;
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Activity className="h-5 w-5 text-pulse"/>
          Daily Activity Logging
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Record your steps, sleep duration, water cups, heart rate, and active calories manually below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Step log card */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-2">
              <Footprints className="h-4 w-4 text-pulse"/>
              Steps Counter
            </h4>
            <span className="text-[10px] font-bold text-pulse">{currentSteps} logged</span>
          </div>
          <form onSubmit={handleLogSteps} className="space-y-3">
            <input type="number" placeholder="e.g. 10000" value={inputSteps} onChange={(e) => setInputSteps(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none"/>
            <button type="submit" className="w-full btn-secondary !py-2 !text-xs font-semibold">
              Log Steps
            </button>
          </form>
        </div>

        {/* Sleep log card */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-2">
              <Moon className="h-4 w-4 text-pulse"/>
              Sleep Tracker
            </h4>
            <span className="text-[10px] font-bold text-pulse">{sleepHours} hours</span>
          </div>
          <form onSubmit={handleLogSleep} className="space-y-3">
            <input type="number" step="0.1" placeholder="e.g. 8" value={inputSleep} onChange={(e) => setInputSleep(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none"/>
            <button type="submit" className="w-full btn-secondary !py-2 !text-xs font-semibold">
              Log Sleep Duration
            </button>
          </form>
        </div>

        {/* Heart Rate log card */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-2">
              <Heart className="h-4 w-4 text-pulse animate-pulse"/>
              Heart Rate Vitals
            </h4>
            <span className="text-[10px] font-bold text-pulse">{heartRate} bpm</span>
          </div>
          <form onSubmit={handleLogHeartRate} className="space-y-3">
            <input type="number" placeholder="e.g. 72" value={inputHeartRate} onChange={(e) => setInputHeartRate(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none"/>
            <button type="submit" className="w-full btn-secondary !py-2 !text-xs font-semibold">
              Log Heart Rate
            </button>
          </form>
        </div>

        {/* Active Calories log card */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-2">
              <Activity className="h-4 w-4 text-pulse"/>
              Calories Burned
            </h4>
            <span className="text-[10px] font-bold text-pulse">{caloriesBurned} kcal</span>
          </div>
          <form onSubmit={handleLogCalories} className="space-y-3">
            <input type="number" placeholder="e.g. 350" value={inputCalories} onChange={(e) => setInputCalories(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none"/>
            <button type="submit" className="w-full btn-secondary !py-2 !text-xs font-semibold">
              Log Calories
            </button>
          </form>
        </div>

        {/* Hydration card */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-display text-sm font-bold text-ink flex items-center gap-2">
              <Droplets className="h-4 w-4 text-pulse"/>
              Water Hydrator
            </h4>
            <span className="text-[10px] font-bold text-pulse">{waterIntake}ml</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => addWater(250)} className="btn-secondary !py-2 !text-xs font-bold">
              + 250ml
            </button>
            <button onClick={() => addWater(500)} className="btn-secondary !py-2 !text-xs font-bold">
              + 500ml
            </button>
          </div>
          <button onClick={resetWater} className="w-full text-center text-[10px] font-bold text-red-400 hover:text-red-300 transition">
            Reset Intake
          </button>
        </div>

      </div>
    </div>);
}
