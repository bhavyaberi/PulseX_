import { motion } from "framer-motion";
export default function Blog() {
    const posts = [
        {
            title: "Understanding Heart Rate Variability (HRV) for Recovery",
            category: "Wearables",
            date: "July 2, 2026",
            readTime: "6 min read",
            desc: "An in-depth analysis of autonomic nervous system balance, and how to calibrate your training intensity based on morning HRV readings.",
            image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Protein Thresholds and Muscle Synthesis In Strength Athletics",
            category: "Nutrition",
            date: "June 28, 2026",
            readTime: "8 min read",
            desc: "Scientific breakdown of leucine triggering threshold, optimal meal spacing, and supplement schedules for maximizing hypertrophy.",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Active Restoration Sequences vs. Complete Rest Protocols",
            category: "Training",
            date: "June 15, 2026",
            readTime: "5 min read",
            desc: "Why sitting on the couch is slowing your recovery. How active restoration flow sequences promote vascular clearance and reduce soreness.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop"
        }
    ];
    return (<div className="container-px mx-auto max-w-7xl pb-24 pt-12 md:pb-32">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="eyebrow mb-6 justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-pulse animate-blink-dot"/>
          PULSEX BLOG
        </div>
        <h1 className="font-display text-display-md font-black tracking-tight text-ink">
          Insights & Sports <span className="text-pulse">Science</span>.
        </h1>
        <p className="mt-4 text-sm text-ink-dim leading-relaxed">
          Stay informed on biochemical metrics, sports physiology research, and wearable telemetry optimization.
        </p>
      </div>

      {/* Grid of posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((p, idx) => (<motion.article key={p.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="card overflow-hidden border border-line bg-surface/30 flex flex-col justify-between">
            <div>
              <div className="h-48 overflow-hidden border-b border-line relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
                <span className="absolute top-4 left-4 rounded-full bg-surface/80 border border-line px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-ink backdrop-blur-md">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] text-ink-faint mb-3">
                  <span>{p.date}</span>
                  <span>•</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="font-display text-base font-bold text-ink leading-snug hover:text-pulse transition cursor-pointer mb-3">
                  {p.title}
                </h3>
                <p className="text-xs text-ink-dim leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-pulse hover:text-pulse-soft transition flex items-center gap-1.5">
                Read Article
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6 2.5 9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.article>))}
      </div>
    </div>);
}
