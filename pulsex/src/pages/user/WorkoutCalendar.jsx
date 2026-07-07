import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
export default function WorkoutCalendar() {
    const { workouts, workoutCalendar, scheduleWorkout } = useApp();
    const [selectedWorkout, setSelectedWorkout] = useState(workouts[0]?.id || "");
    const [scheduleDate, setScheduleDate] = useState("2026-07-04");
    const handleSchedule = (e) => {
        e.preventDefault();
        if (!selectedWorkout || !scheduleDate)
            return;
        scheduleWorkout(scheduleDate, selectedWorkout);
    };
    // Build a static calendar grid for July 2026 for showcase
    const daysInJuly = 31;
    const calendarCells = [];
    for (let d = 1; d <= daysInJuly; d++) {
        const dayStr = d < 10 ? `0${d}` : `${d}`;
        const fullDate = `2026-07-${dayStr}`;
        const dailyWorkouts = workoutCalendar.filter((c) => c.date === fullDate);
        calendarCells.push({
            day: d,
            dateStr: fullDate,
            workouts: dailyWorkouts
        });
    }
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-pulse"/>
            Workout Calendar
          </h1>
          <p className="text-xs text-ink-dim mt-1">
            Map out your conditioning schedule and view upcoming training sessions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Grid */}
        <div className="card p-6 border border-line bg-surface/40 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="font-display font-bold text-sm text-ink">July 2026</h3>
            <div className="flex gap-2">
              <button className="h-7 w-7 rounded-lg border border-line flex items-center justify-center text-ink-dim hover:text-ink hover:bg-ink/5 transition">
                <ChevronLeft className="h-4 w-4"/>
              </button>
              <button className="h-7 w-7 rounded-lg border border-line flex items-center justify-center text-ink-dim hover:text-ink hover:bg-ink/5 transition">
                <ChevronRight className="h-4 w-4"/>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-ink-faint mb-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {/* Blank offset cells for start of July 2026 (July 1st was Wednesday -> 3 offset cells) */}
            {[...Array(3)].map((_, i) => (<div key={`offset-${i}`} className="aspect-square bg-transparent rounded-xl border border-transparent"/>))}
            
            {calendarCells.map((cell) => (<div key={cell.dateStr} className="aspect-square rounded-xl border border-line bg-surface/20 p-1 flex flex-col justify-between hover:border-pulse/30 transition cursor-pointer relative group">
                <span className="text-[10px] text-ink-dim font-bold self-start">{cell.day}</span>
                {cell.workouts.map((cw, i) => {
                const w = workouts.find((x) => x.id === cw.workoutId);
                return (<div key={i} className="text-[8px] bg-pulse text-void font-bold truncate rounded-md px-1 py-0.5 mt-0.5 border border-pulse-soft" title={w?.name}>
                      {w?.name}
                    </div>);
            })}
              </div>))}
          </div>
        </div>

        {/* Schedule form */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4 h-fit">
          <h3 className="font-display font-bold text-xs text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Schedule Session
          </h3>
          <form onSubmit={handleSchedule} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Select Routine</label>
              <select value={selectedWorkout} onChange={(e) => setSelectedWorkout(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none">
                {workouts.map((w) => (<option key={w.id} value={w.id}>
                    {w.name}
                  </option>))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Date</label>
              <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
            </div>

            <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
              Add to Calendar
            </button>
          </form>
        </div>

      </div>
    </div>);
}
