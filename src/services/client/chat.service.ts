import { functions } from "@/lib/appwrite";
import { Chat, Message } from "@/types/message";

const FUNCTION_ID = "6a167b6c0020049b4351";

// ── Helper ───────────────────────────────────────────────────────────────────

async function execute<T>(body: Record<string, unknown>): Promise<T> {
  const result = await functions.createExecution(
    FUNCTION_ID,
    JSON.stringify(body)
  );
  return JSON.parse(result.responseBody) as T;
}

// ── Send a message (new or follow-up) ────────────────────────────────────────

interface ChatReply {
  reply: string;
  chatId: string;
}

export async function sendMessage(
  message: string,
  chatId?: string
): Promise<ChatReply> {
  return execute<ChatReply>({
    action: "chat",
    message,
    ...(chatId && { chatId }),
  });
}



export async function getMessages(chatId: string): Promise<Message[]> {
  const data = await execute<{ messages: Message[] }>({
    action: "getMessages",
    chatId,
  });

  return (data.messages ?? []).map((msg) => ({
    id:  msg.id ?? crypto.randomUUID(),
    text: msg.text,
    role: msg.role,
    createdAt: new Date(msg.createdAt),
    updatedAt: msg.updatedAt ? new Date(msg.updatedAt) : undefined,
  }));
}

// ── Fetch all chats ──────────────────────────────────────────────────────────



export async function getChats(): Promise<
  { id: string; title: string; createdAt: Date }[]
> {
  const data = await execute<{ chats: Chat[] }>({
    action: "getChats",
  });

  return data.chats
}
