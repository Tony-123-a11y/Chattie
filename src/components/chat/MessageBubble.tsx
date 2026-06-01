"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Message } from "@/types/message";

interface MessageBubbleProps {
  message: Message;
  /** When true the bubble plays a shimmer/glow animation (awaiting reply). */
  isPending?: boolean;
  /** Called with the message text when the user clicks Retry. */
  onRetry?: (text: string) => void;
}

export default function MessageBubble({
  message,
  isPending = false,
  onRetry,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback — silently ignore
    }
  };

  // ── User bubble ────────────────────────────────────────────────────────────
  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end mt-8 group/user">
        {/* Keyframes live here so we avoid touching global CSS */}
        {isPending && (
          <style>{`
            @keyframes pending-glow {
              0%   { background-position: 0% 50%; box-shadow: 0 0 0px transparent; }
              50%  { background-position: 100% 50%; box-shadow: 0 0 18px 4px rgba(99,102,241,0.45); }
              100% { background-position: 0% 50%; box-shadow: 0 0 0px transparent; }
            }
            .bubble-pending {
              background: linear-gradient(
                270deg,
                #e0e7ff,
                #c7d2fe,
                #818cf8,
                #c7d2fe,
                #e0e7ff
              );
              background-size: 300% 300%;
              animation: pending-glow 2s ease-in-out infinite;
              color: #312e81;
            }
          `}</style>
        )}

        {/* Bubble */}
        <div
          className={`
            ml-auto max-w-[66%] rounded-2xl rounded-tr-none
            px-4 py-3 shadow-sm overflow-x-auto transition-all duration-300
            ${
              isPending
                ? "bubble-pending border border-indigo-300"
                : "bg-primary-50 border border-primary-200 text-primary-900"
            }
          `}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>

        {/* Action bar — hidden by default, slides in on group hover */}
        {!isPending && (
          <div
            className="
              flex items-center gap-0.5 mt-1.5 mr-1
              opacity-0 translate-y-1
              group-hover/user:opacity-100 group-hover/user:translate-y-0
              transition-all duration-200 ease-out
            "
          >
            <ActionButton
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy"}
            >
              {copied ? (
                <Check size={13} className="text-emerald-500" />
              ) : (
                <Copy size={13} />
              )}
            </ActionButton>

            {onRetry && (
              <ActionButton
                onClick={() => onRetry(message.text)}
                title="Retry"
              >
                <RotateCcw size={13} />
              </ActionButton>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── AI bubble ──────────────────────────────────────────────────────────────
  return (
    <div className="mt-8 group/ai">
      <div
        className="relative prose
          max-w-none
          prose-p:my-2
          prose-pre:bg-gray-100
          prose-code:text-accent-600"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
      </div>

      {/* Action bar */}
      <div
        className="
          flex items-center gap-0.5 mt-1.5 ml-1
          opacity-0 translate-y-1
          group-hover/ai:opacity-100 group-hover/ai:translate-y-0
          transition-all duration-200 ease-out
        "
      >
        <ActionButton
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy"}
        >
          {copied ? (
            <Check size={13} className="text-emerald-500" />
          ) : (
            <Copy size={13} />
          )}
        </ActionButton>
      </div>
    </div>
  );
}

// ── Shared tiny icon button ────────────────────────────────────────────────

function ActionButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="
        p-1.5 rounded-md
        text-text-muted hover:text-text hover:bg-surface/70
        transition-colors duration-150
      "
    >
      {children}
    </button>
  );
}
