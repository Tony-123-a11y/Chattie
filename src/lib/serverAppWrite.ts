import { Client, Account } from "appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
    // Initializes client to communicate with AppWrite

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const cookieStore = await cookies();

console.log(cookieStore.getAll());
 // Get session from browser's request

  const session = (await cookies()).get(
    `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
  );

   //The cookie will be like a_session_abc123
   //The session from cookies will be {name:a_session_abc123, value:xyz789 }
 console.log(session)
  if (!session) {
    throw new Error("No session");
  }


  // Set AppWrite client headers if  the cookie is found

  client.headers["X-Fallback-Cookies"] =
    `${session.name}=${session.value}`;
 
  return {
    account: new Account(client),  // Get account with the initialized client to communicate with  AppWrite
  };
}