"use client";

import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";

export function loginWithGoogle() {
    
  account.createOAuth2Session(
    OAuthProvider.Google,
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard`,
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/login`
  );
}