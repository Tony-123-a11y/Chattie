import React from 'react'

const page = () => {
return (
    <main className="min-h-screen bg-bg text-text flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-surface shadow-sm p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-primary-800">Welcome Back</h1>
            <p className="text-text-muted mt-2 text-sm">Login to your account to continue</p>
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
            <span className="text-xs text-text-muted whitespace-nowrap">Or Continue with Email</span>
            <div className="flex-1 h-px bg-surface" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-surface rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-surface rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-primary-400"
              />
            </div>
           
            <button
              type="submit"
              className="w-full bg-primary-800 hover:bg-primary-900 text-white font-medium py-3 rounded-lg transition"
            >
              Login
            </button>
            <p className="text-center text-sm text-text-muted">
              Don't have an account?{" "}
              <a href="#" className="text-primary-600 font-medium hover:underline">Sign up</a>
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
  )}

export default page;