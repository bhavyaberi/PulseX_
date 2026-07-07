import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { LineChart } from "lucide-react";

export default function ProgressAnalytics() {
    const { profile, waterIntake, sleepHours, stepsHistory, caloriesBurned } = useApp();
    const todaySteps = stepsHistory.length > 0 ? stepsHistory[stepsHistory.length - 1].steps : 0;
    
    const [historyLogs, setHistoryLogs] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            fetch("http://localhost:5000/api/metrics/history", {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setHistoryLogs(res.data);
                }
            })
            .catch(err => console.error("Error loading metrics history:", err));
        }
    }, [waterIntake, sleepHours, stepsHistory, caloriesBurned]);

    // Generate last 7 days dates YYYY-MM-DD
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split("T")[0];
    });

    const last7DaysData = last7Days.map(date => {
        const match = historyLogs.find(l => l.date === date);
        const dayLabel = new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });
        const isToday = date === new Date().toISOString().split("T")[0];
        return {
            date,
            dayLabel,
            steps: isToday ? todaySteps : (match?.steps || 0),
            calories: isToday ? caloriesBurned : (match?.caloriesBurned || 0),
            water: isToday ? waterIntake : (match?.waterIntake || 0),
            sleep: isToday ? sleepHours : (match?.sleepHours || 0)
        };
    });

    const slides = [
        {
            title: "🏃 Steps Tracker Trend (Last 7 Days)",
            metric: "steps",
            target: 10000,
            unit: "steps",
            color: "bg-pulse",
            hoverColor: "text-pulse",
            desc: "Daily step count totals compared to the 10,000 baseline."
        },
        {
            title: "🔥 Active Calories Burn (Last 7 Days)",
            metric: "calories",
            target: profile.dailyCalorieTarget || 2000,
            unit: "kcal",
            color: "bg-orange-500",
            hoverColor: "text-orange-400",
            desc: "Active energy spending from workout logs and activity."
        },
        {
            title: "💧 Systemic Hydration Intake (Last 7 Days)",
            metric: "water",
            target: profile.dailyWaterTarget || 3000,
            unit: "ml",
            color: "bg-blue-500",
            hoverColor: "text-blue-400",
            desc: "Total fluids logged compared to your target log limit."
        },
        {
            title: "🌙 Sleep Rest Duration (Last 7 Days)",
            metric: "sleep",
            target: profile.dailySleepTarget || 8,
            unit: "hrs",
            color: "bg-indigo-500",
            hoverColor: "text-indigo-400",
            desc: "Recorded recovery sleep hours per night."
        }
    ];

    return (
        <div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
            <div className="border-b border-line pb-4">
                <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-pulse" />
                    Progress Analytics
                </h1>
                <p className="text-xs text-ink-dim mt-1">
                    Analyze your activity, energy, hydration, and sleep logs over the last 7 days.
                </p>
            </div>

            {/* 7-Day Progress Carousel */}
            <div className="card p-6 md:p-8 border border-line bg-surface/30 relative overflow-hidden space-y-6">
                <div className="flex justify-between items-center border-b border-line pb-4">
                    <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-ink-faint">Activity charts</span>
                        <h3 className="font-display text-base font-bold text-ink mt-0.5">{slides[slideIndex].title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button 
                            type="button"
                            onClick={() => setSlideIndex(prev => (prev - 1 + slides.length) % slides.length)} 
                            className="h-8 w-8 rounded-xl border border-line bg-surface flex items-center justify-center text-ink-dim hover:text-ink transition hover:border-pulse"
                        >
                            &larr;
                        </button>
                        <button 
                            type="button"
                            onClick={() => setSlideIndex(prev => (prev + 1) % slides.length)} 
                            className="h-8 w-8 rounded-xl border border-line bg-surface flex items-center justify-center text-ink-dim hover:text-ink transition hover:border-pulse"
                        >
                            &rarr;
                        </button>
                    </div>
                </div>

                <div className="flex items-end justify-between h-48 pt-6 px-2 md:px-6">
                    {last7DaysData.map(d => {
                        const currentVal = d[slides[slideIndex].metric];
                        const targetVal = slides[slideIndex].target;
                        const percent = Math.min((currentVal / targetVal) * 100, 100);
                        return (
                            <div key={d.date} className="flex flex-col items-center gap-2.5 group flex-1">
                                <div className={`text-[10px] font-bold ${slides[slideIndex].hoverColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    {currentVal} {slides[slideIndex].unit === "hrs" ? "h" : slides[slideIndex].unit === "kcal" ? "k" : ""}
                                </div>
                                <div className="w-10 md:w-12 bg-ink/5 rounded-t-lg overflow-hidden h-36 flex items-end">
                                    <div className={`w-full ${slides[slideIndex].color} rounded-t-lg transition-all duration-500`} style={{ height: `${percent || 5}%` }}/>
                                </div>
                                <div className="text-[10px] text-ink-dim font-bold">{d.dayLabel}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-ink/[0.03]">
                    <p className="text-xs text-ink-dim italic">
                        {slides[slideIndex].desc}
                    </p>
                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <button 
                                type="button"
                                key={i} 
                                onClick={() => setSlideIndex(i)} 
                                className={`h-2 rounded-full transition-all ${slideIndex === i ? "w-6 bg-pulse" : "w-2 bg-ink/20"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
