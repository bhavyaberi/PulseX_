import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
export default function Signup() {
    const { showToast, initializeUserSession } = useApp();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            showToast("Please fill in all fields", "error");
            return;
        }
        if (password !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }
            
            const { token, shareCode } = result.data;
            sessionStorage.setItem("pulse_token", token);
            sessionStorage.setItem("pulse_is_logged_in", "true");
            sessionStorage.setItem("pulse_logged_in_role", "user");
            
            // Backup save local cache
            localStorage.setItem("pulse_name_" + email.toLowerCase(), name);
            localStorage.setItem("pulse_code_" + email.toLowerCase(), shareCode);
            localStorage.setItem("pulse_password_" + email.toLowerCase(), password);

            // Fetch and set user session inside React context state
            initializeUserSession(name, email, true, shareCode);
            
            showToast("Registration successful! Welcome.", "success");
            navigate("/dashboard");
        } catch (error) {
            showToast(error.message || "Registration failed. Verify backend is running.", "error");
        } finally {
            setLoading(false);
        }
    };
    return (<div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-center">Sign Up</h2>
      <p className="mt-2 text-xs text-ink-dim text-center">Enter your details to create an account.</p>

      <form onSubmit={handleSignup} className="mt-8 space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Athlete Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Rivera" className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex.rivera@pulsex.io" className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-line bg-surface/50 px-4 py-3 text-xs text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          <div className="text-[10px] text-red-400/85 mt-1.5 leading-normal">
            Remember the password. If you forget it, you will not be able to reset it.
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full btn-primary justify-center !py-3 text-xs font-bold disabled:opacity-40 mt-6">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-ink-dim">
          Already registered?{" "}
          <Link to="/login" className="font-bold text-pulse hover:text-pulse-soft transition ml-1">
            Sign In Instead
          </Link>
        </p>
      </div>
    </div>);
}
