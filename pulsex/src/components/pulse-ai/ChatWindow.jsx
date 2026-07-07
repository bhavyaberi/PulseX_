import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Minus, Send, RefreshCw, Maximize2 } from "lucide-react";
import MessageItem from "./MessageItem";
export default function ChatWindow({ isOpen, isMinimized, onClose, onMinimize, onRestore, history, onSendMessage, onClearHistory, isLoading, onRetry, }) {
    const [inputText, setInputText] = useState("");
    const scrollContainerRef = useRef(null);
    const inputRef = useRef(null);
    // Auto-scroll to latest message
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [history, isLoading, isMinimized, isOpen]);
    // Focus input when chat window is opened and not minimized
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, isMinimized]);
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading)
            return;
        onSendMessage(inputText.trim());
        setInputText("");
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    // If minimized, render a sleek small bar at the bottom right
    if (isMinimized) {
        return (<div className="fixed bottom-6 right-6 z-[95] flex w-[280px] md:w-[320px] items-center justify-between rounded-xl border border-line bg-surface/95 p-3.5 shadow-glow backdrop-blur-2xl transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-pulse to-pulse-soft text-void shadow-glow">
            <Sparkles className="h-3.5 w-3.5 text-void animate-pulse-glow"/>
          </div>
          <div>
            <h4 className="text-xs font-bold text-ink leading-none">Pulse AI</h4>
            <span className="text-[9px] text-pulse font-semibold uppercase tracking-wider">Coach Minimized</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRestore} className="rounded-md p-1.5 text-ink-dim hover:bg-ink/[0.06] hover:text-ink transition-colors cursor-pointer" title="Maximize Chat">
            <Maximize2 className="h-3.5 w-3.5"/>
          </button>
          <button onClick={onClose} className="rounded-md p-1.5 text-ink-dim hover:bg-ink/[0.06] hover:text-ink transition-colors cursor-pointer" title="Close Chat">
            <X className="h-3.5 w-3.5"/>
          </button>
        </div>
      </div>);
    }
    return (<div className="fixed bottom-6 right-6 z-[95] flex h-[550px] max-h-[calc(100vh-100px)] w-[calc(100%-2rem)] max-w-full flex-col rounded-2xl border border-line bg-surface/95 shadow-glow-lg backdrop-blur-2xl transition-all duration-300 sm:right-6 md:w-[380px] left-4 md:left-auto">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-pulse to-pulse-soft text-void shadow-glow">
            <Sparkles className="h-4.5 w-4.5 text-void animate-pulse-glow"/>
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink leading-none">Pulse AI</h3>
            <span className="text-[10px] text-ink-dim mt-0.5 block flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"/>
              AI Fitness Coach
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          {history.length > 0 && (<button onClick={onClearHistory} className="rounded-md p-1.5 text-ink-dim hover:bg-ink/[0.06] hover:text-ink transition-colors cursor-pointer" title="Reset Conversation">
              <RefreshCw className="h-3.5 w-3.5"/>
            </button>)}
          <button onClick={onMinimize} className="rounded-md p-1.5 text-ink-dim hover:bg-ink/[0.06] hover:text-ink transition-colors cursor-pointer" title="Minimize Chat">
            <Minus className="h-3.5 w-3.5"/>
          </button>
          <button onClick={onClose} className="rounded-md p-1.5 text-ink-dim hover:bg-ink/[0.06] hover:text-ink transition-colors cursor-pointer" title="Close Chat">
            <X className="h-3.5 w-3.5"/>
          </button>
        </div>
      </div>

      {/* Message List */}
      <div ref={scrollContainerRef} data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-line scrollbar-track-transparent">
        {/* Welcome Message (If history is empty) */}
        {history.length === 0 && (<div className="flex w-full mb-4 gap-3 justify-start">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pulse to-pulse-soft text-void shadow-glow select-none">
              <Sparkles className="h-4.5 w-4.5 text-void animate-pulse-glow"/>
            </div>
            <div className="flex flex-col max-w-[82%]">
              <div className="rounded-2xl rounded-tl-none bg-surface border border-line px-4 py-3 text-sm text-ink-dim shadow-surface">
                <p className="text-sm text-ink-dim leading-relaxed mb-2">
                  Hello! I am <strong className="font-bold text-ink">Pulse AI</strong>, your virtual fitness coach.
                </p>
                <p className="text-sm text-ink-dim leading-relaxed mb-2">
                  I can help you design custom workouts, calculate macronutrients, optimize meal plans, and guide you on your health and wellness journey.
                </p>
                <p className="text-sm text-ink-dim leading-relaxed mb-2">
                  <strong>Here is what you can ask me about:</strong>
                </p>
                <ul className="list-disc pl-5 mb-2 space-y-1 text-sm text-ink-dim">
                  <li>🏋️ <strong>Workout plans</strong> (gym or home)</li>
                  <li>🥗 <strong>Meal plans & nutrition</strong> (macros/diet)</li>
                  <li>📉 <strong>Weight loss</strong> or muscle gain advice</li>
                  <li>💊 <strong>Supplement</strong> info & safety</li>
                  <li>😴 <strong>Recovery</strong> & sleep optimization</li>
                </ul>
                <p className="text-sm text-ink-dim leading-relaxed">
                  What is your primary fitness goal today?
                </p>
              </div>
              <span className="text-[10px] mt-1.5 px-1 text-ink-faint text-left">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>)}

        {/* Chat History */}
        {history.map((msg) => (<MessageItem key={msg.id} message={msg} onRetry={onRetry}/>))}

        {/* Loading Indicator */}
        {isLoading && (<div className="flex w-full mb-4 gap-3 justify-start">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pulse to-pulse-soft text-void shadow-glow">
              <Sparkles className="h-4.5 w-4.5 text-void animate-pulse-glow"/>
            </div>
            <div className="bg-surface border border-line rounded-2xl rounded-tl-none px-4 py-3 text-ink-dim shadow-surface">
              <div className="flex items-center gap-1.5 py-1">
                <span className="h-2 w-2 rounded-full bg-pulse animate-bounce" style={{ animationDelay: "0ms" }}/>
                <span className="h-2 w-2 rounded-full bg-pulse animate-bounce" style={{ animationDelay: "200ms" }}/>
                <span className="h-2 w-2 rounded-full bg-pulse animate-bounce" style={{ animationDelay: "400ms" }}/>
              </div>
            </div>
          </div>)}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-line p-3.5 bg-surface/40">
        <div className="relative flex items-center">
          <input ref={inputRef} type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} placeholder={isLoading ? "Generating response..." : "Ask Pulse AI about fitness, diets..."} disabled={isLoading} className="w-full rounded-xl border border-line bg-surface-3/80 py-3 pl-4 pr-12 text-sm text-ink placeholder-ink-faint focus:border-pulse focus:outline-none focus:ring-1 focus:ring-pulse/30 disabled:opacity-40 transition-colors"/>
          <button type="submit" disabled={!inputText.trim() || isLoading} className="absolute right-3.5 text-pulse hover:text-pulse-soft disabled:text-ink-faint disabled:opacity-40 transition-colors cursor-pointer" title="Send Message">
            <Send className="h-4.5 w-4.5"/>
          </button>
        </div>
        <p className="text-[10px] text-center text-ink-faint mt-2">
          Pulse AI provides helpful fitness guidance. Consult a doctor for medical advice.
        </p>
      </form>
    </div>);
}
