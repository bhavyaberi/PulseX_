// Fitness keyword list for local query classification
const fitnessKeywords = [
    "fitness", "exercise", "workout", "train", "stretch", "cardio", "strength", "hiit", "yoga",
    "muscle", "weight", "diet", "nutrition", "macro", "protein", "carb", "fat", "calorie",
    "meal", "supplement", "creatine", "vitamin", "recovery", "sleep", "hydration", "water",
    "run", "walk", "pushup", "squat", "gym", "home", "health", "wellness", "bmi", "heart",
    "active", "rep", "set", "lift", "bulk", "cut", "shred", "physique", "cardiovascular",
    "flexibility", "aerobic", "anaerobic", "hypertrophy", "calisthenics", "crossfit",
    "bodybuilding", "sore", "injury", "warmup", "cooldown", "stretch", "hydrate", "fat loss",
    "weight loss", "gain", "fasting", "keto", "vegan", "carb", "macro", "hydration", "water",
    "metabolism", "detox", "supplement", "pre-workout", "post-workout", "bcaa", "whey",
    "casein", "omega-3", "magnesium", "zinc", "iron", "multivitamin", "injury", "sprain",
    "cramp", "joint", "tendon", "ligament", "warm-up", "cool-down", "jog", "sprint", "cycle",
    "swim", "plank", "deadlift", "bench", "lunge", "pullup", "dip", "abs", "fit",
    "ai", "bot", "assistant", "pulsex", "pulse", "website", "site", "navigate", "navigation", 
    "page", "route", "how", "help", "dashboard", "trainer", "admin", "login", "signup"
];
const greetingsList = [
    "hi", "hello", "hey", "yo", "greetings", "help", "who are you", "what is your name",
    "how are you", "reset", "clear", "clean", "test", "start", "introduce"
];
/**
 * Checks if a query is related to fitness, exercise, nutrition, health, etc.
 * Also allows common greetings and system cleanups.
 */
export function isFitnessQuery(query) {
    const clean = query.trim().toLowerCase();
    if (!clean)
        return true;
    // Exact word boundary matches for greetings
    const words = clean.split(/\s+/);
    const hasGreeting = words.some(word => greetingsList.includes(word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")));
    if (hasGreeting || clean.startsWith("who are you") || clean.startsWith("what is your name")) {
        return true;
    }
    // Check if any fitness keyword is a substring of the query
    return fitnessKeywords.some(keyword => clean.includes(keyword));
}
/**
 * Formats a date into a clean 12-hour timestamp (e.g. "02:45 PM")
 */
export function formatTimestamp(date) {
    try {
        const d = new Date(date);
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    catch {
        return "";
    }
}
const STORAGE_KEY = "pulse_ai_chat_history";
/**
 * Loads conversation history from sessionStorage
 */
export function loadChatHistory() {
    try {
        const data = sessionStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    catch (e) {
        console.error("Failed to load chat history", e);
        return [];
    }
}
/**
 * Saves conversation history to sessionStorage
 */
export function saveChatHistory(history) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
    catch (e) {
        console.error("Failed to save chat history", e);
    }
}
/**
 * Clears conversation history from sessionStorage
 */
export function clearChatHistory() {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    }
    catch (e) {
        console.error("Failed to clear chat history", e);
    }
}
