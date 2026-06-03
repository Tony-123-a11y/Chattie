"use client";

import { useState } from "react";
import { Menu, PanelLeftOpen } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/hooks/useUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="flex h-screen overflow-hidden bg-bg font-sans">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area — shifts smoothly as sidebar collapses */}
      <div
        className={`flex-1 flex flex-col min-w-0 relative transition-all duration-300 ease-in-out`}
      >
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-surface shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-muted hover:text-text transition-colors"
          >
            <PanelLeftOpen size={20} />
          </button>

          <span className="font-bold text-primary-800 text-[15px]">
            Chattie
          </span>
        </div>

        {/* Nested page outlet */}
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}