import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Edit2 } from "lucide-react";
export default function UserProfile() {
    const { profile } = useApp();
    return (<div className="space-y-8 animate-fade-up max-w-4xl mx-auto">
      
      {/* Header Profile card */}
      <div className="card overflow-hidden border border-line bg-surface/30 p-8 md:p-10 relative">
        <div className="absolute right-0 top-0 w-48 h-full bg-navy-glow blur-[80px] pointer-events-none"/>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img src={profile.avatar} alt={profile.name} className="h-28 w-28 rounded-full object-cover border-2 border-pulse shadow-glow"/>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
              <h2 className="font-display text-2xl font-black text-ink">{profile.name}</h2>
              <span className="inline-flex self-center md:self-auto rounded-full bg-pulse/10 border border-pulse/25 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-pulse font-semibold">
                Athlete
              </span>
            </div>
            <p className="text-xs text-ink-dim mt-2">{profile.email}</p>
            <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
              <span className="text-[10px] uppercase font-bold text-ink-faint">Trainer Access Code:</span>
              <span className="font-mono text-xs font-bold text-pulse bg-pulse/10 border border-pulse/30 px-2 py-0.5 rounded-lg select-all cursor-pointer" title="Share this code with your trainer to connect accounts">
                {profile.shareCode || "PLX982"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5 justify-center md:justify-start">
              <span className="pill text-[10px] uppercase font-bold">Level: {profile.fitnessLevel}</span>
              <span className="pill text-[10px] uppercase font-bold">{profile.workoutFrequency} / week</span>
            </div>
          </div>
          <Link to="/dashboard/profile/edit" className="btn-secondary !py-2.5 !px-4 !text-[12px] flex items-center gap-2">
            <Edit2 className="h-3.5 w-3.5"/>
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Completion Meter & Specific parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Completion percentage */}
        <div className="card p-6 border border-line bg-surface/50 text-center">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-6">Profile Completion</h4>
          <div className="relative inline-flex items-center justify-center">
            {/* simple SVG circle */}
            {(() => {
              const fields = [
                  profile.height,
                  profile.weight,
                  profile.targetWeight,
                  profile.fitnessLevel,
                  profile.workoutFrequency
              ];
              const filled = fields.filter(x => x !== null && x !== undefined && x !== "" && x !== "Not Configured").length;
              const completion = Math.round((filled / fields.length) * 100);
              const offset = 2 * Math.PI * 40 * (1 - completion / 100);
              return (
                <>
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="transparent"/>
                    <circle cx="48" cy="48" r="40" stroke="#FF7A1A" strokeWidth="6" fill="transparent" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" style={{ filter: "drop-shadow(0 0 5px rgba(255,122,26,0.5))" }}/>
                  </svg>
                  <span className="absolute font-display text-xl font-bold text-ink">{completion}%</span>
                </>
              );
            })()}
          </div>
          <p className="mt-6 text-[10px] text-ink-dim leading-relaxed">
            Configure height, weight, target, and level to reach 100%.
          </p>
        </div>

        {/* Biometrics Summary card */}
        <div className="card p-6 border border-line bg-surface/50 md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider border-b border-line pb-2.5">
            Ingested Biometrics
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <div className="text-[10px] text-ink-faint uppercase tracking-wider">Height</div>
              <div className="mt-1 font-display text-lg font-bold text-ink">
                {profile.height ? `${profile.height} cm` : "--"}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-faint uppercase tracking-wider">Weight</div>
              <div className="mt-1 font-display text-lg font-bold text-ink">
                {profile.weight ? `${profile.weight} kg` : "--"}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-faint uppercase tracking-wider">BMI Index</div>
              <div className="mt-1 font-display text-lg font-bold text-ink">
                {profile.bmi || "--"}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-ink-faint uppercase tracking-wider">Target Weight</div>
              <div className="mt-1 font-display text-lg font-bold text-pulse">
                {profile.targetWeight ? `${profile.targetWeight} kg` : "--"}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>);
}
