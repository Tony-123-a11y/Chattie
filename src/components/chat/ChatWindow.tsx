"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Bell, LoaderPinwheel, MoreVertical } from "lucide-react";
import { Message } from "@/types/message";
import { sendMessage, getMessages } from "@/services/client/chat.service";
import { useRouter } from "next/navigation";

import EmptyChat from "./EmptyChat";
import MessageList from "./MessageList";
import ChatInput, { ChatInputHandle } from "./ChatInput";

// ── ChatWindow ───────────────────────────────────────────────────────────────

interface ChatWindowProps {
  chatId?: string;
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!chatId);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatInputRef = useRef<ChatInputHandle>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Whether to show the welcome/suggestions screen
  const showEmptyChat = !chatId && messages.length === 0;

  // ── Fetch existing messages when chatId is provided ─────────────────────

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const loaded = await getMessages(chatId);
        setMessages(loaded);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // ── Auto-scroll to bottom on new messages ───────────────────────────────

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ── Suggestion click handler ────────────────────────────────────────────

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    chatInputRef.current?.focus();
  };

  // ── Retry a user message ────────────────────────────────────────────────

  const handleRetry = async (text: string) => {
    if (loading) return;
    setInput(text);
    // Use a tiny timeout so the state flush happens before handleSend reads `input`
    await new Promise((r) => setTimeout(r, 0));
    setInput(text); // ensure it's set
    // Manually trigger send with the retry text
    const messageText = text;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: messageText,
        role: "user",
        createdAt: new Date(),
      },
    ]);
    setLoading(true);
    setInput("");
    chatInputRef.current?.resetHeight();
    try {
      const reply = await sendMessage(messageText, chatId);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: reply.reply,
          role: "gemini",
          createdAt: new Date(),
        },
      ]);
      if (!chatId) {
        router.push(`/dashboard/chat/${reply.chatId}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ── Send message ────────────────────────────────────────────────────────

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageText = input;

    // Show message locally
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: messageText,
        role: "user",
        createdAt: new Date(),
      },
    ]);

    // Show loading
    setLoading(true);

    // Empty input field
    setInput("");

    // Reset input height
    chatInputRef.current?.resetHeight();

    try {
      // Call backend — include chatId if we're in an existing conversation
      const reply = await sendMessage(messageText, chatId);
   
      // Stop loading
      setLoading(false);

      // Show reply locally
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: reply.reply,
          role: "gemini",
          createdAt: new Date(),
        },
      ]);

      // If this was a new chat, navigate to the chat page
      if (!chatId) {
        router.push(`/dashboard/chat/${reply.chatId}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <div className="shrink-0 sticky max-lg:hidden top-0 bg-card/95 z-10 w-full flex items-center justify-between px-4 md:px-6 py-4 border-b border-surface backdrop-blur-sm">
        <span className="text-[11px]  font-semibold text-primary-600 tracking-[0.55px] uppercase">
        Gemini-X.X-Flash
        </span>

      
      </div>

      {/* Main content */}
      <div className="min-h-screen  relative ">
        <div className="w-full h-full overflow-y-scroll scrollbar-primary pt-4 pb-4 gap-8">
          <div className="max-w-3xl mx-auto relative pb-24 pt-18   px-4 md:px-6">
            {/* Loading state while fetching existing messages */}
            {fetching ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20">
                <LoaderPinwheel
                  className="animate-spin text-primary-600"
                  size={28}
                />
                <p className="text-sm text-text-muted">
                  Loading conversation…
                </p>
              </div>
            ) : (
              <>
                {/* Welcome screen when no chatId and no messages */}
                {showEmptyChat && (
                  <EmptyChat onSuggestion={handleSuggestion} />
                )}

                {/* Messages */}
                <MessageList messages={messages} loading={loading} onRetry={handleRetry} />
              </>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput
          ref={chatInputRef}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
        />

        {/* Disclaimer */}
        <p className="text-[11px] text-border text-center tracking-[0.22px]">
          Chattie can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
