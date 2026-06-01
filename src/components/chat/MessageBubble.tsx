import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "@/types/message";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="bg-primary-50 overflow-x-auto ml-auto mt-8 border-primary-200 max-w-2/3 text-primary-900 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.text}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div
      className="relative prose
  max-w-none
  prose-p:my-2
  prose-pre:bg-gray-100
  prose-code:text-accent-600"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.text}
      </ReactMarkdown>
    </div>
  );
}
