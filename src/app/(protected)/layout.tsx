"use client"

import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
        
 const ProtectedRoute=({children}:{children:React.ReactNode})=>{
    const router= useRouter();
    const {user}= useUser();
    useEffect(()=>{
         if(!user){
        router.push("/");
    }
    },[user])
  
    return(
        <>
        {children}
        </>
    )
    
}

export default ProtectedRoute;