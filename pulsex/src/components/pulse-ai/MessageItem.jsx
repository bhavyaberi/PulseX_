import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Info, Lightbulb, AlertTriangle, RefreshCw } from "lucide-react";
import { formatTimestamp } from "./utils";
export default function MessageItem({ message, onRetry }) {
    const navigate = useNavigate();
    const isUser = message.sender === "user";
    // Parse inline markdown elements: **bold** and [label](url)
    const parseInline = (text) => {
        // Matches **bold** or [label](url)
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
        const parts = text.split(regex);
        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (<strong key={index} className="font-bold text-ink">
            {part.slice(2, -2)}
          </strong>);
            }
            if (part.startsWith("[") && part.includes("](")) {
                const closeBracket = part.indexOf("](");
                const label = part.slice(1, closeBracket);
                const url = part.slice(closeBracket + 2, -1);
                // Check if it's an internal file:/// or standard dashboard path
                if (url.startsWith("file:///dashboard") || url.startsWith("/dashboard")) {
                    const route = url.replace("file://", "");
                    return (<button key={index} onClick={() => navigate(route)} className="text-pulse hover:text-pulse-soft font-semibold underline decoration-pulse/30 hover:decoration-pulse transition-all cursor-pointer inline-block align-baseline">
              {label}
            </button>);
                }
                // External link fallback
                return (<a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-pulse hover:text-pulse-soft font-semibold underline transition-colors">
            {label}
          </a>);
            }
            return part;
        });
    };
    // Parse block markdown elements: head, lists, blockquotes, alerts
    const parseBlocks = (text) => {
        const lines = text.split("\n");
        const elements = [];
        let currentList = null;
        let currentQuote = null;
        const flushList = (key) => {
            if (currentList) {
                const Tag = currentList.type;
                elements.push(<Tag key={`list-${key}`} className={currentList.type === "ul"
                        ? "list-disc pl-5 my-2 space-y-1 text-sm text-ink-dim"
                        : "list-decimal pl-5 my-2 space-y-1 text-sm text-ink-dim"}>
            {currentList.items.map((item, i) => (<li key={i}>{parseInline(item)}</li>))}
          </Tag>);
                currentList = null;
            }
        };
        const flushQuote = (key) => {
            if (currentQuote) {
                const quoteText = currentQuote.lines.join(" ");
                const type = currentQuote.type;
                let borderClass = "border-l-2 border-line-strong pl-3 text-ink-dim italic";
                let bgClass = "bg-ink/[0.01]";
                let icon = null;
                let title = "";
                if (type === "note") {
                    borderClass = "border-l-2 border-blue-500 pl-3";
                    bgClass = "bg-blue-500/5 p-3 rounded-r-xl border border-line border-l-0";
                    icon = <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5"/>;
                    title = "Note";
                }
                else if (type === "tip") {
                    borderClass = "border-l-2 border-pulse pl-3";
                    bgClass = "bg-pulse/5 p-3 rounded-r-xl border border-line border-l-0";
                    icon = <Lightbulb className="h-4 w-4 text-pulse shrink-0 mt-0.5"/>;
                    title = "Tip";
                }
                else if (type === "important") {
                    borderClass = "border-l-2 border-red-500 pl-3";
                    bgClass = "bg-red-500/5 p-3 rounded-r-xl border border-line border-l-0";
                    icon = <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5"/>;
                    title = "Important";
                }
                elements.push(<div key={`quote-${key}`} className={`my-3 ${bgClass} ${borderClass} flex gap-2 items-start`}>
            {icon}
            <div className="text-sm leading-relaxed text-ink-dim">
              {title && <span className="font-semibold text-ink block mb-0.5">{title}</span>}
              {parseInline(quoteText)}
            </div>
          </div>);
                currentQuote = null;
            }
        };
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            // 1. Headings
            if (trimmed.startsWith("### ")) {
                flushList(i);
                flushQuote(i);
                elements.push(<h4 key={i} className="text-sm font-bold text-ink mt-3 mb-1.5 tracking-tight">
            {parseInline(trimmed.slice(4))}
          </h4>);
                continue;
            }
            if (trimmed.startsWith("## ")) {
                flushList(i);
                flushQuote(i);
                elements.push(<h3 key={i} className="text-base font-bold text-ink mt-4 mb-2 tracking-tight">
            {parseInline(trimmed.slice(3))}
          </h3>);
                continue;
            }
            // 2. Blockquotes / Alerts
            if (trimmed.startsWith("> ")) {
                flushList(i);
                const content = trimmed.slice(2).trim();
                if (content.startsWith("[!NOTE]")) {
                    flushQuote(i);
                    currentQuote = { type: "note", lines: [] };
                }
                else if (content.startsWith("[!TIP]")) {
                    flushQuote(i);
                    currentQuote = { type: "tip", lines: [] };
                }
                else if (content.startsWith("[!IMPORTANT]")) {
                    flushQuote(i);
                    currentQuote = { type: "important", lines: [] };
                }
                else {
                    if (!currentQuote) {
                        currentQuote = { type: "quote", lines: [content] };
                    }
                    else {
                        currentQuote.lines.push(content);
                    }
                }
                continue;
            }
            // 3. Unordered Lists
            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                flushQuote(i);
                const content = trimmed.slice(2);
                if (!currentList || currentList.type !== "ul") {
                    flushList(i);
                    currentList = { type: "ul", items: [content] };
                }
                else {
                    currentList.items.push(content);
                }
                continue;
            }
            // 4. Ordered Lists
            const matchOrdered = trimmed.match(/^(\d+)\.\s+(.*)/);
            if (matchOrdered) {
                flushQuote(i);
                const content = matchOrdered[2];
                if (!currentList || currentList.type !== "ol") {
                    flushList(i);
                    currentList = { type: "ol", items: [content] };
                }
                else {
                    currentList.items.push(content);
                }
                continue;
            }
            // 5. Empty line breaks
            if (trimmed === "") {
                flushList(i);
                flushQuote(i);
                continue;
            }
            // 6. Paragraphs
            flushList(i);
            if (currentQuote) {
                currentQuote.lines.push(trimmed);
            }
            else {
                elements.push(<p key={i} className="text-sm text-ink-dim leading-relaxed mb-2">
            {parseInline(trimmed)}
          </p>);
            }
        }
        // Flush any leftover elements
        flushList(lines.length);
        flushQuote(lines.length);
        return <div className="space-y-1">{elements}</div>;
    };
    if (message.isError) {
        return (<div className="flex w-full mb-4 gap-3 justify-start">
        {/* Warning Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 border border-red-500/35 text-red-400 select-none">
          <AlertTriangle className="h-4.5 w-4.5"/>
        </div>

        {/* Bubble Content */}
        <div className="flex flex-col max-w-[82%]">
          <div className="rounded-2xl rounded-tl-none border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-red-200/90 shadow-surface flex flex-col gap-2.5">
            <p className="leading-relaxed text-sm">{message.text}</p>
            {message.retryText && onRetry && (<button type="button" onClick={() => onRetry(message.retryText)} className="self-start flex items-center gap-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/35 px-3 py-1.5 text-xs font-semibold text-red-300 active:scale-95 transition-all cursor-pointer">
                <RefreshCw className="h-3.5 w-3.5"/>
                <span>Retry sending</span>
              </button>)}
          </div>

          {/* Timestamp */}
          <span className="text-[10px] mt-1.5 px-1 text-ink-faint text-left">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>);
    }
    return (<div className={`flex w-full mb-4 gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Bot Icon */}
      {!isUser && (<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-pulse to-pulse-soft text-void shadow-glow select-none">
          <Sparkles className="h-4.5 w-4.5 animate-pulse-glow text-void"/>
        </div>)}

      {/* Bubble Content */}
      <div className={`flex flex-col max-w-[82%]`}>
        <div className={`rounded-2xl px-4 py-3 text-sm shadow-surface ${isUser
            ? "bg-surface-3 border border-line-strong text-ink rounded-tr-none"
            : "bg-surface border border-line text-ink-dim rounded-tl-none"}`}>
          {isUser ? (<p className="whitespace-pre-wrap leading-relaxed text-ink text-sm">{message.text}</p>) : (parseBlocks(message.text))}
        </div>

        {/* Timestamp */}
        <span className={`text-[10px] mt-1.5 px-1 text-ink-faint ${isUser ? "text-right" : "text-left"}`}>
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>);
}
