export default function Privacy() {
    return (<div className="container-px mx-auto max-w-3xl pb-24 pt-12 md:pb-32">
      <div className="eyebrow mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
        SECURITY CORE
      </div>
      <h1 className="font-display text-display-md font-black tracking-tight text-ink mb-10">
        Telemetry <span className="text-pulse">Privacy Policy</span>.
      </h1>

      <div className="space-y-8 text-xs text-ink-dim leading-relaxed">
        <section className="space-y-3">
          <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider">1. Manual Data Ingestion</h3>
          <p>
            PulseX only stores the fitness telemetry data that you choose to enter manually (such as heart rate, steps, sleep hours, water intake, workouts, and meals). We do not run background tracker scripts or capture device location/sensor details.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider">2. Trainer Access & Code Security</h3>
          <p>
            When you share your unique 6-character Trainer Access Code (found in your profile settings) with a Personal Coach, that coach can log directly into your athlete profile. The connected coach can view and modify your workout schedules and meal plans. We recommend only sharing your access code with verified, trusted coaches.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider">3. Student Project Data Transparency</h3>
          <p>
            As a platform designed and built by Computer Science Engineering students, we prioritize simplicity and data honesty. Your profile details, biometric assessments, and history logs are stored securely within local mock scopes and browser storage. We do not sell, rent, or profile your biological details for advertisements.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider">4. Data Deletion & Session Cleanup</h3>
          <p>
            You have full control over your telemetry. Clearing your browser session storage or clicking "Exit Dashboard" / "Disconnect" immediately destroys active coach tokens and clears credentials logs.
          </p>
        </section>
      </div>
    </div>);
}
