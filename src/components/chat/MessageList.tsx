import { Message } from "@/types/message";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  onRetry: (text: string) => void;
}

export default function MessageList({
  messages,
  loading,
  onRetry,
}: MessageListProps) {
  // Index of the last message that was sent by the user
  const lastUserIndex = messages.reduceRight(
    (found, msg, idx) => (found === -1 && msg.role === "user" ? idx : found),
    -1
  );

  return (
    <>
      {messages.map((message, idx) => (
        <div key={message.id}>
          <MessageBubble
            message={message}
            isPending={loading && idx === lastUserIndex}
            onRetry={message.role === "user" ? onRetry : undefined}
          />
        </div>
      ))}
    </>
  );
}
