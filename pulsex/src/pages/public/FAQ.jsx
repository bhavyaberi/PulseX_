import { useState } from "react";
import { ChevronDown } from "lucide-react";
export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        {
            q: "How does wearable telemetry sync with PulseX?",
            a: "We link directly with primary wearable vendor APIs (Garmin Connect, WHOOP Developer, Fitbit, and Apple HealthKit via our iOS/Android bridge). Once authorized during your profile setup, biometric data (resting heart rate, HRV, active calories, sleep duration) is read continuously every hour."
        },
        {
            q: "Can I use PulseX without a smart watch?",
            a: "Yes. While smart watch metrics automate HRV calculations, you can log all your workouts, water intake, sleep metrics, and weight manually inside the Daily Activity dashboard."
        },
        {
            q: "What is dynamic workout routine scaling?",
            a: "If you have a Garmin/WHOOP linked, we read your heart rate variability (HRV) and sleep quality. If your recovery profile drops below 35%, our systems recommend swapping your heavy compound lifts with active restoration stretches to avoid central nervous system fatigue."
        }
    ];
    return (<div className="container-px mx-auto max-w-4xl pb-24 pt-12 md:pb-32">
      <div className="text-center mb-16">
        <div className="eyebrow mb-6 justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
          TECHNICAL FAQ
        </div>
        <h1 className="font-display text-display-md font-black tracking-tight text-ink">
          Frequently asked <span className="text-pulse">questions</span>.
        </h1>
        <p className="mt-4 text-sm text-ink-dim leading-relaxed">
          Quick explanations of core architectural variables and client integrations.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (<div key={idx} className={`rounded-2xl border transition-all duration-300 ${isOpen ? "border-pulse/30 bg-surface/50" : "border-line bg-surface/20"}`}>
              <button onClick={() => setOpenIndex(isOpen ? null : idx)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-display font-bold text-sm text-ink pr-4">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-ink-dim shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-pulse" : ""}`}/>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 border-t border-line" : "max-h-0"}`}>
                <p className="p-6 text-xs text-ink-dim leading-relaxed">{faq.a}</p>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
