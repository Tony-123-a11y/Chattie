"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, Sparkles } from "lucide-react";

export default function AppearancePage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

  return (
    <div className="relative flex flex-col h-full bg-bg overflow-hidden font-sans">
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-surface bg-bg/80 backdrop-blur-sm">
        <span className="text-[11px] font-semibold text-primary-600 tracking-[0.55px] uppercase">
          Settings
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12">
        <div className="w-full max-w-[640px] mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[32px] font-bold text-text tracking-tight leading-tight">
              Appearance
            </h1>
            <p className="text-[15px] text-text-muted">
              Customize how Chattie looks on your device.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Card 1: Theme */}
            <div className="bg-white border border-surface/50 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-[16px] font-bold text-text">Theme</h2>
                <p className="text-[13px] text-text-muted">
                  Select how Chattie looks to you.
                </p>
              </div>
              
              <div className="bg-bg border border-surface/20 p-1 flex gap-1 rounded-xl w-max">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    theme === "light"
                      ? "bg-white text-primary-800 shadow-sm font-semibold"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  <Sun size={15} />
                  Light
                </button>
                
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    theme === "dark"
                      ? "bg-white text-primary-800 shadow-sm font-semibold"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  <Moon size={15} />
                  Dark
                </button>
                
                <button
                  onClick={() => setTheme("system")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    theme === "system"
                      ? "bg-white text-primary-800 shadow-sm font-semibold"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  <Monitor size={15} />
                  System
                </button>
              </div>
            </div>

            {/* Card 2: Font Size */}
            <div className="bg-white border border-surface/50 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-[16px] font-bold text-text">Font Size</h2>
                <p className="text-[13px] text-text-muted">
                  Adjust the text size for conversations.
                </p>
              </div>

              {/* Radio options */}
              <div className="flex flex-wrap items-center gap-6">
                {(["small", "medium", "large"] as const).map((size) => {
                  const isActive = fontSize === size;
                  const labels = {
                    small: "Small",
                    medium: "Medium (Default)",
                    large: "Large",
                  };
                  return (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className="flex items-center gap-2.5 text-[14px] text-text hover:text-primary-800 transition-colors cursor-pointer group"
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all ${
                          isActive
                            ? "border-primary-800 bg-primary-800"
                            : "border-surface bg-white group-hover:border-primary-400"
                        }`}
                      >
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-scale-up" />}
                      </div>
                      <span className={`transition-colors ${isActive ? "font-semibold text-text" : "text-text-muted"}`}>
                        {labels[size]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Preview Container */}
              <div className="bg-bg border border-surface/30 rounded-xl p-5 relative flex flex-col gap-4 mt-1">
                <span className="absolute top-3.5 right-4 text-[10px] font-bold text-text-muted tracking-wider bg-surface/30 px-2 py-0.5 rounded select-none">
                  PREVIEW
                </span>

                {/* Bot Message */}
                <div className="flex items-start gap-3 mt-2">
                  <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center shrink-0 shadow-sm text-white">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className="bg-accent-50 border border-accent-200 text-accent-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <p className={`leading-[1.5] transition-all duration-200 ${
                        fontSize === "small" 
                          ? "text-xs" 
                          : fontSize === "large" 
                          ? "text-base" 
                          : "text-sm"
                      }`}>
                        Hello! How can I assist you with your settings today?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex flex-col gap-1 max-w-[80%] items-end">
                    <div className="bg-primary-50 border border-primary-200 text-primary-900 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm">
                      <p className={`leading-[1.5] transition-all duration-200 ${
                        fontSize === "small" 
                          ? "text-xs" 
                          : fontSize === "large" 
                          ? "text-base" 
                          : "text-sm"
                      }`}>
                        I'd like to make the text a bit larger so it's easier to read on my external monitor. This size looks perfect.
                      </p>
                    </div>
                  </div>
                  
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80"
                    alt="AI Architect Profile"
                    className="w-8 h-8 rounded-full border border-surface shadow-sm object-cover shrink-0 select-none"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
