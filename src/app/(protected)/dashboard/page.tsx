"use client";

import { useState, useRef } from "react";
import {
  Code2,
  PenLine,
  Lightbulb,
  Paperclip,
  Mic,
  Image,
  ArrowUp,
  Bell,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import { functions } from "@/lib/appwrite";

// ── Suggestion cards data ─────────────────────────────────────────────────────

const suggestions = [
  {
    id: 1,
    icon: Code2,
    label: "Review code",
    sublabel: "Analyze Python snippets",
    prompt: "Review my Python code and suggest improvements.",
  },
  {
    id: 2,
    icon: PenLine,
    label: "Draft email",
    sublabel: "Professional tone for leads",
    prompt: "Draft a professional sales email for a SaaS lead.",
  },
  {
    id: 3,
    icon: Lightbulb,
    label: "Brainstorm",
    sublabel: "Marketing ideas for SaaS",
    prompt: "Brainstorm marketing ideas for a SaaS product.",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NewChatPage() {
  const [input, setInput] = useState("");
  const [reply,setReply]= useState(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async() => {
    if (!input.trim()) return;
    console.log(input)
    try {
   
const result = await functions.createExecution(
  '6a167b6c0020049b4351',
  JSON.stringify({ action:"chat",message: input }), // body (optional)
);

const reply=(JSON.parse(result.responseBody).reply.candidates[0].content.parts[0].text)
setReply(reply)

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch (error) {
      console.log(error)
    }
 
  };

  return (
  <div className="relative flex flex-col h-full bg-bg overflow-hidden font-sans">

  {/* Background sparkles */}
  <div className="pointer-events-none absolute bottom-0 right-0 select-none">
    <svg
      width="300"
      height="260"
      viewBox="0 0 300 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-[0.07]"
    >
      <path
        d="M210 60 L222 90 L252 102 L222 114 L210 144 L198 114 L168 102 L198 90 Z"
        fill="currentColor"
        className="text-primary-600"
      />
      <path
        d="M260 130 L268 150 L288 158 L268 166 L260 186 L252 166 L232 158 L252 150 Z"
        fill="currentColor"
        className="text-primary-600"
      />
      <path
        d="M170 150 L176 166 L192 172 L176 178 L170 194 L164 178 L148 172 L164 166 Z"
        fill="currentColor"
        className="text-primary-600"
      />
    </svg>
  </div>

  {/* Top bar */}
  <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-surface bg-bg/80 backdrop-blur-sm">
    <span className="text-[11px] font-semibold text-primary-600 tracking-[0.55px] uppercase">
      GPT-4 OMNI
    </span>

    <div className="flex items-center gap-2 text-text-muted">
      <button className="p-1.5 rounded-lg hover:bg-surface/50 transition-colors">
        <Bell size={18} />
      </button>

      <button className="p-1.5 rounded-lg hover:bg-surface/50 transition-colors">
        <MoreVertical size={18} />
      </button>
    </div>
  </div>

  {/* Main content */}
  <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-10">
    <div className="w-full max-w-[600px] flex flex-col items-center gap-8">

      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">

        <div className="w-14 h-14 rounded-2xl bg-white border border-surface shadow-sm flex items-center justify-center">
          <Sparkles size={24} className="text-primary-600" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-text tracking-tight leading-tight">
            New Chat
          </h1>

          <p className="text-[15px] text-text-muted leading-[1.6] max-w-[340px]">
            Start a conversation with Chattie. Ask anything from technical
            analysis to creative writing.
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {suggestions.map(({ id, icon: Icon, label, sublabel, prompt }) => (
          <button
            key={id}
            onClick={() => handleSuggestion(prompt)}
            className="group bg-white border border-surface rounded-2xl p-4 text-left hover:border-primary-200 hover:shadow-md transition-all duration-200 flex flex-col gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-600/10 transition-colors">
              <Icon size={16} className="text-primary-600" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-semibold text-text leading-snug">
                {label}
              </span>

              <span className="text-[12px] text-text-muted">
                {sublabel}
              </span>
            </div>
          </button>
        ))}
      </div>

      {reply && <div>{reply}</div>}

      {/* Input */}
      <div className="w-full bg-white border border-surface rounded-2xl shadow-sm overflow-hidden focus-within:border-primary-200 focus-within:shadow-md transition-all duration-200">

        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message Chattie..."
          rows={1}
          className="w-full resize-none bg-transparent px-5 pt-4 pb-2 text-[15px] text-text placeholder:text-border outline-none leading-[1.6] font-sans min-h-[52px] max-h-[160px] overflow-y-auto"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1">

          <div className="flex items-center gap-1">

            <button className="p-2 rounded-lg text-border hover:text-text-muted hover:bg-bg transition-colors">
              <Paperclip size={17} />
            </button>

            <button className="p-2 rounded-lg text-border hover:text-text-muted hover:bg-bg transition-colors">
              <Mic size={17} />
            </button>

            <button className="p-2 rounded-lg text-border hover:text-text-muted hover:bg-bg transition-colors">
              <Image size={17} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-primary-800 hover:bg-primary-600 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <ArrowUp size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-border text-center tracking-[0.22px]">
        Chattie can make mistakes. Check important info.
      </p>

    </div>
  </div>
</div>
  );
}