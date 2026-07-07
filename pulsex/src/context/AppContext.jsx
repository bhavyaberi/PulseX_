import React, { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(undefined);
export function AppProvider({ children }) {
    const [toast, setToast] = useState(null);
    const showToast = (message, type) => {
        setToast({ message, type });
    };
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);
    
    const getInitialState = (key, defaultVal) => {
        const email = sessionStorage.getItem("pulse_user_email");
        if (email) {
            const savedDataStr = localStorage.getItem("pulse_userdata_" + email.toLowerCase());
            if (savedDataStr) {
                try {
                    const data = JSON.parse(savedDataStr);
                    
                    // Daily logs reset rollover check (24hrs limit)
                    const todayStr = new Date().toISOString().split("T")[0];
                    const isNewDay = data.last_saved_date && data.last_saved_date !== todayStr;
                    
                    if (isNewDay) {
                        const dailyKeys = ["waterIntake", "sleepHours", "caloriesBurned", "meals"];
                        if (dailyKeys.includes(key)) {
                            return key === "meals" ? [] : 0;
                        }
                        if (key === "supplements" && data[key]) {
                            return data[key].map(s => ({ ...s, taken: false }));
                        }
                    }

                    if (data[key] !== undefined) {
                        return data[key];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return defaultVal;
    };

    const fetchUserDatabaseData = async () => {
        const token = sessionStorage.getItem("pulse_token");
        if (!token) return;
        
        try {
            // 1. Profile biometrics
            const profileRes = await fetch("http://localhost:5000/api/user/profile", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (profileRes.ok) {
                const profileResult = await profileRes.json();
                if (profileResult.data) {
                    setProfile(profileResult.data);
                }
            }
            
            // 2. Workout History logs
            const historyRes = await fetch("http://localhost:5000/api/workouts/history", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (historyRes.ok) {
                const historyResult = await historyRes.json();
                if (historyResult.data) {
                    const mappedWorkouts = historyResult.data.map(w => ({
                        ...w,
                        id: w._id || w.id
                    }));
                    setLoggedWorkouts(mappedWorkouts);
                }
            }

            // 3. Calendar logs
            const calendarRes = await fetch("http://localhost:5000/api/workouts/calendar", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (calendarRes.ok) {
                const calendarResult = await calendarRes.json();
                if (calendarResult.data) {
                    setWorkoutCalendar(calendarResult.data);
                }
            }

            // 4. Meals logs
            const mealsRes = await fetch("http://localhost:5000/api/meals", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (mealsRes.ok) {
                const mealsResult = await mealsRes.json();
                if (mealsResult.data) {
                    const mappedMeals = mealsResult.data.map(m => ({
                        ...m,
                        id: m._id || m.id
                    }));
                    setMeals(mappedMeals);
                }
            }

            // 5. Daily Metrics
            const metricsRes = await fetch("http://localhost:5000/api/metrics/today", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (metricsRes.ok) {
                const metricsResult = await metricsRes.json();
                const m = metricsResult.data;
                if (m) {
                    setWaterIntake(m.waterIntake || 0);
                    setSleepHours(m.sleepHours || 0);
                    setHeartRate(m.heartRate || 0);
                    setCaloriesBurned(m.caloriesBurned || 0);
                    if (m.supplements) setSupplements(m.supplements);
                }
            }

            // 6. Metrics history
            const historyMetricsRes = await fetch("http://localhost:5000/api/metrics/history", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (historyMetricsRes.ok) {
                const historyMetricsResult = await historyMetricsRes.json();
                const logs = historyMetricsResult.data;
                if (logs && Array.isArray(logs)) {
                    const stepsLog = logs.map(l => ({ date: l.date, steps: l.steps }));
                    const weightsLog = logs.filter(l => l.weight !== null).map(l => ({ date: l.date, weight: l.weight }));
                    const measurementsLog = logs.filter(l => l.chest !== null).map(l => ({ date: l.date, chest: l.chest, waist: l.waist, hips: l.hips }));
                    
                    setStepsHistory(stepsLog);
                    setWeightHistory(weightsLog);
                    setBodyMeasurementHistory(measurementsLog);
                }
            }

            // 7. System notifications
            const notificationsRes = await fetch("http://localhost:5000/api/notifications", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (notificationsRes.ok) {
                const notificationsResult = await notificationsRes.json();
                if (notificationsResult.data) {
                    setNotifications(notificationsResult.data);
                }
            }

            // 8. Workout Favorites list
            const favoritesRes = await fetch("http://localhost:5000/api/workouts/favorites", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (favoritesRes.ok) {
                const favoritesResult = await favoritesRes.json();
                if (favoritesResult.data) {
                    setFavorites(favoritesResult.data);
                }
            }

        } catch (error) {
            console.error("Failed to sync backend database data:", error);
        }
    };

    useEffect(() => {
        fetchUserDatabaseData();
    }, []);

    // Profile state
    const [profile, setProfile] = useState(() => {
        const savedName = sessionStorage.getItem("pulse_user_name") || "Alex Rivera";
        const savedEmail = sessionStorage.getItem("pulse_user_email") || "alex.rivera@pulsex.io";
        const savedCode = sessionStorage.getItem("pulse_user_code") || "PLX982";
        
        const loaded = getInitialState("profile", null);
        if (loaded) return loaded;
        
        if (sessionStorage.getItem("pulse_is_new_signup") === "true") {
            return {
                name: savedName,
                email: savedEmail,
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
                role: "user",
                height: null,
                weight: null,
                targetWeight: null,
                bodyFat: null,
                bmi: null,
                fitnessLevel: "Not Configured",
                workoutFrequency: null,
                dailyCalorieTarget: null,
                dailyWaterTarget: null,
                dailySleepTarget: null,
                shareCode: savedCode
            };
        }
        return {
            name: savedName,
            email: savedEmail,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
            role: "user",
            height: 178,
            weight: 76.5,
            targetWeight: 72.0,
            bodyFat: 16.4,
            bmi: 24.1,
            fitnessLevel: "Intermediate",
            workoutFrequency: 4,
            dailyCalorieTarget: 2200,
            dailyWaterTarget: 3000,
            dailySleepTarget: 8,
            shareCode: savedCode
        };
    });
    // Predefined Workouts
    const [workouts, setWorkouts] = useState([
        {
            id: "w1",
            name: "Hypertrophy Push Routine",
            category: "Strength",
            duration: 45,
            calories: 380,
            difficulty: "Intermediate",
            description: "Focus on chest, shoulders, and triceps hypertrophy using slow eccentric controls.",
            exercises: [
                { name: "Incline Dumbbell Bench Press", sets: "4", reps: "8-10" },
                { name: "Overhead Barbell Press", sets: "3", reps: "8" },
                { name: "Decline Cable Flyes", sets: "3", reps: "12" },
                { name: "Triceps Overhead Extension", sets: "4", reps: "12" }
            ]
        },
        {
            id: "w2",
            name: "HIIT Ignite Circuit",
            category: "HIIT",
            duration: 30,
            calories: 420,
            difficulty: "Advanced",
            description: "High-intensity metabolic conditioning circuit designed to maximize calorie burn post-exercise.",
            exercises: [
                { name: "Burpees", sets: "4", reps: "45s on / 15s off" },
                { name: "Kettlebell Swings", sets: "4", reps: "45s on / 15s off" },
                { name: "Mountain Climbers", sets: "4", reps: "45s on / 15s off" },
                { name: "Jump Squats", sets: "4", reps: "45s on / 15s off" }
            ]
        },
        {
            id: "w3",
            name: "Core & Stability Engine",
            category: "Strength",
            duration: 20,
            calories: 150,
            difficulty: "Beginner",
            description: "Build a rock solid core foundation to support heavy compound lifts and prevent back pain.",
            exercises: [
                { name: "Plank Hold", sets: "3", reps: "60s" },
                { name: "Hanging Leg Raises", sets: "3", reps: "12" },
                { name: "Russian Twists", sets: "3", reps: "20 each side" },
                { name: "Bird Dogs", sets: "3", reps: "10 each side" }
            ]
        },
        {
            id: "w4",
            name: "Vinyasa Flow Restoration",
            category: "Flexibility",
            duration: 40,
            calories: 180,
            difficulty: "Beginner",
            description: "Full body active mobility and deep breathwork to restore muscular elasticity.",
            exercises: [
                { name: "Downward Facing Dog", sets: "1", reps: "3 mins" },
                { name: "Warrior II Sequence", sets: "3", reps: "5 breaths" },
                { name: "Cobra Pose Hold", sets: "2", reps: "1 min" },
                { name: "Pigeon Stretch", sets: "2", reps: "2 mins each side" }
            ]
        },
        {
            id: "w5",
            name: "Tabata Cardio Explosion",
            category: "Cardio",
            duration: 15,
            calories: 220,
            difficulty: "Intermediate",
            description: "Speed-focused tabata blocks targeting aerobic capacities and raw speed dynamics.",
            exercises: [
                { name: "High Knees Sprint", sets: "8", reps: "20s on / 10s off" },
                { name: "Shadow Boxing", sets: "8", reps: "20s on / 10s off" },
                { name: "Plyo Lunges", sets: "8", reps: "20s on / 10s off" }
            ]
        }
    ]);
    const [favorites, setFavorites] = useState(() => {
        return getInitialState("favorites", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : ["w1", "w3"]);
    });
    const toggleFavorite = async (id) => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch(`http://localhost:5000/api/workouts/favorite/${id}`, {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` }
                });
            } catch (e) {
                console.error(e);
            }
        }
        setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
        showToast(favorites.includes(id) ? "Removed from favorites" : "Added to favorites", "success");
    };
    // Workout Tracker Logs
    const [loggedWorkouts, setLoggedWorkouts] = useState(() => {
        return getInitialState("loggedWorkouts", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { id: "log1", date: "2026-07-02", workoutId: "w1", duration: 45, calories: 380 },
            { id: "log2", date: "2026-07-01", workoutId: "w3", duration: 20, calories: 150 },
            { id: "log3", date: "2026-06-30", workoutId: "w2", duration: 30, calories: 420 }
        ]);
    });
    const logWorkout = async (workoutId, duration, calories, customName = null, customCategory = null) => {
        const today = new Date().toISOString().split("T")[0];
        const w = workouts.find(x => x.id === workoutId);
        const workoutName = customName || w?.name || "Workout";
        const category = customCategory || w?.category || "Strength";
        
        const token = sessionStorage.getItem("pulse_token");
        let savedLogId = "log_" + Date.now();
        if (token) {
            try {
                const response = await fetch("http://localhost:5000/api/workouts/log", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ workoutId, workoutName, category, duration, calories, date: today })
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.data) {
                        savedLogId = result.data._id || result.data.id;
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        const newLog = {
            id: savedLogId,
            date: today,
            workoutId,
            workoutName,
            category,
            duration,
            calories
        };
        setLoggedWorkouts(prev => [newLog, ...prev]);
        addSystemNotification("Workout Completed! 🎉", `You completed ${workoutName} and burned ${calories} kcal.`, "workout");
        showToast("Workout logged successfully!", "success");
    };
    const deleteWorkoutLog = async (id) => {
        const token = sessionStorage.getItem("pulse_token");
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        
        if (token && isObjectId) {
            try {
                await fetch(`http://localhost:5000/api/workouts/log/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
            } catch (e) {
                console.error(e);
            }
        }
        setLoggedWorkouts(prev => prev.filter(w => w.id !== id && w._id !== id));
        showToast("Workout log removed", "info");
    };
    const [workoutCalendar, setWorkoutCalendar] = useState(() => {
        return getInitialState("workoutCalendar", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { date: "2026-07-03", workoutId: "w1" },
            { date: "2026-07-04", workoutId: "w4" },
            { date: "2026-07-06", workoutId: "w2" }
        ]);
    });
    const scheduleWorkout = async (date, workoutId) => {
        const w = workouts.find(x => x.id === workoutId);
        const workoutName = w?.name || "Workout";
        const category = w?.category || "Strength";
        const duration = w?.duration || 30;
        const calories = w?.calories || 200;

        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/workouts/schedule", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ date, workoutId, workoutName, category, duration, calories })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setWorkoutCalendar(prev => [...prev, { date, workoutId }]);
        showToast("Workout scheduled on calendar!", "success");
    };
    // Diet Logs
    const [meals, setMeals] = useState(() => {
        return getInitialState("meals", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { id: "m1", type: "Breakfast", name: "Avocado Egg Toast & Protein Shake", calories: 520, protein: 42, carbs: 45, fat: 18 },
            { id: "m2", type: "Lunch", name: "Grilled Chicken Breast with Brown Rice & Broccoli", calories: 650, protein: 55, carbs: 60, fat: 12 }
        ]);
    });
    const addMeal = async (newMeal) => {
        const today = new Date().toISOString().split("T")[0];
        let savedMeal = { ...newMeal, id: "meal_" + Date.now() };

        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                const res = await fetch("http://localhost:5000/api/meals", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ ...newMeal, date: today })
                });
                if (res.ok) {
                    const result = await res.json();
                    if (result.data) {
                        savedMeal = {
                            ...result.data,
                            id: result.data._id || result.data.id
                        };
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        setMeals(prev => [...prev, savedMeal]);
        showToast(`${newMeal.name} logged!`, "success");
    };
    const removeMeal = async (id) => {
        const token = sessionStorage.getItem("pulse_token");
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        
        if (token && isObjectId) {
            try {
                await fetch(`http://localhost:5000/api/meals/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
            } catch (e) {
                console.error(e);
            }
        }
        setMeals(prev => prev.filter(m => m.id !== id && m._id !== id));
        showToast("Meal removed", "info");
    };
    const [waterIntake, setWaterIntake] = useState(() => {
        return getInitialState("waterIntake", sessionStorage.getItem("pulse_is_new_signup") === "true" ? 0 : 1500);
    }); // in ml
    const addWater = async (amount) => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/water", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ amount })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setWaterIntake(prev => Math.min(prev + amount, 10000));
        showToast(`Added ${amount}ml of water`, "success");
    };
    const resetWater = async () => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/water/reset", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` }
                });
            } catch (e) {
                console.error(e);
            }
        }
        setWaterIntake(0);
    };
    const [sleepHours, setSleepHours] = useState(() => {
        return getInitialState("sleepHours", sessionStorage.getItem("pulse_is_new_signup") === "true" ? 0 : 7.5);
    });
    const logSleep = async (hours) => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/sleep", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ hours })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setSleepHours(hours);
        showToast(`Logged ${hours}h of sleep`, "success");
    };
    const [heartRate, setHeartRate] = useState(() => {
        return getInitialState("heartRate", sessionStorage.getItem("pulse_is_new_signup") === "true" ? 0 : 128);
    });
    const logHeartRate = async (bpm) => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/heartrate", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ rate: bpm })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setHeartRate(bpm);
        showToast(`Heart rate updated to ${bpm} bpm`, "success");
    };
    const [caloriesBurned, setCaloriesBurned] = useState(() => {
        return getInitialState("caloriesBurned", sessionStorage.getItem("pulse_is_new_signup") === "true" ? 0 : 642);
    });
    const logCaloriesBurned = async (kcal) => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/calories", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ calories: kcal })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setCaloriesBurned(kcal);
        showToast(`Logged ${kcal} kcal burned`, "success");
    };
    const [supplements, setSupplements] = useState(() => {
        return getInitialState("supplements", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { id: "s1", name: "Creatine Monohydrate (5g)", time: "08:00 AM", taken: true },
            { id: "s2", name: "Omega-3 Fish Oil (1000mg)", time: "12:30 PM", taken: true },
            { id: "s3", name: "Magnesium Bisglycinate (300mg)", time: "09:30 PM", taken: false }
        ]);
    });
    const toggleSupplement = async (id) => {
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch(`http://localhost:5000/api/metrics/supplements/${id}`, {
                    method: "PUT",
                    headers: { "Authorization": `Bearer ${token}` }
                });
            } catch (e) {
                console.error(e);
            }
        }
        setSupplements(prev => prev.map(s => (s.id === id ? { ...s, taken: !s.taken } : s)));
        showToast("Supplement log updated", "success");
    };
    // Metrics logs
    const [weightHistory, setWeightHistory] = useState(() => {
        return getInitialState("weightHistory", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { date: "2026-06-27", weight: 77.8 },
            { date: "2026-06-28", weight: 77.4 },
            { date: "2026-06-29", weight: 77.2 },
            { date: "2026-06-30", weight: 77.0 },
            { date: "2026-07-01", weight: 76.8 },
            { date: "2026-07-02", weight: 76.5 }
        ]);
    });
    const logWeight = async (weight) => {
        const dateStr = new Date().toISOString().split("T")[0];
        
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/measurements", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ weight })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setWeightHistory(prev => [...prev.filter(w => w.date !== dateStr), { date: dateStr, weight }]);
        setProfile(p => {
            const hMeters = p.height ? (p.height / 100) : 1.78;
            const newBmi = Number((weight / (hMeters * hMeters)).toFixed(1));
            return { ...p, weight, bmi: newBmi };
        });
        showToast("Weight logged successfully!", "success");
    };
    const [bodyMeasurementHistory, setBodyMeasurementHistory] = useState(() => {
        return getInitialState("bodyMeasurementHistory", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { date: "2026-06-01", chest: 102, waist: 84, hips: 98 },
            { date: "2026-07-01", chest: 103, waist: 82, hips: 97 }
        ]);
    });
    const logBodyMeasurements = async (chest, waist, hips) => {
        const dateStr = new Date().toISOString().split("T")[0];
        
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/measurements", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ chest, waist, hips })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setBodyMeasurementHistory(prev => [
            ...prev.filter(b => b.date !== dateStr),
            { date: dateStr, chest, waist, hips }
        ]);
        showToast("Measurements updated!", "success");
    };
    const [stepsHistory, setStepsHistory] = useState(() => {
        return getInitialState("stepsHistory", sessionStorage.getItem("pulse_is_new_signup") === "true" ? [] : [
            { date: "2026-06-29", steps: 8430 },
            { date: "2026-06-30", steps: 11200 },
            { date: "2026-07-01", steps: 9800 },
            { date: "2026-07-02", steps: 10400 }
        ]);
    });
    const logSteps = async (steps) => {
        const dateStr = new Date().toISOString().split("T")[0];
        
        const token = sessionStorage.getItem("pulse_token");
        if (token) {
            try {
                await fetch("http://localhost:5000/api/metrics/steps", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify({ steps })
                });
            } catch (e) {
                console.error(e);
            }
        }
        setStepsHistory(prev => [...prev.filter(s => s.date !== dateStr), { date: dateStr, steps }]);
        showToast("Steps logged!", "success");
    };

    const initializeUserSession = (name, email, isNewSignup, code) => {
        sessionStorage.setItem("pulse_user_name", name);
        sessionStorage.setItem("pulse_user_email", email);
        sessionStorage.setItem("pulse_user_code", code);
        
        // Trigger live database sync from MongoDB
        fetchUserDatabaseData();
        
        const savedDataStr = localStorage.getItem("pulse_userdata_" + email.toLowerCase());
        if (savedDataStr) {
            try {
                const data = JSON.parse(savedDataStr);
                setProfile(data.profile || {});
                setLoggedWorkouts(data.loggedWorkouts || []);
                setFavorites(data.favorites || []);
                setWorkoutCalendar(data.workoutCalendar || []);
                setMeals(data.meals || []);
                setWaterIntake(data.waterIntake || 0);
                setSleepHours(data.sleepHours || 0);
                setHeartRate(data.heartRate || 0);
                setCaloriesBurned(data.caloriesBurned || 0);
                setWeightHistory(data.weightHistory || []);
                setBodyMeasurementHistory(data.bodyMeasurementHistory || []);
                setStepsHistory(data.stepsHistory || []);
                setSupplements(data.supplements || []);
                if (data.notifications) setNotifications(data.notifications);
                return;
            } catch (e) {
                console.error("Error loading user data from local database", e);
            }
        }

        if (isNewSignup) {
            sessionStorage.setItem("pulse_is_new_signup", "true");
            setProfile({
                name: name,
                email: email,
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
                role: "user",
                height: null,
                weight: null,
                targetWeight: null,
                bodyFat: null,
                bmi: null,
                fitnessLevel: "Not Configured",
                workoutFrequency: null,
                dailyCalorieTarget: null,
                dailyWaterTarget: null,
                dailySleepTarget: null,
                shareCode: code
            });
            setLoggedWorkouts([]);
            setFavorites([]);
            setWorkoutCalendar([]);
            setMeals([]);
            setWaterIntake(0);
            setSleepHours(0);
            setHeartRate(0);
            setCaloriesBurned(0);
            setWeightHistory([]);
            setBodyMeasurementHistory([]);
            setStepsHistory([]);
            setSupplements([]);
        } else {
            sessionStorage.removeItem("pulse_is_new_signup");
            setProfile({
                name: name,
                email: email,
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
                role: "user",
                height: 178,
                weight: 76.5,
                targetWeight: 72.0,
                bodyFat: 16.4,
                bmi: 24.1,
                fitnessLevel: "Intermediate",
                workoutFrequency: 4,
                dailyCalorieTarget: 2200,
                dailyWaterTarget: 3000,
                dailySleepTarget: 8,
                shareCode: code
            });
            setLoggedWorkouts([
                { id: "log1", date: "2026-07-02", workoutId: "w1", duration: 45, calories: 380 },
                { id: "log2", date: "2026-07-01", workoutId: "w3", duration: 20, calories: 150 },
                { id: "log3", date: "2026-06-30", workoutId: "w2", duration: 30, calories: 420 }
            ]);
            setFavorites(["w1", "w3"]);
            setWorkoutCalendar([
                { date: "2026-07-03", workoutId: "w1" },
                { date: "2026-07-04", workoutId: "w4" },
                { date: "2026-07-06", workoutId: "w2" }
            ]);
            setMeals([
                { id: "m1", type: "Breakfast", name: "Avocado Egg Toast & Protein Shake", calories: 520, protein: 42, carbs: 45, fat: 18 },
                { id: "m2", type: "Lunch", name: "Grilled Chicken Breast with Brown Rice & Broccoli", calories: 650, protein: 55, carbs: 60, fat: 12 }
            ]);
            setWaterIntake(1500);
            setSleepHours(7.5);
            setHeartRate(128);
            setCaloriesBurned(642);
            setWeightHistory([
                { date: "2026-06-27", weight: 77.8 },
                { date: "2026-06-28", weight: 77.4 },
                { date: "2026-06-29", weight: 77.2 },
                { date: "2026-06-30", weight: 77.0 },
                { date: "2026-07-01", weight: 76.8 },
                { date: "2026-07-02", weight: 76.5 }
            ]);
            setBodyMeasurementHistory([
                { date: "2026-06-01", chest: 102, waist: 84, hips: 98 },
                { date: "2026-07-01", chest: 103, waist: 82, hips: 97 }
            ]);
            setStepsHistory([
                { date: "2026-06-29", steps: 8430 },
                { date: "2026-06-30", steps: 11200 },
                { date: "2026-07-01", steps: 9800 },
                { date: "2026-07-02", steps: 10400 }
            ]);
            setSupplements([
                { id: "s1", name: "Creatine Monohydrate (5g)", time: "08:00 AM", taken: true },
                { id: "s2", name: "Omega-3 Fish Oil (1000mg)", time: "12:30 PM", taken: true },
                { id: "s3", name: "Magnesium Bisglycinate (300mg)", time: "09:30 PM", taken: false }
            ]);
        }
    };
    // Trainer Clients
    const [clients, setClients] = useState([
        {
            id: "c1",
            name: "Marcus Vance",
            email: "marcus.v@gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
            status: "Active",
            compliance: 92,
            assignedWorkoutPlan: "Strength & Power Gain",
            assignedDietPlan: "Bulking Phase High-Protein",
            workoutHistoryCount: 14,
            weightHistory: [
                { date: "2026-06-15", weight: 81.0 },
                { date: "2026-07-01", weight: 82.5 }
            ]
        },
        {
            id: "c2",
            name: "Sarah Jenkins",
            email: "sarah.j@outlook.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
            status: "Active",
            compliance: 86,
            assignedWorkoutPlan: "Fat Shred HIIT Special",
            assignedDietPlan: "Ketogenic Fat Loss 1800Kcal",
            workoutHistoryCount: 9,
            weightHistory: [
                { date: "2026-06-15", weight: 68.2 },
                { date: "2026-07-01", weight: 66.8 }
            ]
        },
        {
            id: "c3",
            name: "Devon Miller",
            email: "devon.m@gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
            status: "Pending",
            compliance: 0,
            workoutHistoryCount: 0,
            weightHistory: [{ date: "2026-07-01", weight: 94.0 }]
        }
    ]);
    const assignPlanToClient = (clientId, type, planName) => {
        setClients(prev => prev.map(c => {
            if (c.id === clientId) {
                return {
                    ...c,
                    status: "Active",
                    assignedWorkoutPlan: type === "workout" ? planName : c.assignedWorkoutPlan,
                    assignedDietPlan: type === "diet" ? planName : c.assignedDietPlan
                };
            }
            return c;
        }));
        showToast(`Assigned ${type} plan to client!`, "success");
    };
    // Messenger State
    const [messages, setMessages] = useState([
        {
            id: "msg1",
            senderId: "trainer_1",
            senderName: "Coach Christopher",
            recipientId: "user",
            text: "Hey Alex, I looked over your push routine log. Good job on keeping the control. Let's try to increase 2.5kg on barbell overhead press next session.",
            timestamp: "10:15 AM"
        },
        {
            id: "msg2",
            senderId: "user",
            senderName: "Alex Rivera",
            recipientId: "trainer_1",
            text: "Thanks Coach! Sounds like a plan. Triceps felt pretty sore but overall recovery has been excellent.",
            timestamp: "10:20 AM"
        },
        {
            id: "msg3",
            senderId: "trainer_1",
            senderName: "Coach Christopher",
            recipientId: "user",
            text: "Awesome, soreness is normal. Drink plenty of water and prioritize sleep tonight. Talk tomorrow!",
            timestamp: "10:24 AM"
        }
    ]);
    const sendMessage = (recipientId, text) => {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg = {
            id: "msg_" + Date.now(),
            senderId: "user",
            senderName: profile.name,
            recipientId,
            text,
            timestamp: timeStr
        };
        setMessages(prev => [...prev, newMsg]);
        showToast("Message sent!", "success");
        // Mock client response auto-reply from trainer after 2 seconds
        if (recipientId === "trainer_1" || recipientId === "c1" || recipientId === "c2") {
            setTimeout(() => {
                const replyMsg = {
                    id: "msg_reply_" + Date.now(),
                    senderId: recipientId,
                    senderName: recipientId === "trainer_1" ? "Coach Christopher" : "Client Member",
                    recipientId: "user",
                    text: "Understood! I will analyze the metrics and get back to you shortly.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(m => [...m, replyMsg]);
                addSystemNotification("New Message Received 💬", `Message from ${replyMsg.senderName}`, "system");
            }, 2500);
        }
    };
    // Notifications state
    const [notifications, setNotifications] = useState(() => {
        return getInitialState("notifications", [
            {
                id: "n1",
                title: "New Plan Assigned",
                message: "Coach Christopher assigned you a new diet plan: Bulking Phase High-Protein.",
                time: "2 hours ago",
                read: false,
                type: "diet"
            },
            {
                id: "n2",
                title: "Achievement Unlocked! 🏆",
                message: "Congratulations! You unlocked the 'Hydration King' badge.",
                time: "1 day ago",
                read: true,
                type: "achievement"
            },
            {
                id: "n3",
                title: "Schedule Reminder",
                message: "Vinyasa Flow Restoration is scheduled for tomorrow at 8:00 AM.",
                time: "2 days ago",
                read: true,
                type: "workout"
            }
        ]);
    });
    const markNotificationAsRead = (id) => {
        setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
    };
    const markAllNotificationsAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        showToast("All notifications marked as read", "success");
    };
    const addSystemNotification = (title, message, type = "system") => {
        const newNotif = {
            id: "n_" + Date.now(),
            title,
            message,
            time: "Just now",
            read: false,
            type
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    useEffect(() => {
        const email = sessionStorage.getItem("pulse_user_email");
        if (email) {
            const todayStr = new Date().toISOString().split("T")[0];
            const dataToSave = {
                last_saved_date: todayStr,
                profile,
                loggedWorkouts,
                favorites,
                workoutCalendar,
                meals,
                waterIntake,
                sleepHours,
                heartRate,
                caloriesBurned,
                weightHistory,
                bodyMeasurementHistory,
                stepsHistory,
                supplements,
                notifications
            };
            localStorage.setItem("pulse_userdata_" + email.toLowerCase(), JSON.stringify(dataToSave));
        }
    }, [
        profile,
        loggedWorkouts,
        favorites,
        workoutCalendar,
        meals,
        waterIntake,
        sleepHours,
        heartRate,
        caloriesBurned,
        weightHistory,
        bodyMeasurementHistory,
        stepsHistory,
        supplements,
        notifications
    ]);

    const saveProfile = async (updatedData) => {
        setProfile(prev => {
            const nextVal = typeof updatedData === "function" ? updatedData(prev) : updatedData;
            const token = sessionStorage.getItem("pulse_token");
            if (token) {
                fetch("http://localhost:5000/api/user/profile", {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                    body: JSON.stringify(nextVal)
                }).catch(e => console.error("Error saving profile to database:", e));
            }
            return nextVal;
        });
    };

    return (<AppContext.Provider value={{
            profile,
            setProfile: saveProfile,
            workouts,
            setWorkouts,
            favorites,
            toggleFavorite,
            loggedWorkouts,
            logWorkout,
            deleteWorkoutLog,
            workoutCalendar,
            scheduleWorkout,
            meals,
            addMeal,
            removeMeal,
            waterIntake,
            addWater,
            resetWater,
            sleepHours,
            logSleep,
            heartRate,
            logHeartRate,
            caloriesBurned,
            logCaloriesBurned,
            supplements,
            toggleSupplement,
            weightHistory,
            logWeight,
            bodyMeasurementHistory,
            logBodyMeasurements,
            stepsHistory,
            logSteps,
            clients,
            setClients,
            assignPlanToClient,
            messages,
            sendMessage,
            notifications,
            markNotificationAsRead,
            markAllNotificationsAsRead,
            addSystemNotification,
            toast,
            showToast,
            initializeUserSession
        }}>
      {children}
    </AppContext.Provider>);
}
export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
