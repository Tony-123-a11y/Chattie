import { LoaderPinwheel } from "lucide-react";
import { Message } from "@/types/message";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

export default function MessageList({ messages, loading }: MessageListProps) {
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <MessageBubble message={message} />
        </div>
      ))}

      {loading && (
        <LoaderPinwheel className="animate-spin absolute text-primary-800 -bottom-10 right-0" />
      )}
    </>
  );
}
