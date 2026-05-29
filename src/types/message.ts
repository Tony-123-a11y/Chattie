
export interface Message{
    chatId?:string;
    id:string;
    text:string;
    role: "user" | "gemini";
    createdAt: Date;
    updatedAt?:Date;
}

export interface Chat <T>{
    id:string;
    title:string;
    createdAt:Date;
}