"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { signupUser } from '@/services/auth.service';
import { Eye, EyeOff } from 'lucide-react';
import { account } from '@/lib/appwrite';
import {
  signupSchema,
  type SignupFormData,
} from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
  });
  const onSubmit = async (data: SignupFormData) => {
    try {
      setServerError("");


    const user = await signupUser({
      name:data.name,
      email:data.email,
      password:data.password
    })

    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Failed to create account"
      );
    }
  };



  return (
    <main className="min-h-screen bg-bg text-text flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-surface shadow-sm p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-primary-800">Chattie</h1>
            <p className="text-text-muted mt-2 text-sm">Create an account to start chatting.</p>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-surface rounded-lg py-3 text-sm font-medium text-text hover:bg-bg transition"
          >
            <span className="w-5 h-5 bg-text rounded-sm flex items-center justify-center text-white text-[10px]">G</span>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-surface" />
            <span className="text-xs text-text-muted whitespace-nowrap">Or create an account</span>
            <div className="flex-1 h-px bg-surface" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full border border-surface rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-400"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full border border-surface rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-400"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Password</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full border border-surface rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-400"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-text-muted hover:text-text focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
              <input
                type="checkbox"
                {...register("agree")}
                className="rounded border-surface"
              />

              {errors.agree && (
                <p className="text-sm text-red-500">
                  {errors.agree.message}
                </p>
              )}
              <span>
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-primary-600 hover:underline">Privacy Policy.</a>
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-800 hover:bg-primary-900 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>
            <p className="text-center text-sm text-text-muted">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary-600 font-medium hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="px-8 py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <span className="font-semibold text-text">Chattie</span>
        <a href="#" className="text-text-muted hover:text-text">Privacy</a>
        <a href="#" className="text-text-muted hover:text-text">Terms</a>
        <a href="#" className="text-text-muted hover:text-text">Support</a>
        <span className="text-text-muted">© 2024 Chattie AI. Secure & Encrypted.</span>
      </footer>
    </main>
  )
}

export default page;