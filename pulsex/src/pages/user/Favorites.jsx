import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Star, Dumbbell } from "lucide-react";
export default function Favorites() {
    const { workouts, favorites, toggleFavorite } = useApp();
    const favoriteWorkouts = workouts.filter((w) => favorites.includes(w.id));
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Star className="h-5 w-5 text-pulse fill-pulse"/>
          Favorite Exercises
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Your curated catalog of prioritized workout routines.
        </p>
      </div>

      {favoriteWorkouts.length === 0 ? (<div className="card p-12 text-center border border-line bg-surface/30">
          <Dumbbell className="h-10 w-10 text-ink-faint mx-auto mb-4"/>
          <h3 className="font-display font-bold text-sm text-ink">No favorites saved yet</h3>
          <p className="text-xs text-ink-dim mt-2 mb-6">Explore the library to curate your primary list.</p>
          <Link to="/dashboard/workouts/library" className="btn-primary inline-flex">
            Browse Workout Library
          </Link>
        </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteWorkouts.map((w) => (<div key={w.id} className="card p-6 border border-line bg-surface/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="pill text-[9px] uppercase font-bold">{w.category}</span>
                  <button onClick={() => toggleFavorite(w.id)} className="p-1 text-pulse hover:text-ink transition">
                    <Star className="h-4.5 w-4.5 fill-pulse"/>
                  </button>
                </div>
                <h3 className="font-display text-sm font-bold text-ink mb-2">{w.name}</h3>
                <p className="text-xs text-ink-dim leading-relaxed line-clamp-2 mb-6">{w.description}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-line">
                <span className="text-[10px] text-ink-faint">{w.duration} mins • {w.difficulty}</span>
                <Link to={`/dashboard/workouts/exercise/${w.id}`} className="text-xs font-semibold text-pulse hover:underline">
                  Configure Workout &rarr;
                </Link>
              </div>
            </div>))}
        </div>)}
    </div>);
}
