"use client"

import { useUser } from "@/hooks/useUser"
import LoaderPage from "@/components/LoaderPage"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
        
 const ProtectedRoute=({children}:{children:React.ReactNode})=>{
    const router= useRouter();
    const {user,loading}= useUser();
    useEffect(()=>{
         if(!user && loading){
        router.push("/");
    }
    },[user, loading])
  
    return(
        <>
        {
            loading ? <LoaderPage/> : children
        }
        
        </>
    )
    
}

export default ProtectedRoute;