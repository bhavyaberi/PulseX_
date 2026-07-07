import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../common/Footer";
export default function PublicLayout() {
    return (<div className="relative min-h-screen bg-void text-ink flex flex-col justify-between">
      {/* Top ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[450px] bg-radial-fade-top opacity-80"/>
      <div className="pointer-events-none absolute inset-0 bg-noise-grid opacity-35 [mask-image:radial-gradient(ellipse_60%_45%_at_50%_0%,#000_40%,transparent_100%)]"/>

      <Navbar />

      <main className="relative flex-1 pt-28">
        <Outlet />
      </main>

      <Footer />
    </div>);
}
