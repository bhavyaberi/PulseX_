import { useMemo } from "react";
function makeParticles(count) {
    return Array.from({ length: count }).map((_, i) => {
        const isPulse = i % 4 === 0;
        return {
            id: i,
            left: `${Math.random() * 100}%`,
            size: 1.5 + Math.random() * 2.5,
            duration: 9 + Math.random() * 10,
            delay: Math.random() * 10,
            rise: 120 + Math.random() * 140,
            drift: (Math.random() - 0.5) * 60,
            opacity: 0.25 + Math.random() * 0.35,
            color: isPulse ? "#FF9A47" : "#FFFFFF",
        };
    });
}
export default function Particles({ count = 22 }) {
    const particles = useMemo(() => makeParticles(count), [count]);
    return (<div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (<span key={p.id} className="particle absolute bottom-0 rounded-full" style={{
                left: p.left,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--particle-rise": `-${p.rise}px`,
                "--particle-drift": `${p.drift}px`,
                "--particle-opacity": p.opacity,
                boxShadow: `0 0 6px ${p.color}`,
            }}/>))}
    </div>);
}
