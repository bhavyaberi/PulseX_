import { useRef } from "react";
/**
 * Wraps interactive elements (nav links, CTA buttons) with a subtle
 * magnetic pull toward the cursor — a small, premium micro-interaction
 * rather than a layout change.
 */
export default function Magnetic({ children, strength = 14, className = "" }) {
    const ref = useRef(null);
    function handleMove(e) {
        const el = ref.current;
        if (!el)
            return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.setProperty("--mx", `${(relX / rect.width) * strength}px`);
        el.style.setProperty("--my", `${(relY / rect.height) * strength}px`);
    }
    function handleLeave() {
        const el = ref.current;
        if (!el)
            return;
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
    }
    return (<div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`inline-flex will-change-transform ${className}`} style={{
            transform: "translate(var(--mx, 0px), var(--my, 0px))",
            transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
      {children}
    </div>);
}
