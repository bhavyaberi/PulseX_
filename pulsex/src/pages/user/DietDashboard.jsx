import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { Utensils, Plus, Trash2 } from "lucide-react";
import AnimatedNumber from "../../components/ui/AnimatedNumber";
export default function DietDashboard() {
    const { meals, removeMeal, profile, waterIntake } = useApp();
    const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
    const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
    const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);
    // Targets
    const calorieTarget = profile.dailyCalorieTarget || 2000;
    const proteinTarget = 150; // default target protein grams
    const carbsTarget = 220;
    const fatTarget = 70;
    const waterTarget = profile.dailyWaterTarget || 3000;

    const calculateDietCompliance = () => {
        if (meals.length === 0) {
            return { percent: 0, text: "No Meals Logged" };
        }
        const pDiff = Math.abs(totalProtein - proteinTarget) / proteinTarget;
        const cDiff = Math.abs(totalCarbs - carbsTarget) / carbsTarget;
        const fDiff = Math.abs(totalFat - fatTarget) / fatTarget;
        const calDiff = Math.abs(totalCalories - calorieTarget) / calorieTarget;
        const avgDeviation = (pDiff + cDiff + fDiff + calDiff) / 4;
        const compliancePercent = Math.max(0, Math.min(Math.round((1 - avgDeviation) * 100), 100));
        
        let complianceText = "Highly calibrated macro fit";
        if (compliancePercent >= 90) {
            complianceText = "Highly calibrated macro fit";
        } else if (compliancePercent >= 75) {
            complianceText = "Good macro adherence";
        } else if (compliancePercent >= 50) {
            complianceText = "Moderate macro deviations";
        } else {
            complianceText = "Macro calibration needed";
        }
        return { percent: compliancePercent, text: complianceText };
    };
    const compliance = calculateDietCompliance();
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      <div className="border-b border-line pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <Utensils className="h-5 w-5 text-pulse"/>
            Diet Dashboard
          </h1>
          <p className="text-xs text-ink-dim mt-1">
            Track daily macronutrient quantities and maintain caloric compliance levels.
          </p>
        </div>
        <Link to="/dashboard/diet/meal-planner" className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4"/>
          Plan New Meal
        </Link>
      </div>

      {/* Calories Overview card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Calories progress */}
        <div className="card p-6 border border-line bg-surface/60 md:col-span-2 space-y-4">
          <div className="text-xs uppercase font-bold tracking-wider text-ink-faint">Caloric balance</div>
          <div className="flex justify-between items-baseline">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-3xl font-bold text-ink">
                <AnimatedNumber value={totalCalories} duration={1.2}/>
              </span>
              <span className="text-xs text-ink-dim">/ {calorieTarget} kcal eaten</span>
            </div>
            <span className="text-xs font-semibold text-pulse">
              {Math.max(0, calorieTarget - totalCalories)} kcal left
            </span>
          </div>

          <div className="h-2 w-full bg-ink/10 rounded-full overflow-hidden">
            <div className="h-full bg-pulse rounded-full" style={{ width: `${Math.min((totalCalories / calorieTarget) * 100, 100)}%` }}/>
          </div>
        </div>

        {/* Hydration quick view */}
        <div className="card p-6 border border-line bg-surface/60 space-y-2">
          <div className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Hydration</div>
          <div className="font-display text-2xl font-bold text-ink">{waterIntake / 1000}L</div>
          <div className="text-[10px] text-ink-dim">Target: {waterTarget / 1000}L</div>
          <div className="h-1.5 w-full bg-ink/10 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-pulse rounded-full" style={{ width: `${Math.min((waterIntake / waterTarget) * 100, 100)}%` }}/>
          </div>
        </div>

        {/* Compliance indicator */}
        <div className="card p-6 border border-line bg-surface/60 space-y-2 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Diet Compliance</span>
          <span className="font-display text-2xl font-black text-pulse mt-1">{compliance.percent}%</span>
          <span className="text-[9px] text-ink-faint">{compliance.text}</span>
        </div>

      </div>

      {/* Macronutrient Ratios progress indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: "Protein", current: totalProtein, target: proteinTarget, color: "bg-pulse", unit: "g" },
            { label: "Carbohydrates", current: totalCarbs, target: carbsTarget, color: "bg-pulse-soft", unit: "g" },
            { label: "Dietary Fat", current: totalFat, target: fatTarget, color: "bg-ink", unit: "g" }
        ].map((item) => (<div key={item.label} className="card p-5 border border-line bg-surface/40 space-y-2">
            <div className="flex justify-between text-xs font-bold text-ink">
              <span>{item.label}</span>
              <span className="text-ink-dim">{item.current}g / {item.target}g</span>
            </div>
            <div className="h-1.5 w-full bg-ink/10 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}/>
            </div>
          </div>))}
      </div>

      {/* Meal logs list */}
      <div className="card p-6 border border-line bg-surface/40 space-y-4">
        <h3 className="font-display font-bold text-sm text-ink border-b border-line pb-2.5">Today's Meal Records</h3>
        <div className="space-y-3">
          {meals.length === 0 ? (<div className="text-center py-8 text-xs text-ink-faint">No meals logged yet.</div>) : (meals.map((meal) => (<div key={meal.id} className="flex items-center justify-between p-3.5 rounded-xl border border-line bg-ink/[0.01]">
                <div>
                  <div className="text-xs font-bold text-ink">{meal.name}</div>
                  <div className="text-[10px] text-ink-faint mt-1">
                    {meal.type} • P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border border-line px-2.5 py-1 text-[10px] font-bold text-pulse">
                    {meal.calories} kcal
                  </span>
                  <button onClick={() => removeMeal(meal.id)} className="text-ink-faint hover:text-red-400 p-1 transition">
                    <Trash2 className="h-3.5 w-3.5"/>
                  </button>
                </div>
              </div>)))}
        </div>
      </div>
    </div>);
}
