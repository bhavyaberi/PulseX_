import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Dumbbell, Trash2 } from "lucide-react";
export default function WorkoutTracking() {
    const { workouts, loggedWorkouts, logWorkout, deleteWorkoutLog } = useApp();
    const [customWorkoutName, setCustomWorkoutName] = useState("");
    const [category, setCategory] = useState("Strength");
    const [duration, setDuration] = useState("");
    const [calories, setCalories] = useState("");
    const handleLog = (e) => {
        e.preventDefault();
        if (!customWorkoutName.trim())
            return;
        const finalDuration = duration ? Number(duration) : 30;
        const finalCalories = calories ? Number(calories) : 200;
        logWorkout("custom", finalDuration, finalCalories, customWorkoutName, category);
        setCustomWorkoutName("");
        setDuration("");
        setCalories("");
    };
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-pulse"/>
            Workout Tracker
          </h1>
          <p className="text-xs text-ink-dim mt-1">
            Log your daily exercise completions to analyze volume metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logger form */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Log a Workout
          </h4>
          <form onSubmit={handleLog} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Workout Name</label>
              <input type="text" placeholder="e.g. Chest Press" value={customWorkoutName} onChange={(e) => setCustomWorkoutName(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none" required/>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none">
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Recovery">Recovery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Duration (minutes)</label>
              <input type="number" placeholder="e.g. 45" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Calories Burned (kcal)</label>
              <input type="number" placeholder="e.g. 350" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
            </div>

            <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
              Log Session
            </button>
          </form>
        </div>

        {/* History logger list */}
        <div className="card p-6 border border-line bg-surface/40 md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Logged Session History
          </h4>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
            {loggedWorkouts.length === 0 ? (<div className="text-center py-10 text-xs text-ink-faint">No sessions logged yet.</div>) : (loggedWorkouts.map((log) => {
            const w = workouts.find((x) => x.id === log.workoutId);
            return (<div key={log.id} className="flex items-center justify-between p-3.5 rounded-xl border border-line bg-ink/[0.01]">
                    <div>
                      <div className="text-xs font-bold text-ink">{log.workoutName || w?.name || "Workout Session"}</div>
                      <div className="text-[10px] text-ink-dim mt-1.5">
                        Logged on: <span className="text-ink">{log.date}</span> • Duration: <span className="text-ink">{log.duration}m</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-pulse/10 border border-pulse/20 px-3 py-1 text-[10px] font-bold text-pulse shadow-glow">
                        {log.calories} kcal
                      </span>
                      <button onClick={() => deleteWorkoutLog(log.id)} className="text-ink-faint hover:text-red-400 p-1 transition" title="Delete workout log">
                        <Trash2 className="h-3.5 w-3.5"/>
                      </button>
                    </div>
                  </div>);
        }))}
          </div>
        </div>
      </div>
    </div>);
}
