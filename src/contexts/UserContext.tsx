"use client"
import react, { useEffect, useState } from "react";
import React from "react";
import { Models } from "appwrite";
import { getUser } from "@/services/client/auth.service";


// Interface for User Context
export interface UserContextType {
  user: Models.User<Models.Preferences> | null;
  setUser: React.Dispatch<
    React.SetStateAction<
      Models.User<Models.Preferences> | null
    >
  >;
  loading:boolean;
  setLoading:React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext= react.createContext< UserContextType | null>(null);

export const UserProvider=({children}:{children:React.ReactNode})=>{
    // Global Initital State
const [user,setUser] = useState<Models.User<Models.Preferences> | null>(null)
   // Global Loading State
const [loading,setLoading]= useState<boolean>(true);
   // Fetch User when application initializes in browser

async function fetchUser(){
  try {
    const currentUser= await getUser();
    setLoading(false)
    if(currentUser)
    setUser(currentUser);
  } catch (error) {
    console.log(error);
  }

}
  useEffect(()=>{
    if(!user)
     fetchUser();
  },[user])
    return (
        <UserContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    )
}

