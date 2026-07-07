import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Settings as SettingsIcon, Bell, Volume2, Shield } from "lucide-react";
export default function Settings() {
    const { showToast } = useApp();
    const [workoutReminders, setWorkoutReminders] = useState(true);
    const [dietAlerts, setDietAlerts] = useState(true);
    const [soundTriggers, setSoundTriggers] = useState(false);
    const [privacyConsent, setPrivacyConsent] = useState(true);
    const handleSave = (e) => {
        e.preventDefault();
        showToast("Settings profiles compiled!", "success");
    };
    return (<div className="space-y-8 animate-fade-up max-w-2xl mx-auto">
      <div className="border-b border-line pb-4">
        <h1 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-pulse"/>
          General Settings
        </h1>
        <p className="text-xs text-ink-dim mt-1">
          Adjust notification frequencies, sound alerts, and privacy consent logs.
        </p>
      </div>

      <form onSubmit={handleSave} className="card p-6 md:p-8 border border-line bg-surface/40 space-y-6">
        
        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2 border-b border-line pb-2">
            <Bell className="h-4.5 w-4.5 text-pulse"/>
            Alert Frequencies
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-ink">Workout Reminders</div>
              <div className="text-[10px] text-ink-dim mt-1">Push alerts 30 minutes prior to scheduled calendar events.</div>
            </div>
            <input type="checkbox" checked={workoutReminders} onChange={(e) => setWorkoutReminders(e.target.checked)} className="h-4 w-4 rounded border-line text-pulse bg-surface focus:ring-pulse"/>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-ink">Diet Log Alerts</div>
              <div className="text-[10px] text-ink-dim mt-1">Reminders if dinner or lunch macros are unlogged by 08:00 PM.</div>
            </div>
            <input type="checkbox" checked={dietAlerts} onChange={(e) => setDietAlerts(e.target.checked)} className="h-4 w-4 rounded border-line text-pulse bg-surface focus:ring-pulse"/>
          </div>
        </div>

        {/* Audio settings */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2 border-b border-line pb-2">
            <Volume2 className="h-4.5 w-4.5 text-pulse"/>
            Audio Controls
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-ink">Sound Effect Triggers</div>
              <div className="text-[10px] text-ink-dim mt-1">Play brief audio sounds when logging water cups or completing plans.</div>
            </div>
            <input type="checkbox" checked={soundTriggers} onChange={(e) => setSoundTriggers(e.target.checked)} className="h-4 w-4 rounded border-line text-pulse bg-surface focus:ring-pulse"/>
          </div>
        </div>

        {/* Privacy consent */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2 border-b border-line pb-2">
            <Shield className="h-4.5 w-4.5 text-pulse"/>
            Privacy Agreements
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-ink">Wearable Telemetry Sharing</div>
              <div className="text-[10px] text-ink-dim mt-1">Allow coaches on your active roster to inspect historical heart logs.</div>
            </div>
            <input type="checkbox" checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)} className="h-4 w-4 rounded border-line text-pulse bg-surface focus:ring-pulse"/>
          </div>
        </div>

        <button type="submit" className="w-full btn-primary justify-center text-xs font-bold mt-2">
          Save Settings Profiles
        </button>

      </form>
    </div>);
}
