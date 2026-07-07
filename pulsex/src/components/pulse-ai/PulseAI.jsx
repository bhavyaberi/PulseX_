import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { generateAIResponse } from "./api";
import { loadChatHistory, saveChatHistory, clearChatHistory } from "./utils";
import { useApp } from "../../context/AppContext";
export default function PulseAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useApp();
    // Load chat history from sessionStorage on mount
    useEffect(() => {
        const saved = loadChatHistory();
        if (saved.length > 0) {
            setHistory(saved);
        }
    }, []);
    const sendMessageWithHistory = async (text, currentHistory) => {
        // 1. Create and append user message
        const userMessage = {
            id: `msg-${Date.now()}-user`,
            sender: "user",
            text,
            timestamp: new Date().toISOString(),
        };
        const updatedHistory = [...currentHistory, userMessage];
        setHistory(updatedHistory);
        saveChatHistory(updatedHistory);
        setIsLoading(true);
        try {
            // 2. Fetch response from API Service (handles local secure backend /api/chat)
            const aiResponseText = await generateAIResponse(text, currentHistory);
            // 3. Create and append assistant message
            const assistantMessage = {
                id: `msg-${Date.now()}-ai`,
                sender: "assistant",
                text: aiResponseText,
                timestamp: new Date().toISOString(),
            };
            const finalHistory = [...updatedHistory, assistantMessage];
            setHistory(finalHistory);
            saveChatHistory(finalHistory);
        }
        catch (error) {
            if (error.name === "AbortError") {
                return; // Request was aborted due to another message sending, do nothing
            }
            console.error("Pulse AI response error:", error);
            // Translate errors to user-friendly messages as requested
            let errorText = "Unable to connect to the AI service. Please try again later.";
            if (error.message === "RATE_LIMIT_EXCEEDED") {
                errorText = "Pulse AI is currently experiencing high demand. Please try again in a few moments.";
            }
            // 4. Create and append user-friendly error message with retry context
            const errorMessage = {
                id: `msg-${Date.now()}-err`,
                sender: "assistant",
                text: errorText,
                timestamp: new Date().toISOString(),
                isError: true,
                retryText: text,
            };
            const finalHistory = [...updatedHistory, errorMessage];
            setHistory(finalHistory);
            saveChatHistory(finalHistory);
            showToast("Pulse AI request failed", "error");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSendMessage = async (text) => {
        await sendMessageWithHistory(text, history);
    };
    const handleRetry = async (retryText) => {
        // Clean up error bubbles and the failed message from visible history
        const filteredHistory = history.filter((msg) => msg.retryText !== retryText && !msg.isError);
        setHistory(filteredHistory);
        saveChatHistory(filteredHistory);
        await sendMessageWithHistory(retryText, filteredHistory);
    };
    const handleClearHistory = () => {
        clearChatHistory();
        setHistory([]);
        showToast("Chat history cleared", "success");
    };
    return (<>
      {/* Floating Action Button (Only show when chat is not open) */}
      {!isOpen && (<button onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
            }} className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 rounded-full bg-pulse px-5 py-4 text-void font-bold shadow-glow hover:shadow-glow-lg hover:bg-pulse-soft hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer group" title="Open Pulse AI Assistant">
          <Sparkles className="h-5 w-5 text-void animate-pulse-glow group-hover:scale-110 transition-transform"/>
          <span className="text-sm font-semibold tracking-tight text-void select-none">Pulse AI</span>
        </button>)}

      {/* Chat Window Panel */}
      <ChatWindow isOpen={isOpen} isMinimized={isMinimized} onClose={() => {
            setIsOpen(false);
            setIsMinimized(false);
        }} onMinimize={() => setIsMinimized(true)} onRestore={() => setIsMinimized(false)} history={history} onSendMessage={handleSendMessage} onClearHistory={handleClearHistory} isLoading={isLoading} onRetry={handleRetry}/>
    </>);
}
