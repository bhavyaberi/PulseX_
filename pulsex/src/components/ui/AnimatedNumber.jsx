import { useEffect, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
/**
 * Counts smoothly from 0 up to `value` on mount. Used for the
 * dashboard card's live metrics (heart rate, calories, progress, etc.)
 * so the numbers feel like they're being measured, not just printed.
 */
export default function AnimatedNumber({ value, duration = 1.6, delay = 0, decimals = 0, prefix = "", suffix = "", className = "", }) {
    const motionValue = useMotionValue(0);
    const [display, setDisplay] = useState((0).toFixed(decimals));
    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
        });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, duration, delay, decimals]);
    return (<span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>);
}
