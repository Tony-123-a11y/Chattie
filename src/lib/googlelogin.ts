"use client";

import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";

export function loginWithGoogle() {
    
  account.createOAuth2Session(
    OAuthProvider.Google,
    "http://localhost:3000",
    "http://localhost:3000/auth/login"
  );
}