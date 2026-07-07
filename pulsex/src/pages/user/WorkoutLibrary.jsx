import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Dumbbell, Search, Star } from "lucide-react";
export default function WorkoutLibrary() {
    const { workouts, favorites, toggleFavorite } = useApp();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const filteredWorkouts = workouts.filter((w) => {
        const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || w.category === category;
        return matchesSearch && matchesCategory;
    });
    return (<div className="space-y-8 animate-fade-up max-w-5xl mx-auto">
      <div className="border-b border-line pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-pulse"/>
            Workout Library
          </h1>
          <p className="text-xs text-ink-dim mt-1">
            Browse our compiled training templates or filter by muscle goals.
          </p>
        </div>

        {/* Categories filter */}
        <div className="flex gap-2 self-start sm:self-auto overflow-x-auto pb-2 sm:pb-0">
          {["All", "Strength", "Cardio", "HIIT", "Flexibility"].map((cat) => (<button key={cat} onClick={() => setCategory(cat)} className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${category === cat
                ? "bg-pulse/10 border-pulse text-pulse"
                : "bg-surface/40 border-line text-ink-dim hover:text-ink"}`}>
              {cat}
            </button>))}
        </div>
      </div>

      {/* Search and filters bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-ink-faint"/>
        <input type="text" placeholder="Search exercises or keywords..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-line bg-surface/40 py-2.5 pl-10 pr-4 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((w) => {
            const isFav = favorites.includes(w.id);
            return (<div key={w.id} className="card p-6 border border-line bg-surface/30 flex flex-col justify-between hover:border-ink/20 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="pill text-[9px] uppercase font-bold">{w.category}</span>
                  <button onClick={() => toggleFavorite(w.id)} className="p-1 text-ink-faint hover:text-pulse transition">
                    <Star className={`h-4.5 w-4.5 ${isFav ? "fill-pulse text-pulse" : ""}`}/>
                  </button>
                </div>
                <h3 className="font-display text-sm font-bold text-ink mb-2">{w.name}</h3>
                <p className="text-xs text-ink-dim leading-relaxed mb-6 line-clamp-2">{w.description}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-line">
                <span className="text-[10px] text-ink-faint">{w.duration} mins • {w.difficulty}</span>
                <Link to={`/dashboard/workouts/exercise/${w.id}`} className="text-xs font-semibold text-pulse hover:underline">
                  View Details &rarr;
                </Link>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
