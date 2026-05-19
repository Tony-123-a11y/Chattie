"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Search,
  HelpCircle,
  Plus,
  Settings,
  Sun,
  User,
  Menu,
  X,
} from "lucide-react";

const recentChats = [
  "Design System architecture",
  "Tailwind config setup",
  "UI Component ideas",
];

const navLinks = [
  { href: "/dashboard/help", label: "Help", icon: HelpCircle },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 h-full w-[260px]
    bg-white border-r border-surface
    z-30 flex flex-col transition-transform duration-300
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:z-auto
  `}
      >

        {/* Top: Logo + collapse */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">

          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shadow-sm">
            <span className="text-primary-50 font-bold text-lg leading-none font-sans">
              A
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text transition-colors lg:hidden"
          >
            <X size={16} />
          </button>

          <button className="hidden lg:flex p-1 text-text-muted hover:text-text transition-colors">
            <Menu size={16} />
          </button>
        </div>

        {/* New Chat CTA */}
        <div className="px-4 mb-3 shrink-0">

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full bg-primary-800 hover:bg-primary-600 text-white font-medium text-[15px] px-4 py-3 rounded-lg transition-colors shadow-sm"
          >
            <Plus size={14} />
            New Chat
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 mb-3 shrink-0">

          <div className="relative">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-bg rounded-lg pl-9 pr-4 py-2.5 text-[13px] text-text placeholder:text-text-muted outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-0.5 pb-4">

          {/* MAIN section */}
          <p className="px-3 pt-2 pb-1 text-[11px] font-medium text-text-muted tracking-[0.55px] uppercase">
            Main
          </p>

          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-colors ${active
                    ? "bg-primary-600/10 text-primary-800 font-medium"
                    : "text-text-muted hover:bg-bg"
                  }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}


          <p className="px-3 pt-4 pb-1 text-[11px] font-medium text-text-muted tracking-[0.55px] uppercase">
            Recent Chats
          </p>

          <div className="space-y-0.5">
            {recentChats.map((chat) => (
              <Link
                href={"/dashboard/chat"}
                key={chat}
                className="w-full text-left block px-3 py-2 rounded-lg text-[13px] text-text-muted hover:bg-bg truncate transition-colors"
              >
                {chat}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 mx-4 pt-4 border-t border-surface pb-6 relative">

          <div className="flex items-center gap-3 px-2">

            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shadow-sm shrink-0">
              <span className="text-primary-50 font-bold text-xl leading-none font-sans">
                A
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-primary-800 truncate leading-snug">
                AI Architect
              </p>

              <p className="text-[11px] font-medium text-text-muted tracking-[0.44px]">
                Pro Plan
              </p>
            </div>

            <button
              onClick={() => setSettingsOpen((v) => !v)}
              className="text-text-muted hover:text-text transition-colors p-1"
            >
              <Settings size={20} />
            </button>
          </div>

          {/* Settings popup */}
          {settingsOpen && (

            <div className="absolute bottom-[calc(100%-8px)] left-2 right-2 bg-white border border-surface rounded-xl shadow-lg py-1.5 z-10">

              <Link
                href="/dashboard/appearance"
                onClick={() => {
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-text-muted hover:bg-bg transition-colors rounded-lg mx-auto"
              >
                <Sun size={16.667} />
                Appearance
              </Link>

              <Link href={"/dashboard/settings"} className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-text-muted hover:bg-bg transition-colors rounded-lg mx-auto">
                <User size={16.667} />
                Account
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}