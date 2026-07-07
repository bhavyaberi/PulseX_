import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Clock, Flame, Play, Dumbbell } from "lucide-react";
export default function ExerciseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { workouts, logWorkout } = useApp();
    const w = workouts.find((x) => x.id === id);
    if (!w) {
        return (<div className="text-center py-20 text-ink-dim">
        Workout routine not found.
        <button onClick={() => navigate("/dashboard/workouts/library")} className="btn-secondary mt-4 block mx-auto">
          Back to Library
        </button>
      </div>);
    }
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-ink-dim hover:text-ink transition">
        <ArrowLeft className="h-4 w-4"/> Back to List
      </button>

      {/* Routine Main info banner */}
      <div className="card overflow-hidden border border-line bg-surface/30 p-8 md:p-10 relative">
        <div className="absolute right-0 top-0 w-64 h-full bg-navy-glow blur-[80px] pointer-events-none"/>
        
        <div>
          <span className="pill text-[9px] uppercase font-bold">{w.category}</span>
          <h1 className="font-display text-2xl md:text-3xl font-black text-ink mt-4">{w.name}</h1>
          <p className="mt-4 text-sm text-ink-dim leading-relaxed max-w-2xl">{w.description}</p>
          
          <div className="flex gap-6 mt-6 pt-6 border-t border-line">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-pulse"/>
              <span className="text-xs text-ink">{w.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-pulse"/>
              <span className="text-xs text-ink">{w.calories} kcal burned</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-pulse"/>
              <span className="text-xs text-ink">{w.difficulty} difficulty</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Exercises list */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4">
          <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Routine Structure
          </h3>
          <div className="space-y-3">
            {w.exercises.map((ex, idx) => (<div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-line bg-ink/[0.01]">
                <div>
                  <div className="text-xs font-bold text-ink">{ex.name}</div>
                  <div className="text-[10px] text-ink-dim mt-1">{ex.sets} sets • {ex.reps} reps</div>
                </div>
              </div>))}
          </div>
          <button onClick={() => {
            logWorkout(w.id, w.duration, w.calories);
            navigate("/dashboard");
        }} className="w-full btn-primary justify-center text-xs font-bold mt-2">
            Mark Session Completed
          </button>
        </div>

        {/* Video Tutorial Card */}
        <div className="card overflow-hidden border border-line bg-surface/40 flex flex-col justify-between">
          <div className="relative aspect-video bg-black/40 flex items-center justify-center border-b border-line group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop')" }}/>
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-pulse text-void group-hover:scale-105 transition shadow-glow">
              <Play className="h-6 w-6 fill-void ml-1"/>
            </div>
          </div>
          <div className="p-6">
            <h4 className="font-display text-sm font-bold text-ink">Video Form Calibration Guide</h4>
            <p className="text-[11px] text-ink-dim mt-2 leading-relaxed">
              Coach walkthrough covering core stability angles, joint alignments, and tempo metrics to protect shoulder health and maximize force generation.
            </p>
          </div>
        </div>

      </div>

    </div>);
}
