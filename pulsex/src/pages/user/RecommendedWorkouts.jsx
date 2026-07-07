import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Sparkles, ArrowRight } from "lucide-react";
export default function RecommendedWorkouts() {
    const { workouts, profile } = useApp();
    // Simple filter for showcase recommendation matching user level
    const recommended = workouts.filter((w) => w.difficulty === profile.fitnessLevel || w.category === "Strength");
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-pulse animate-pulse"/>
          Recommended Workouts
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Dynamic recommendation feed calibrated based on your current physical assessment.
        </p>
      </div>

      <div className="card border border-pulse/20 bg-pulse/5 p-6 md:p-8 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pulse/15 text-pulse border border-pulse/35">
          <Sparkles className="h-5 w-5"/>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold text-ink">Calibration insights: {profile.fitnessLevel} Athlete</h4>
          <p className="text-xs text-ink-dim leading-relaxed mt-2">
            Based on your height ({profile.height}cm), weight ({profile.weight}kg), and assessment scores, our engine recommends a blend of structural strength templates with tabata conditioning. High intensity is scaled to support your target bodyweight goal of {profile.targetWeight}kg.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommended.map((w) => (<div key={w.id} className="card p-5 border border-line bg-surface/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-ink/20 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="pill text-[9px] uppercase font-bold !py-0.5 !px-2">{w.category}</span>
                <span className="text-[10px] text-ink-faint">{w.difficulty}</span>
              </div>
              <h3 className="font-display text-sm font-bold text-ink mt-2">{w.name}</h3>
              <p className="text-xs text-ink-dim mt-1 max-w-xl">{w.description}</p>
            </div>

            <Link to={`/dashboard/workouts/exercise/${w.id}`} className="btn-secondary !py-2 !px-4 !text-xs flex items-center gap-2 shrink-0 self-end sm:self-auto">
              Start Plan
              <ArrowRight className="h-3 w-3 text-pulse"/>
            </Link>
          </div>))}
      </div>
    </div>);
}
