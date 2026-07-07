import { useState } from "react";
import { Search, Plus, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
export default function NutritionDashboard() {
    const { addMeal } = useApp();
    const [search, setSearch] = useState("");
    const foodDatabase = [
        { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: "Jasmine White Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
        { name: "Fresh Hass Avocado", calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
        { name: "Whole Hen Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
        { name: "Atlantic Salmon Fillet", calories: 206, protein: 22, carbs: 0, fat: 12.4 },
        { name: "Sweet Potato Baked", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
        { name: "Mixed Almond Nuts", calories: 579, protein: 21, carbs: 22, fat: 49.9 },
        { name: "Whey Protein Isolate", calories: 110, protein: 25, carbs: 1, fat: 0.5 }
    ];
    const filteredFoods = foodDatabase.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <Search className="h-5 w-5 text-pulse"/>
          Nutrition & Food Search
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Query ingredient databases to inspect macro ratios and add them to meal logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Search side */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-ink-faint"/>
            <input type="text" placeholder="Search food database (e.g. Chicken, Salmon)..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-line bg-surface/40 py-2.5 pl-10 pr-4 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredFoods.map((food, i) => (<div key={i} className="flex items-center justify-between p-4 rounded-xl border border-line bg-surface/30 hover:border-ink/20 transition duration-300">
                <div>
                  <h4 className="text-xs font-bold text-ink">{food.name}</h4>
                  <p className="text-[10px] text-ink-dim mt-1">
                    Macros per 100g • Protein: {food.protein}g | Carbs: {food.carbs}g | Fat: {food.fat}g
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-pulse">{food.calories} kcal</span>
                  <button onClick={() => {
                addMeal({
                    type: "Snack",
                    name: food.name + " (100g)",
                    calories: food.calories,
                    protein: food.protein,
                    carbs: food.carbs,
                    fat: food.fat
                });
            }} className="h-7 w-7 rounded-lg border border-line flex items-center justify-center text-ink hover:text-pulse hover:bg-pulse/10 transition">
                    <Plus className="h-4 w-4"/>
                  </button>
                </div>
              </div>))}
          </div>
        </div>

        {/* Recommended diets */}
        <div className="space-y-6">
          <div className="card p-6 border border-line bg-surface/40 space-y-4">
            <h4 className="font-display font-bold text-xs text-ink uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pulse animate-pulse"/>
              Recommended Plans
            </h4>
            
            {[
            { title: "Clean Lean Bulking", desc: "40% Protein, 40% Carbs, 20% Fat focus to build skeletal mass while keeping fat low." },
            { title: "Keto Fat Shredding", desc: "70% Fat, 25% Protein, 5% Carbs protocol designed to force metabolic ketosis." }
        ].map((diet, idx) => (<div key={idx} className="border-b border-line pb-3.5 last:border-0 last:pb-0">
                <div className="text-xs font-bold text-ink">{diet.title}</div>
                <p className="text-[10px] text-ink-dim mt-1.5 leading-relaxed">{diet.desc}</p>
              </div>))}
          </div>
        </div>

      </div>
    </div>);
}
