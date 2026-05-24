import { generateChatResponse } from "@/services/server/chat.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
      const {message}= await req.json();
  const reply= await generateChatResponse(message);
  return NextResponse.json({ success:true, reply });
  } catch (error) {
  return NextResponse.json({ success:false, reply:error });
  }

}
