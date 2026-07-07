import { Link } from "react-router-dom";
import PulseTrace from "../components/ui/PulseTrace";
export default function Dashboard() {
    return (<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-6">
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"/>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-radial-fade-top"/>

      <div className="card-glass relative w-full max-w-md p-10 text-center">
        <Link to="/" className="font-display text-lg font-bold text-ink">
          Pulse<span className="text-pulse">X</span>
        </Link>
        <PulseTrace className="mx-auto mt-6 h-10 w-32"/>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Dashboard</h1>
        <p className="mt-2 text-sm text-ink-dim">
          Placeholder — the full metric-rich futuristic dashboard is built in a later pass.
        </p>
        <Link to="/" className="btn-secondary mt-8 inline-flex">
          Back home
        </Link>
      </div>
    </main>);
}
