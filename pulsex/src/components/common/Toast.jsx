import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
export default function Toast() {
    const { toast } = useApp();
    return (<AnimatePresence>
      {toast && (<motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-6 right-6 z-[100] max-w-sm rounded-2xl border border-line bg-surface/90 p-4 shadow-glow backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className={`flex h-2.5 w-2.5 shrink-0 rounded-full ${toast.type === "success"
                ? "bg-pulse shadow-[0_0_10px_#ff7a1a]"
                : toast.type === "error"
                    ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                    : "bg-ink-dim"}`}/>
            <p className="text-sm font-semibold tracking-tight text-ink">
              {toast.message}
            </p>
          </div>
        </motion.div>)}
    </AnimatePresence>);
}
