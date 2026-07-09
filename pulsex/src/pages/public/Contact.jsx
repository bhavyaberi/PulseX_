import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { MessageSquare } from "lucide-react";
export default function Contact() {
    const { showToast } = useApp();
    const [formData, setFormData] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            showToast("Please fill in all fields", "error");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (res.ok && result.success) {
                showToast("Inquiry submitted! We will respond within 4 hours.", "success");
                setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
            } else {
                showToast(result.message || "Failed to submit inquiry", "error");
            }
        } catch (error) {
            showToast("Could not reach the server. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };
    return (<div className="container-px mx-auto max-w-7xl pb-24 pt-12 md:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Info */}
        <div>
          <div className="eyebrow mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
            GET IN TOUCH
          </div>
          <h1 className="font-display text-display-md font-bold tracking-tight text-ink">
            Talk to the <span className="text-pulse">PulseX Team</span>
          </h1>
          <p className="mt-4 text-sm text-ink-dim leading-relaxed max-w-md">
            Have questions, feedback, partnership inquiries, or need assistance with the platform? Our team is here to help and continuously improve your PulseX experience.
          </p>

          <div className="mt-8 space-y-6 max-w-md">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-1">Support & Inquiries</h4>
              <p className="text-xs text-ink-dim leading-relaxed">
                For technical support, feature requests, business collaborations, or general questions, feel free to reach out to us.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-line/50 pt-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pulse mb-1">Support Center</h4>
                <a href="mailto:support@pulsex.io" className="text-xs font-semibold text-ink hover:text-pulse transition">
                  support@pulsex.io
                </a>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pulse mb-1">Contact</h4>
                <div className="text-xs font-semibold text-ink">+91 XXXXX XXXXX</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-line/50 pt-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pulse mb-1">Headquarters</h4>
                <div className="text-xs font-semibold text-ink">Delhi, India</div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pulse mb-1">Response Time</h4>
                <div className="text-xs text-ink-dim leading-normal">Typically within 24–48 business hours.</div>
              </div>
            </div>

            <div className="border-t border-line/50 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-1">Our Mission</h4>
              <p className="text-xs text-ink-dim leading-relaxed">
                To make fitness tracking smarter, more accessible, and easier to integrate into everyday life through technology-driven solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="card-glass p-8 md:p-10 shadow-glow-lg">
          <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-pulse"/>
            Send Inquiry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse transition"/>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="abc@example.com" className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse transition"/>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Subject</label>
              <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse transition">
                <option value="General Inquiry">General Inquiry</option>
                <option value="Feedback">Feedback</option>
                <option value="Technical Support">Technical Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-dim mb-2">Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Details of your inquiry..." rows={4} className="w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse transition resize-none"/>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary justify-center mt-2 disabled:opacity-40">
              {loading ? "Transmitting..." : "Send Request"}
            </button>
          </form>
        </div>

      </div>
    </div>);
}
