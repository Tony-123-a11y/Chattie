"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, Mic, Send, Copy, ThumbsUp, ThumbsDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "ai" | "user";

interface Message {
  id: number;
  role: Role;
  content: React.ReactNode;
}

// ─── Static avatar image ─────────────────────────────────────────────────────

const USER_AVATAR =
  "https://www.figma.com/api/mcp/asset/1a5ccc6f-b8d3-4533-9fd3-b2fa02dc47e5";

// ─── AI bot icon ─────────────────────────────────────────────────────────────

function BotIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-accent-200 flex items-center justify-center shadow-sm shrink-0">
      <svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5L6 1Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 1L12.75 2.75L14.5 3.5L12.75 4.25L12 6L11.25 4.25L9.5 3.5L11.25 2.75L12 1Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Message action buttons ───────────────────────────────────────────────────

function MessageActions() {
  return (
    <div className="flex items-center gap-1 mt-2">
      <button
        className="p-1 text-border hover:text-text-muted transition-colors"
        title="Copy"
      >
        <Copy size={13} />
      </button>

      <button
        className="p-1 text-border hover:text-text-muted transition-colors"
        title="Good response"
      >
        <ThumbsUp size={13} />
      </button>

      <button
        className="p-1 text-border hover:text-text-muted transition-colors"
        title="Bad response"
      >
        <ThumbsDown size={13} />
      </button>
    </div>
  );
}

// ─── Code block ──────────────────────────────────────────────────────────────

function CodeBlock({ code, lang = "html" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
  <div className="bg-text border border-border/30 rounded-lg overflow-hidden w-full mt-2">

  {/* Header */}
  <div className="bg-primary-900 border-b border-primary-800/50 flex items-center justify-between px-4 py-2">

    <span className="text-primary-200 text-[11px] font-medium tracking-[0.44px] uppercase font-sans">
      {lang}
    </span>

    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-primary-200 text-[11px] font-medium tracking-[0.44px] hover:text-white transition-colors"
    >
      <Copy size={10} />
      {copied ? "Copied!" : "Copy"}
    </button>
  </div>

  {/* Body */}
  <div className="overflow-x-auto p-3">
    <pre className="text-accent-200 text-[13px] font-mono leading-[1.5] whitespace-pre">
      {code}
    </pre>
  </div>
</div>
  );
}

// ─── Initial messages ─────────────────────────────────────────────────────────

const HTML_CODE = `<div class="flex h-[1024px] overflow-hidden" data-stitch-vh="h-[1024px]===h-screen">
    <!-- Fixed Sidebar -->
    <aside class="w-[260px] flex-shrink-0 bg-surface border-r">
        <nav>...</nav>
    </aside>
    
    <!-- Flexible Canvas -->
    <main class="flex-1 overflow-y-auto bg-bg-warm">
        <div class="max-w-4xl mx-auto">...</div>
    </main>
</div>`;

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    content: (
      <p className="text-[15px] text-text leading-[1.6]">
        Hello! I&apos;m AI Architect. I&apos;m ready to help you design and build modern
        user interfaces. What are we working on today?
      </p>
    ),
  },

  {
    id: 2,
    role: "user",
    content: (
      <p className="text-[15px] text-primary-900 leading-[1.6]">
        Can you outline the core layout principles for a dashboard utilizing a
        fixed sidebar and a flexible main canvas?
      </p>
    ),
  },

  {
    id: 3,
    role: "ai",
    content: (
      <div className="space-y-4">

        <p className="text-[15px] text-text leading-[1.6]">
          Certainly. When building a dashboard with a fixed sidebar,
          establishing a solid CSS Grid or Flexbox foundation is crucial.
          Here are the key principles:
        </p>

        <ul className="space-y-2 pl-5 text-text-muted text-[15px] leading-[1.6] list-none">

          <li>
            <span className="font-bold text-text">
              Sidebar Width:
            </span>{" "}
            Keep it fixed (e.g., 260px) to ensure predictable navigation
            space.
          </li>

          <li>
            <span className="font-bold text-text">
              Main Canvas:
            </span>{" "}
            Set it to{" "}
            <code className="bg-bg px-1 rounded text-primary-600 font-mono text-[13px]">
              flex-1
            </code>{" "}
            to consume remaining viewport width.
          </li>

          <li>
            <span className="font-bold text-text">
              Overflow Handling:
            </span>{" "}
            Ensure the main canvas handles vertical scrolling independently
            from the sidebar.
          </li>

        </ul>

        <CodeBlock code={HTML_CODE} lang="html" />
      </div>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: <p className="text-[15px] text-[#26215C] leading-[1.6]">{trimmed}</p>,
    };

    const aiReply: Message = {
      id: Date.now() + 1,
      role: "ai",
      content: (
        <p className="text-[15px] text-[#2C2C2A] leading-[1.6]">
          Thanks for your question! I&apos;m analyzing your request about &ldquo;{trimmed}&rdquo;. Let me put together a detailed response for you.
        </p>
      ),
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
  <div className="relative flex flex-col h-full">

  {/* Chat history */}
  <div className="flex-1 overflow-y-auto px-6 md:px-[150px] py-6">

    <div className="flex flex-col gap-6 max-w-[720px] mx-auto pb-40">

      {messages.map((msg) => (
        <div key={msg.id}>

          {msg.role === "ai" ? (

            <div className="flex gap-4 items-start">

              {/* Bot avatar */}
              <div className="flex flex-col pt-1 shrink-0">
                <BotIcon />
              </div>

              {/* AI Bubble */}
              <div className="flex flex-col gap-2 max-w-[612px]">

                <div className="bg-white border border-surface shadow-sm rounded-tl-[2px] rounded-tr-2xl rounded-b-2xl p-[17px]">
                  {msg.content}
                </div>

                <MessageActions />
              </div>
            </div>

          ) : (

            <div className="flex gap-4 items-start justify-end pl-16">

              {/* User Bubble */}
              <div className="flex flex-col max-w-[612px]">

                <div className="bg-primary-50 border border-primary-200/50 shadow-sm rounded-tl-2xl rounded-tr-[2px] rounded-b-2xl p-[17px]">
                  {msg.content}
                </div>
              </div>

              {/* User avatar */}
              <div className="flex flex-col pt-1 shrink-0">
                <img
                  src={USER_AVATAR}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                />
              </div>
            </div>

          )}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  </div>

  {/* Fixed input area */}
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg/95 to-transparent pt-6 pb-6 px-6 md:px-[150px]">

    <div className="max-w-[720px] mx-auto flex flex-col gap-2">

      {/* Input box */}
      <div className="bg-white border border-surface rounded-xl shadow-sm overflow-hidden">

        <div className="flex items-end px-2 py-1">

          {/* Attach */}
          <button className="p-2 text-text-muted hover:text-text transition-colors rounded-full shrink-0">
            <Paperclip size={17} />
          </button>

          {/* Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Architect..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-3 text-[15px] text-text placeholder:text-text-muted outline-none min-h-[48px] max-h-[120px] overflow-y-auto leading-[1.6] font-sans"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />

          {/* Right actions */}
          <div className="flex items-center gap-1 px-2 pb-1 shrink-0">

            <button className="p-2 text-text-muted hover:text-text transition-colors rounded-full">
              <Mic size={16} />
            </button>

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-primary-800 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-text-muted tracking-[0.44px] font-medium font-sans">
        AI Architect can make mistakes. Consider verifying critical information.
      </p>
    </div>
  </div>
</div>
  );
}