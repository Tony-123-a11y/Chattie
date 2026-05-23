"use client"
import { loginWithGoogle } from '@/lib/googlelogin';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { type LoginFormData, loginSchema } from '@/lib/validations/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { loginUser } from '@/services/auth.service';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';

const page = () => {
  const [serverError, setServerError] = useState<string | undefined>("");
  const {  setUser } = useUser();
  const {
    register,
    watch,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }

  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const password = watch('password')
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);
      if (!result.success) {
        return setServerError(result.error);
      }
      if (result.currentUser)
        setUser(result.currentUser);

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="min-h-screen bg-bg text-text flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-surface shadow-sm p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-primary-800">Welcome Back</h1>
            <p className="text-text-muted mt-2 text-sm">Login to your account to continue</p>
          </div>
          {
            serverError && <div className='p-4 flex items-center mx-1 rounded-lg justify-center border-red-600 bg-red-100 text-red-500 text-sm'>{serverError}</div>
          }
          <button
            onClick={loginWithGoogle}
            type="button"
            className="w-full flex cursor-pointer items-center justify-center gap-3 border border-surface rounded-lg py-3 text-sm font-medium text-text hover:bg-bg transition"
          >
            <Image src={'/GoogleLogo.png'} alt='G' width={22}
              height={22} />
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-surface" />
            <span className="text-xs text-text-muted whitespace-nowrap">Or Continue with Email</span>
            <div className="flex-1 h-px bg-surface" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
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
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full border border-surface rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-400"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || password.length < 8}
              className="w-full bg-primary-800 hover:bg-primary-900 flex items-center justify-center text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? <Loader2 className='animate-spin' />
                : "Login"}
            </button>
            <p className="text-center text-sm text-text-muted">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary-600 font-medium hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="px-8 py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <span className="font-semibold text-text">Chattie</span>
        <Link href="/" className="text-text-muted hover:text-text">Privacy</Link>
        <Link href="/" className="text-text-muted hover:text-text">Terms</Link>
        <Link href="/" className="text-text-muted hover:text-text">Support</Link>
        <span className="text-text-muted">© 2024 Chattie AI. Secure & Encrypted.</span>
      </footer>
    </main>
  )
}

export default page;