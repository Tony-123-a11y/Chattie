"use client"

import { useUser } from "@/hooks/useUser"
import LoaderPage from "@/components/LoaderPage"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
        
 const ProtectedRoute=({children}:{children:React.ReactNode})=>{
    const router= useRouter();
    const {user,loading}= useUser();
  useEffect(() => {
  if (loading) return;

  if (!user) {
    router.replace("/login");
  }
}, [loading, user]);
  
    if (loading) {
  return <LoaderPage />;
}

if (!user) {
  return <LoaderPage />;
}

return children;
    
    
}

export default ProtectedRoute;