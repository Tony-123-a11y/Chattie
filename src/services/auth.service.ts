import { AppwriteException, ID } from "appwrite";
import { account } from "@/lib/appwrite";
import { SignupFormData } from "@/lib/validations/auth";

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
                        error: "Please check your input data "
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
