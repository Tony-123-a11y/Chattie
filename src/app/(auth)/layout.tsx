"use client"

import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user } = useUser();
   useEffect(()=>{
           if(user){
          router.push("/dashboard");
      }
      },[user])
    
    return (
        <>
            {children}
        </>
    )

}

export default AuthProtectedRoute;