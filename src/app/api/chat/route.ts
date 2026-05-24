import { generateChatResponse } from "@/services/server/chat.service";
import { getCurrentUser } from "@/services/server/current.user";
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    console.log(user)
    if (!user) {
      return Response.json({status:401, message:"Unauthorized"});
}
    const { message } = await req.json();
    const reply = await generateChatResponse(message);
    return Response.json({ success: true, reply });
  } catch (error) {
    return Response.json({ success: false, reply: error });
  }
}


