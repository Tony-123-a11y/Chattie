import { createSessionClient } from "@/lib/serverAppWrite";

// This function act as the middleware to check the current session on appclient. It will called before each route.ts

export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch {
    return null;
  }
}