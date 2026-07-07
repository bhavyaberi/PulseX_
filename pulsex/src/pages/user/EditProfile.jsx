import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
export default function EditProfile() {
    const { profile, setProfile, showToast } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: profile.name || "",
        email: profile.email || "",
        avatar: profile.avatar || "",
        height: profile.height ? profile.height.toString() : "",
        weight: profile.weight ? profile.weight.toString() : "",
        targetWeight: profile.targetWeight ? profile.targetWeight.toString() : "",
        fitnessLevel: profile.fitnessLevel || "Beginner",
        workoutFrequency: profile.workoutFrequency ? profile.workoutFrequency.toString() : ""
    });
    const [saving, setSaving] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            showToast("Name and email are required", "error");
            return;
        }
        setSaving(true);
        setTimeout(() => {
            const h = formData.height ? Number(formData.height) : null;
            const w = formData.weight ? Number(formData.weight) : null;
            const bmi = (h && w) ? Number((w / ((h / 100) * (h / 100))).toFixed(1)) : null;

            setProfile((prev) => ({
                ...prev,
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar,
                height: h,
                weight: w,
                targetWeight: formData.targetWeight ? Number(formData.targetWeight) : null,
                fitnessLevel: formData.fitnessLevel,
                workoutFrequency: formData.workoutFrequency ? Number(formData.workoutFrequency) : null,
                bmi: bmi
            }));
            showToast("Profile telemetry saved!", "success");
            setSaving(false);
            navigate("/dashboard/profile");
        }, 1000);
    };
    return (<div className="space-y-8 animate-fade-up max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h2 className="font-display text-xl font-bold text-ink">Edit Biometric Profile</h2>
        <button onClick={() => navigate("/dashboard/profile")} className="text-xs text-ink-dim hover:text-ink transition">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 md:p-8 border border-line bg-surface/40 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Athlete Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Avatar URL</label>
          <input type="text" value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Height (cm)</label>
            <input type="number" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Weight (kg)</label>
            <input type="number" step="0.1" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Target Weight (kg)</label>
            <input type="number" step="0.1" value={formData.targetWeight} onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Fitness Level</label>
            <select value={formData.fitnessLevel} onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-dim mb-1.5">Frequency (workouts/wk)</label>
            <input type="number" value={formData.workoutFrequency} onChange={(e) => setFormData({ ...formData, workoutFrequency: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse"/>
          </div>
        </div>

        <button type="submit" disabled={saving} className="w-full btn-primary justify-center !py-3 text-xs font-bold disabled:opacity-40">
          {saving ? "Transmitting calibration update..." : "Save Calibration Settings"}
        </button>
      </form>
    </div>);
}
