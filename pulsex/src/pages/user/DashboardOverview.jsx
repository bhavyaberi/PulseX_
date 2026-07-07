import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { Activity, Dumbbell, Heart, Moon, Plus, Sun } from "lucide-react";
import AnimatedNumber from "../../components/ui/AnimatedNumber";
import PulseTrace from "../../components/ui/PulseTrace";
export default function DashboardOverview() {
    const { profile, waterIntake, addWater, sleepHours, stepsHistory, loggedWorkouts, workouts, logWorkout, heartRate, caloriesBurned } = useApp();
    const todayStr = new Date().toISOString().split("T")[0];
    const todayStepsRecord = stepsHistory.find(s => s.date === todayStr);
    const todaySteps = todayStepsRecord ? todayStepsRecord.steps : 0;
    const recentWorkouts = loggedWorkouts.slice(0, 3);


    const calculateRecoveryIndex = () => {
        const hasNoData = sessionStorage.getItem("pulse_is_new_signup") === "true" && 
                          waterIntake === 0 && 
                          sleepHours === 0 && 
                          heartRate === 0;
        
        if (hasNoData) {
            return { 
                percent: 0, 
                text: "No Logs", 
                description: "Start logging your sleep, hydration, and heart rate to compute your recovery." 
            };
        }
        
        // 1. Sleep score component (50% weight) - dailySleepTarget defaults to 8 hours
        const sleepTarget = profile.dailySleepTarget || 8;
        const sleepScore = sleepHours ? Math.min((sleepHours / sleepTarget) * 100, 100) : 70;
        
        // 2. Hydration score component (30% weight) - dailyWaterTarget defaults to 3000ml
        const waterTarget = profile.dailyWaterTarget || 3000;
        const hydrationScore = waterIntake ? Math.min((waterIntake / waterTarget) * 100, 100) : 60;
        
        // 3. Heart Rate score component (20% weight) - lower resting/normal heart rate is better
        let hrScore = 75;
        if (heartRate > 0) {
            if (heartRate >= 60 && heartRate <= 75) hrScore = 95;
            else if (heartRate > 75 && heartRate <= 90) hrScore = 80;
            else if (heartRate > 90) hrScore = 55;
            else hrScore = 70;
        }
        
        const totalScore = Math.round((sleepScore * 0.5) + (hydrationScore * 0.3) + (hrScore * 0.2));
        
        let statusText = "Good";
        let desc = "Ready for heavy training.";
        if (totalScore >= 85) {
            statusText = "Excellent";
            desc = "Peak performance state. Prime time for progression.";
        } else if (totalScore >= 70) {
            statusText = "Good";
            desc = "Ready for training.";
        } else if (totalScore >= 55) {
            statusText = "Moderate";
            desc = "Rest advised. Consider light active recovery.";
        } else {
            statusText = "Poor";
            desc = "High physiological load. Prioritize sleep and hydration.";
        }
        
        return { percent: totalScore, text: statusText, description: desc };
    };

    const recovery = calculateRecoveryIndex();

    return (<div className="space-y-8 animate-fade-up">
      {/* Welcome header banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-line bg-surface/20 p-6 md:p-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-ink">
            Greetings, <span className="text-pulse">{profile.name}</span>
          </h1>
          <p className="mt-2 text-xs text-ink-dim leading-relaxed">
            Your physiological recovery index is <span className="text-pulse font-semibold">{recovery.text} ({recovery.percent}%)</span>. {recovery.description}
          </p>
        </div>
        <Link to="/dashboard/workouts" className="btn-primary flex items-center gap-2">
          <Dumbbell className="h-4 w-4"/>
          Log Today's Workout
        </Link>
      </div>



      {/* Grid of vitals card widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Heart Rate Vitals card */}
        <div className="card p-6 border border-line bg-surface/60">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Live Vitals</span>
            <Heart className="h-4 w-4 text-pulse animate-pulse"/>
          </div>
          <div className="text-xs text-ink-dim">Heart rate</div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-ink">
              <AnimatedNumber value={heartRate} duration={1.5}/>
            </span>
            <span className="text-xs text-ink-dim">bpm</span>
          </div>
          <PulseTrace className="mt-4 h-12 w-full text-pulse/40" strokeWidth={2} speed={2}/>
        </div>

        {/* Calories Burned card */}
        <div className="card p-6 border border-line bg-surface/60">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Active Load</span>
            <Activity className="h-4 w-4 text-pulse"/>
          </div>
          <div className="text-xs text-ink-dim">Calories burned</div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-ink">
              <AnimatedNumber value={caloriesBurned} duration={1.5}/>
            </span>
            <span className="text-xs text-ink-dim">kcal</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-ink/10 rounded-full overflow-hidden">
            {(() => {
              const target = profile.dailyCalorieTarget || 2000;
              const percent = Math.min(Math.round((caloriesBurned / target) * 100), 100);
              return (
                <div className="h-full bg-pulse rounded-full" style={{ width: `${percent}%` }}/>
              );
            })()}
          </div>
          <div className="mt-2 text-[10px] text-ink-faint">
            {(() => {
              const target = profile.dailyCalorieTarget || 2000;
              return Math.round((caloriesBurned / target) * 100);
            })()}% of daily active goal
          </div>
        </div>

        {/* Sleep quality card */}
        <div className="card p-6 border border-line bg-surface/60">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Recovery</span>
            <Moon className="h-4 w-4 text-pulse"/>
          </div>
          <div className="text-xs text-ink-dim">Sleep quality</div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-ink">
              {sleepHours}
            </span>
            <span className="text-xs text-ink-dim">hours</span>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            <span className="text-[10px] text-ink-dim">
              Efficiency: {sleepHours > 0 ? `${Math.min(Math.round((sleepHours / (profile.dailySleepTarget || 8)) * 100), 100)}%` : "--"}
            </span>
          </div>
        </div>

        {/* Water / Hydration card */}
        <div className="card p-6 border border-line bg-surface/60">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Hydration</span>
            <Sun className="h-4 w-4 text-pulse"/>
          </div>
          <div className="text-xs text-ink-dim">Water intake</div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-ink">
              <AnimatedNumber value={waterIntake / 1000} decimals={1} duration={1}/>
            </span>
            <span className="text-xs text-ink-dim">/ {(profile.dailyWaterTarget || 3000) / 1000} L</span>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => addWater(250)} className="flex items-center gap-1 rounded-lg border border-line bg-ink/[0.03] px-2 py-1 text-[10px] text-ink hover:bg-ink/5 transition">
              <Plus className="h-3 w-3 text-pulse"/> 250ml
            </button>
            <button onClick={() => addWater(500)} className="flex items-center gap-1 rounded-lg border border-line bg-ink/[0.03] px-2 py-1 text-[10px] text-ink hover:bg-ink/5 transition">
              <Plus className="h-3 w-3 text-pulse"/> 500ml
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Recent logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 border border-line bg-surface/40">
            <h3 className="font-display text-base font-bold text-ink mb-4 flex items-center justify-between">
              <span>Today's Steps & Goal</span>
              <span className="text-xs font-semibold text-pulse">{todaySteps} / 10000 steps</span>
            </h3>
            <div className="h-3 w-full bg-ink/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pulse to-pulse-soft rounded-full" style={{ width: `${Math.min((todaySteps / 10000) * 100, 100)}%` }}/>
            </div>
            <p className="mt-3 text-[11px] text-ink-dim leading-relaxed">
              Step cadence is stable. Excellent aerobic micro-loading. Keeps systemic insulin sensitivity high.
            </p>
          </div>

          <div className="card p-6 border border-line bg-surface/40">
            <h3 className="font-display text-base font-bold text-ink mb-4">Recent Workout Logs</h3>
            <div className="space-y-3.5">
              {recentWorkouts.map((log) => {
            const wObj = workouts.find((w) => w.id === log.workoutId);
            return (<div key={log.id} className="flex items-center justify-between border-b border-line pb-3.5 last:border-0 last:pb-0">
                    <div>
                      <div className="text-xs font-bold text-ink">{wObj?.name || "Workout Routine"}</div>
                      <div className="text-[10px] text-ink-faint mt-1">{log.date} • {log.duration} mins</div>
                    </div>
                    <span className="rounded-lg border border-line px-2.5 py-1 text-[10px] font-bold text-pulse">
                      -{log.calories} kcal
                    </span>
                  </div>);
        })}
            </div>
          </div>
        </div>

        {/* Right column: Quick shortcuts */}
        <div className="space-y-6">

          {/* Quick workout template list */}
          <div className="card p-6 border border-line bg-surface/40">
            <h3 className="font-display text-base font-bold text-ink mb-4">Quick Log Workout</h3>
            <div className="space-y-2">
              {workouts.slice(0, 3).map((w) => (<button key={w.id} onClick={() => logWorkout(w.id, w.duration, w.calories)} className="w-full flex items-center justify-between rounded-xl border border-line bg-surface/60 p-3 text-left hover:border-pulse/40 hover:bg-surface transition duration-300">
                  <div>
                    <div className="text-xs font-bold text-ink">{w.name}</div>
                    <div className="text-[10px] text-ink-faint mt-1">{w.category} • {w.duration}m</div>
                  </div>
                  <span className="h-6 w-6 rounded-full border border-line flex items-center justify-center text-pulse text-xs hover:bg-pulse/10 transition">
                    +
                  </span>
                </button>))}
            </div>
          </div>
        </div>

      </div>

    </div>);
}
