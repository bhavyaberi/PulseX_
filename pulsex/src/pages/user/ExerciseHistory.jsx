import { useApp } from "../../context/AppContext";
import { Dumbbell, Calendar, Clock, Flame, Trash2 } from "lucide-react";
export default function ExerciseHistory() {
    const { loggedWorkouts, workouts, deleteWorkoutLog } = useApp();
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-pulse"/>
          Exercise History
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Historical log database of all structural training templates executed.
        </p>
      </div>

      <div className="card border border-line bg-surface/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-surface-2/40">
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-ink-dim">Routine Name</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-ink-dim">Date Executed</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-ink-dim">Category</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-ink-dim">Duration</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-ink-dim">Calories Burned</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-ink-dim text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-xs">
              {loggedWorkouts.length === 0 ? (<tr>
                  <td colSpan={6} className="p-8 text-center text-ink-faint">
                    No workout records available.
                  </td>
                </tr>) : (loggedWorkouts.map((log) => {
            const w = workouts.find((x) => x.id === log.workoutId);
            return (<tr key={log.id} className="hover:bg-ink/[0.01] transition-colors">
                      <td className="p-4 font-bold text-ink">{log.workoutName || w?.name || "Workout Routine"}</td>
                      <td className="p-4 text-ink-dim">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-pulse"/>
                          {log.date}
                        </span>
                      </td>
                      <td className="p-4 text-ink-dim">
                        <span className="pill text-[9px] uppercase font-bold">{log.category || w?.category || "Strength"}</span>
                      </td>
                      <td className="p-4 text-ink-dim">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3"/>
                          {log.duration} mins
                        </span>
                      </td>
                      <td className="p-4 text-pulse font-bold">
                        <span className="inline-flex items-center gap-1">
                          <Flame className="h-3 w-3 text-pulse animate-pulse"/>
                          {log.calories} kcal
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteWorkoutLog(log.id)} className="text-ink-faint hover:text-red-400 p-1 transition" title="Delete workout log">
                          <Trash2 className="h-3.5 w-3.5"/>
                        </button>
                      </td>
                    </tr>);
        }))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
