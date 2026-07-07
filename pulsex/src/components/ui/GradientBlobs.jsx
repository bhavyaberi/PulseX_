import { motion } from "framer-motion";
/**
 * Soft, slow-moving color fields behind the hero content — orange (brand)
 * and navy (logo) — that drift and breathe without ever drawing focus
 * away from the copy.
 */
export default function GradientBlobs() {
    return (<div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-pulse/20 blur-[110px]" animate={{
            x: [0, 60, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.12, 0.96, 1],
        }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}/>
      <motion.div className="absolute right-[-10%] top-1/4 h-[560px] w-[560px] rounded-full blur-[120px]" style={{ backgroundColor: "rgba(27,42,82,0.55)" }} animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.94, 1.08, 1],
        }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}/>
      <motion.div className="absolute left-1/3 bottom-[-10%] h-[380px] w-[380px] rounded-full bg-pulse/10 blur-[100px]" animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 10, 0],
        }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}/>
    </div>);
}
