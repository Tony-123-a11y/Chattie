"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  HelpCircle,
  Plus,
  Settings,
  Sun,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { logOutUser } from "@/services/client/auth.service";
import { getChats } from "@/services/client/chat.service";
import { Chat } from "@/types/message";

const navLinks = [
  { href: "/login", label: "Help", icon: HelpCircle },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export default function Sidebar({
  mobileOpen,
  onClose,
  onCollapsedChange,
}: SidebarProps) {
  const { user, setUser, setLoading } = useUser();
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  console.log(settingsOpen)
  // Close settings popup when clicking anywhere outside it
  useEffect(() => {
    if (!settingsOpen) return;
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [settingsOpen]);

  // Notify parent whenever collapsed state changes
  useEffect(() => {
    onCollapsedChange?.(collapsed);
  }, [collapsed, onCollapsedChange]);

  // Fetch all chats on mount
  useEffect(() => {
    getChats()
      .then(setChats)
      .catch((err) => console.error("Failed to fetch chats:", err));
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      const { success } = await logOutUser();
      if (success) {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed((v) => !v);
    // Close settings popup when collapsing
    if (!collapsed) setSettingsOpen(false);
  };

  // Clicking anywhere on collapsed sidebar expands it — lg+ only
  const handleSidebarClick = () => {
    if (collapsed && window.innerWidth >= 1024) setCollapsed(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-90 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        onClick={handleSidebarClick}
        className={`
          fixed top-0 left-0 h-full
          bg-card border-r border-surface
          z-100 flex flex-col
          transition-all duration-300 ease-in-out
          overflow-hidden
          w-[260px]
          ${collapsed ? "lg:w-[68px] lg:cursor-pointer" : ""}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Top: Logo + collapse */}
        <div
          className={`flex items-center shrink-0 py-4 ${collapsed ? "justify-center px-4 hidden" : "justify-between px-6 "
            }`}
        >
          {/* Logo avatar — hidden on lg when collapsed */}
          <div className={`w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shadow-sm shrink-0 ${collapsed ? "hidden lg:hidden" : ""}`}>
            <span className="text-primary-50 font-bold text-lg leading-none font-sans">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>

          {/* Expand button — shown on lg only when collapsed, replaces avatar */}
          <button
            onClick={toggleCollapse}
            title="Expand sidebar"
            className={`group relative p-2 rounded-lg text-text-muted hover:text-primary-600 hover:bg-primary-600/10 transition-colors ${collapsed ? "hidden lg:flex" : "hidden"
              }`}
          >
            <PanelLeftOpen size={18} />
            <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-text-muted shadow opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              Expand
            </span>
          </button>

          {/* Collapse button — desktop only, shown when expanded */}
          <button
            onClick={toggleCollapse}
            title="Collapse sidebar"
            className={`group relative hidden lg:flex p-1 rounded-lg text-text-muted hover:text-primary-600 hover:bg-primary-600/10 transition-colors ${collapsed ? "!hidden" : ""
              }`}
          >
            <PanelLeftClose size={16} />
            <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-text-muted shadow opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              Collapse
            </span>
          </button>


        </div>

        {/* ── EXPANDED content ───────────────────────────────────────────── */}
        <div
          className={`flex-col flex-1 overflow-hidden transition-opacity duration-200 ${collapsed ? "flex lg:hidden" : "flex"
            }`}
        >
          {/* New Chat CTA */}
          <div className="px-4 mb-3 shrink-0">
            <Link
              href="/dashboard"
              onClick={() => onClose()}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg rounded-lg pl-9 pr-4 py-2.5 text-[13px] text-text placeholder:text-text-muted outline-none focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto scrollbar-primary px-4 space-y-0.5 pb-4">
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
                  onClick={() => onClose()}
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

            {/* Recent Chats */}
            <p className="px-3 pt-4 pb-1 text-[11px] font-medium text-text-muted tracking-[0.55px] uppercase">
              Recent Chats
            </p>

            <div className="space-y-0.5">
              {(() => {
                if (chats.length === 0) {
                  return (
                    <p className="px-3 py-2 text-[12px] text-text-muted/60 italic">
                      No chats yet
                    </p>
                  );
                }

                const filteredChats = chats.filter((chat) =>
                  chat.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase().trim())
                );

                if (filteredChats.length === 0) {
                  return (
                    <p className="px-3 py-2 text-[12px] text-text-muted/60 italic">
                      No chats match &ldquo;{searchQuery}&rdquo;
                    </p>
                  );
                }

                return filteredChats.map((chat) => {
                  const chatPath = `/dashboard/chat/${chat.id}`;
                  const active = pathname === chatPath;
                  return (
                    <Link
                      href={chatPath}
                      key={chat.id}
                      onClick={() => onClose()}
                      className={`w-full text-left block px-3 py-2 rounded-lg text-[13px] truncate transition-colors ${active
                        ? "bg-primary-600/10 text-primary-800 font-medium"
                        : "text-text-muted hover:bg-bg"
                        }`}
                    >
                      {chat.title}
                    </Link>
                  );
                });
              })()}
            </div>
          </nav>

          {/* Footer — expanded */}
          <div ref={settingsRef} className="shrink-0 mx-4 pt-4 border-t border-surface pb-6 relative">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-primary-50 font-bold text-xl leading-none font-sans">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-primary-800 truncate leading-snug">
                  {user?.name}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSettingsOpen((v) => !v);
                }}
                className="text-text-muted cursor-pointer hover:text-text transition-colors p-1"
              >
                <Settings size={20} />
              </button>
            </div>

            {/* Settings popup */}
            {settingsOpen && (
              <div className="absolute bottom-[calc(100%-8px)] left-2 right-2 bg-card border border-surface rounded-xl shadow-lg py-1.5 z-10">

                <Link
                  href="/dashboard/appearance"
                  onClick={() => { setSettingsOpen(false); onClose(); }}
                  className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-[13px] text-text-muted hover:bg-bg transition-colors rounded-lg mx-auto"
                >
                  <Sun size={16.667} />
                  Appearance
                </Link>

                <button
                  onClick={() => { setSettingsOpen(false); onClose(); logOut(); }}
                  className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-[13px] text-text-muted hover:bg-bg transition-colors rounded-lg mx-auto"
                >
                  <LogOut size={16.667} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── COLLAPSED icon rail ────────────────────────────────────────── */}
        <div
          className={`flex-col flex-1 items-center gap-2 py-3 transition-opacity duration-200 ${collapsed ? "hidden lg:flex" : "hidden"
            }`}
        >
          {/* Expand hint icon */}
          <button
            onClick={toggleCollapse}
            title="Expand sidebar"
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface/50 transition-colors"
          >
            <PanelLeftOpen size={18} />
          </button>

          {/* New Chat */}
          <Link
            href="/dashboard"
            title="New Chat"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-lg text-white bg-primary-800 hover:bg-primary-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
          </Link>

          {/* Search */}
          <button
            title="Search"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(false);
              // focus search after expand
              setTimeout(() => {
                (
                  document.querySelector(
                    'input[placeholder="Search..."]'
                  ) as HTMLInputElement
                )?.focus();
              }, 310);
            }}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface/50 transition-colors"
          >
            <Search size={18} />
          </button>

          {/* Help */}
          <Link
            href="/login"
            title="Help"
            onClick={(e) => e.stopPropagation()}
            className={`p-2 rounded-lg transition-colors ${pathname === "/login"
              ? "bg-primary-600/10 text-primary-800"
              : "text-text-muted hover:text-text hover:bg-surface/50"
              }`}
          >
            <HelpCircle size={18} />
          </Link>

          {/* Recent chats icon (expand to see list) */}
          <button
            title="Recent Chats"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(false);
            }}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface/50 transition-colors"
          >
            <MessageSquare size={18} />
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Account / Settings */}
          <button
            title="Account"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(false);
            }}
            className="mb-6 w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center shadow-sm shrink-0"
          >
            <span className="text-primary-50 font-bold text-base leading-none font-sans">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}