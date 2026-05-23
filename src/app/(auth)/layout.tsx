"use client"

import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoaderPage from "@/components/LoaderPage"

const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user,loading } = useUser();
   useEffect(()=>{
           if(user && !loading){
          router.push("/dashboard");
      }
      },[user,loading])
    
    return (
        <>
            {
            loading ? <LoaderPage/> : children
        }
        </>
    )

}

export default AuthProtectedRoute;