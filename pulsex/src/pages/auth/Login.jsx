import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
export default function Login() {
    const { showToast, initializeUserSession } = useApp();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const nameFromEmail = (emailStr) => {
        if (!emailStr) return "User";
        const parts = emailStr.split("@")[0].split(/[._\-+]/);
        return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast("Email and password are required", "error");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Invalid credentials");
            }
            
            const { token, name: userName, shareCode } = result.data;
            sessionStorage.setItem("pulse_token", token);
            sessionStorage.setItem("pulse_is_logged_in", "true");
            sessionStorage.setItem("pulse_logged_in_role", "user");

            // Save local credentials backup
            localStorage.setItem("pulse_password_" + email.toLowerCase(), password);

            // Fetch and set user session inside React context state
            initializeUserSession(userName, email, false, shareCode);
            
            showToast(`Welcome back, ${userName}!`, "success");
            navigate("/dashboard");
        } catch (error) {
            // Local fallback logic
            const savedPassword = localStorage.getItem("pulse_password_" + email.toLowerCase());
            if (savedPassword && password === savedPassword) {
                sessionStorage.setItem("pulse_is_logged_in", "true");
                sessionStorage.setItem("pulse_logged_in_role", "user");
                const savedName = localStorage.getItem("pulse_name_" + email.toLowerCase()) || nameFromEmail(email);
                const savedCode = localStorage.getItem("pulse_code_" + email.toLowerCase()) || "PLX982";
                initializeUserSession(savedName, email, false, savedCode);
                showToast(`Offline authentication successful! Welcome, ${savedName}.`, "success");
                navigate("/dashboard");
            } else {
                showToast(error.message || "Invalid credentials", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (<div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-center">
        Sign In
      </h2>
      <p className="mt-2 text-xs text-ink-dim text-center">
        Enter your credentials to access your account.
      </p>

      <form onSubmit={handleLoginSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@pulsex.io" className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          <div className="text-[10px] text-red-400/85 mt-1.5 leading-normal">
            Remember the password. If you forget it, you will not be able to reset it.
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full btn-primary justify-center !py-3 text-xs font-bold disabled:opacity-40 mt-6">
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="h-[1px] flex-1 bg-line"/>
        <span className="text-[10px] text-ink-faint font-medium uppercase tracking-wider">or continue with</span>
        <span className="h-[1px] flex-1 bg-line"/>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={() => {
            sessionStorage.setItem("pulse_is_logged_in", "true");
            sessionStorage.setItem("pulse_logged_in_role", "user");
            initializeUserSession("Google Athlete", "google@pulsex.io", false, "PLX982");
            showToast("Social Login linked!", "success");
            navigate("/dashboard");
        }} className="flex items-center justify-center gap-2 rounded-xl border border-line bg-ink/[0.02] py-2.5 text-xs text-ink-dim hover:text-ink hover:border-ink/20 transition-all">
          <span>Google</span>
        </button>
        <button onClick={() => {
            sessionStorage.setItem("pulse_is_logged_in", "true");
            sessionStorage.setItem("pulse_logged_in_role", "user");
            initializeUserSession("Apple Athlete", "apple@pulsex.io", false, "PLX982");
            showToast("Social Login linked!", "success");
            navigate("/dashboard");
        }} className="flex items-center justify-center gap-2 rounded-xl border border-line bg-ink/[0.02] py-2.5 text-xs text-ink-dim hover:text-ink hover:border-ink/20 transition-all">
          <span>Apple ID</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-ink-dim">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-pulse hover:text-pulse-soft transition ml-1">
            Initiate Signup
          </Link>
        </p>
      </div>
    </div>);
}
