import { AppwriteException, ID } from "appwrite";
import { account } from "@/lib/appwrite";
import { LoginFormData, SignupFormData } from "@/lib/validations/auth";

type SignupData = Omit<SignupFormData, "confirmPassword">;

export async function signupUser({ name, email, password }: SignupData) {
    try {
        //create user

        const newUser = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        //Automatically log user in after signup

        return {
            success: true,
            data:newUser 
        }
    } catch (err) {
        
        if (err instanceof AppwriteException) {
  
            switch (err.code) {
                case 409:
                    return {
                        success: false,
                        error: "An account with this email already exists."
                    };


                case 400:
                    return {
                        success: false,
                        error: "Try signing in or continue with Google."
                    };


                default:
                    return {
                        success: false,
                        error: "Something went wrong. Please try again."
                    };
            }
        }
          return {
    success: false,
    error: "Unexpected error occurred.",
  };
    }

}

export async function loginUser(data:LoginFormData) {
    try {
        // await account.deleteSession();
        const session= await account.createEmailPasswordSession(
            data.email,
            data.password
        )
        return {
            success:true,
            session
        }
    } catch (err) {
           if (err instanceof AppwriteException) {
          switch (err.code) {
                 case 401:
        return {
            success: false,
            error: "Invalid email or password"
        };

    default:
        return {
            success: false,
            error: "Something went wrong. Please try again."
        };
            }
        }
          return {
    success: false,
    error: "Unexpected error occurred.",
  };
    }
}
