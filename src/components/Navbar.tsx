"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Menu, X, Loader2 } from "lucide-react";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
   const {user,loading}=useUser();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg/85 backdrop-blur-md border-b border-border/20 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
            <MessageSquare size={18} className="text-primary-50" />
          </div>
          <span className="font-bold text-primary-900 text-lg tracking-tight font-sans">
            Chattie
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="group text-sm font-medium text-text-muted hover:text-primary-900 transition-colors relative py-1"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#pricing"
            className="group text-sm font-medium text-text-muted hover:text-primary-900 transition-colors relative py-1"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-600 transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Desktop CTA Buttons */}
        {
          loading ? (<div  className="w-8 h-8 relative rounded-full bg-primary-600 flex items-center justify-center shadow-sm">
            <span className="bg-primary-50/40 absolute inset-0 flex items-center justify-center  font-bold text-lg leading-none font-sans">
              <Loader2 className="animate-spin text-primary-50" size={18}/>
            </span>
          </div>)
          : user ? 
          (<Link href={'/dashboard'} className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shadow-sm">
            <span className="text-primary-50 font-bold text-lg leading-none font-sans">
              {user.name[0]}
            </span>
          </Link>) : (
            <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-text-muted hover:text-primary-900 transition-colors px-3 py-2"
          >
            Log In
          </Link>
          <Link
            href="/signup"
          className="cursor-pointer bg-primary-800 hover:bg-primary-600 text-primary-50 px-4.5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200"
          >
            Get Started Free
          </Link>
        </div>)
        }
      

     
      </div>

     
    </header>
  );
}
