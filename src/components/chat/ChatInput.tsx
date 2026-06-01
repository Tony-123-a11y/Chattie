import { useRef, useImperativeHandle, forwardRef } from "react";
import { Paperclip, Mic, Image, ArrowUp } from "lucide-react";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export interface ChatInputHandle {
  focus: () => void;
  resetHeight: () => void;
}

const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(
  ({ input, onInputChange, onSend }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      resetHeight: () =>
        textareaRef.current?.style.setProperty("height", "auto"),
    }));

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onInputChange(e.target.value);
      const el = e.target;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    return (
      <div className="w-full bg-white absolute left-1/2 -translate-x-1/2 bottom-16 max-w-3xl m-auto border-surface border rounded-2xl shadow-sm overflow-hidden focus-within:border-primary-200 focus-within:shadow-md transition-all duration-200">
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
            onClick={onSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-primary-800 hover:bg-primary-600 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <ArrowUp size={16} className="text-white" />
          </button>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
