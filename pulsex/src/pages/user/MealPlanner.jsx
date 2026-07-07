import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Utensils, Plus } from "lucide-react";
export default function MealPlanner() {
    const { addMeal, showToast } = useApp();
    const navigate = useNavigate();
    const [type, setType] = useState("Breakfast");
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fat, setFat] = useState("");
    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !calories) {
            showToast("Meal name and calories are required", "error");
            return;
        }
        addMeal({
            type,
            name,
            calories: Number(calories),
            protein: protein ? Number(protein) : 0,
            carbs: carbs ? Number(carbs) : 0,
            fat: fat ? Number(fat) : 0
        });
        setName("");
        setCalories("");
        setProtein("");
        setCarbs("");
        setFat("");
        navigate("/dashboard/diet");
    };
    const quickFoods = [
        { name: "3 Large Eggs & Spinach", calories: 230, protein: 18, carbs: 2, fat: 15, type: "Breakfast" },
        { name: "Whey Protein Shake (1 scoop)", calories: 130, protein: 25, carbs: 3, fat: 1.5, type: "Snack" },
        { name: "Sirloin Steak & Jasmine Rice", calories: 720, protein: 48, carbs: 55, fat: 22, type: "Dinner" },
        { name: "Greek Yogurt & Blueberries", calories: 190, protein: 15, carbs: 18, fat: 3, type: "Breakfast" }
    ];
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <Utensils className="h-5 w-5 text-pulse"/>
            Meal Planner
          </h1>
          <p className="text-xs text-ink-dim mt-1">
            Build a custom macro plan or select from common quick-add items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Planner Builder form */}
        <div className="card p-6 border border-line bg-surface/40 lg:col-span-2 space-y-4">
          <h3 className="font-display font-bold text-xs text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Log Custom Meal
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Meal Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none">
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Meal Name</label>
                <input type="text" placeholder="e.g. Salmon & Sweet Potato" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Calories (kcal)</label>
                <input type="number" placeholder="500" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Protein (g)</label>
                <input type="number" placeholder="30" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Carbs (g)</label>
                <input type="number" placeholder="40" value={carbs} onChange={(e) => setCarbs(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Fat (g)</label>
                <input type="number" placeholder="10" value={fat} onChange={(e) => setFat(e.target.value)} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-2.5 text-xs text-ink focus:border-pulse focus:outline-none"/>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
              Log Meal Items
            </button>
          </form>
        </div>

        {/* Quick foods list */}
        <div className="card p-6 border border-line bg-surface/40 space-y-4 h-fit">
          <h3 className="font-display font-bold text-xs text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Quick Add Foods
          </h3>
          <div className="space-y-3.5">
            {quickFoods.map((f, i) => (<button key={i} onClick={() => {
                addMeal({
                    type: f.type,
                    name: f.name,
                    calories: f.calories,
                    protein: f.protein,
                    carbs: f.carbs,
                    fat: f.fat
                });
            }} className="w-full flex items-center justify-between rounded-xl border border-line bg-surface/60 p-3 text-left hover:border-pulse/40 hover:bg-surface transition duration-300">
                <div>
                  <div className="text-xs font-bold text-ink">{f.name}</div>
                  <div className="text-[10px] text-ink-faint mt-1">
                    P: {f.protein}g | C: {f.carbs}g | {f.calories} kcal
                  </div>
                </div>
                <span className="h-6 w-6 rounded-full border border-line flex items-center justify-center text-pulse text-xs hover:bg-pulse/10 transition">
                  <Plus className="h-3.5 w-3.5"/>
                </span>
              </button>))}
          </div>
        </div>

      </div>
    </div>);
}
