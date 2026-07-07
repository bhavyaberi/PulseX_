import { Link } from "react-router-dom";
import PulseTrace from "../../components/ui/PulseTrace";
export default function NotFound() {
    return (<div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="card-glass relative max-w-md p-10 shadow-glow-lg border border-ink/10 bg-surface/50 backdrop-blur-2xl">
        <h1 className="font-display text-8xl font-black text-pulse animate-pulse-glow">404</h1>
        
        {/* flatlining EKG trace */}
        <PulseTrace className="mx-auto mt-6 h-10 w-48 text-pulse-soft opacity-60" d="M0,12 L60,12 L70,12 L80,12 L90,12 L190,12 L200,12 L300,12" dashArray="40 180" speed={0.8}/>

        <h3 className="font-display text-xl font-bold text-ink mt-6">Metric Route flatlined</h3>
        <p className="mt-3 text-xs text-ink-dim leading-relaxed">
          The biometric route you requested does not exist or has been archived. Check your calibration inputs.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link to="/" className="w-full sm:w-auto btn-primary !py-2.5 !px-5 !text-[13px]">
            Back Home
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto btn-secondary !py-2.5 !px-5 !text-[13px]">
            To Dashboard
          </Link>
        </div>
      </div>
    </div>);
}
