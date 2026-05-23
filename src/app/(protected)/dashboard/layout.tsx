"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/hooks/useUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 const{user}= useUser();
 console.log(user)
  return (
   <div className="flex h-screen overflow-hidden bg-bg font-sans">
  {/* Sidebar */}
  <Sidebar
    mobileOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  {/* Main area */}
  <div className="flex-1 flex flex-col min-w-0 relative">

    {/* Mobile top bar */}
    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-surface shrink-0">
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-text-muted hover:text-text transition-colors"
      >
        <Menu size={20} />
      </button>

      <span className="font-bold text-primary-800 text-[15px]">
        Chattie
      </span>
    </div>

    {/* Nested page outlet */}
    <main className="flex-1 overflow-hidden relative">
      {children}
    </main>
  </div>
</div>
  );
}