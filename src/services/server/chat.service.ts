import { ai } from "@/lib/gemini";

export async function generateChatResponse(message: string) {
  console.log("message at generate repsonse:",message)
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
  });

  return response.text;
}