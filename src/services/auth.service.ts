import { ID } from "appwrite";
import { account } from "@/lib/appwrite";

type SignupData={
    name:string,
    email:string,
    password:string
}

export async function signupUser({name,email,password}:SignupData){
    try{
      //create user

      const newUser= await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      //Automatically log user in after signup

     return {
        success:true,
        data:newUser,
     }
    }catch(error:any){
        return {
            success:false,
            error:error?.message  || "Signup failed",
        };
    }
}