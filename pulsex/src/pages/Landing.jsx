import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
export default function Landing() {
    return (<main className="min-h-screen bg-void">
      <Navbar />
      <Hero />

      {/* Remaining sections (Why PulseX, Features, Dashboard Showcase,
            Programs, Timeline, Stats, Testimonials, Pricing, FAQ, Footer)
            are built in the next pass. */}
    </main>);
}
