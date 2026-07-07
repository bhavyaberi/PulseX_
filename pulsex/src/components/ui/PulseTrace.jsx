import { useId } from "react";
import { motion } from "framer-motion";
/**
 * The recurring heartbeat-line motif derived from the PulseX logo.
 * A single flat line that spikes twice — reused as a nav mark, section
 * divider, loader, and background trace throughout the site. A bright
 * segment continuously travels the line, like a live signal.
 */
export default function PulseTrace({ className = "", color = "#FF7A1A", animate = true, strokeWidth = 2.5, glow = true, speed = 3.2, d = "M0,20 L34,20 L44,4 L54,36 L64,20 L100,20", viewBox = "0 0 100 40", dashArray = "14 86", }) {
    const uid = useId();
    const filterId = `pulse-glow-${uid}`;
    return (<svg viewBox={viewBox} className={className} preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      {glow && (<defs>
          <filter id={filterId} x="-50%" y="-150%" width="200%" height="400%">
            <feGaussianBlur stdDeviation="2.2" result="blur"/>
          </filter>
        </defs>)}

      {/* Base flat trace, always visible */}
      <path d={d} stroke={color} strokeOpacity={0.18} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>

      {animate ? (<>
          {/* Glow layer trailing the live signal */}
          {glow && (<motion.path d={d} stroke={color} strokeOpacity={0.65} strokeWidth={strokeWidth + 2.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashArray} filter={`url(#${filterId})`} initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -200 }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }}/>)}
          {/* Crisp signal on top */}
          <motion.path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashArray} initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -200 }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }}/>
        </>) : (<path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>)}
    </svg>);
}
