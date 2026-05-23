"use client"

import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoaderPage from "@/components/LoaderPage"

const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user,loading } = useUser();
     useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoaderPage />;
  }

  if (user) {
    return <LoaderPage />; // keep showing loader while redirecting
  }

  return <>{children}</>;
    

}

export default AuthProtectedRoute;