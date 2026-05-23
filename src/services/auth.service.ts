import { AppwriteException, ID } from "appwrite";
import { account } from "@/lib/appwrite";
import { LoginFormData, SignupFormData } from "@/lib/validations/auth";

type SignupData = Omit<SignupFormData, "confirmPassword">;

export async function signupUser({ name, email, password }: SignupData) {
    try {
        //create user

        await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        await account.deleteSession("current");

        await account.createEmailPasswordSession(
            email,
            password,
        )
        const currentUser =
            await account.get();
        return {
            success: true,
            currentUser
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

export async function loginUser(data: LoginFormData) {
    try {
        await account.createEmailPasswordSession(
            data.email,
            data.password
        )
        const currentUser =
            await account.get();
        return {
            success: true,
            currentUser
        }
    } catch (err) {
        if (err instanceof AppwriteException) {
            console.log(err)
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

export async function getUser(){
    try {
          const currentUser= await account.get();
    if(!currentUser){
       return null;
    }
    return currentUser;
    } catch (error) {
        console.log(error)
    }
  
}

export async function logOutUser():Promise<{ success: boolean; }> {
  try {
    await account.deleteSession("current");

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
}
