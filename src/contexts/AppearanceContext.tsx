"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Theme = "light" | "dark" | "system";
export type FontSize = "small" | "medium" | "large";

export interface AppearanceContextType {
  /** Active theme selection */
  theme: Theme;
  setTheme: (theme: Theme) => void;

  /** Active font-size selection */
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;

  /**
   * The resolved theme that is actually applied to the document.
   * When `theme` is "system" this resolves to the OS preference
   * ("light" or "dark").
   */
  resolvedTheme: "light" | "dark";
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const AppearanceContext =
  createContext<AppearanceContextType | null>(null);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  theme: "chattie:theme",
  fontSize: "chattie:fontSize",
} as const;

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  // Support Tailwind dark-mode class strategy as well
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function applyFontSize(size: FontSize) {
  const root = document.documentElement;
  root.setAttribute("data-font-size", size);
}

function readStorage<T extends string>(key: string, fallback: T): T {
  try {
    return (localStorage.getItem(key) as T) ?? fallback;
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const AppearanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, _setTheme] = useState<Theme>(() =>
    readStorage<Theme>(STORAGE_KEYS.theme, "light")
  );

  const [fontSize, _setFontSize] = useState<FontSize>(() =>
    readStorage<FontSize>(STORAGE_KEYS.fontSize, "medium")
  );

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
    resolveTheme(readStorage<Theme>(STORAGE_KEYS.theme, "light"))
  );

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // Private browsing / storage quota exceeded – fail silently
    }
  }, [theme]);

  // Listen for OS-level preference changes when theme === "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const resolved = resolveTheme("system");
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Apply font size to DOM whenever it changes
  useEffect(() => {
    applyFontSize(fontSize);
    try {
      localStorage.setItem(STORAGE_KEYS.fontSize, fontSize);
    } catch {
      // Fail silently
    }
  }, [fontSize]);

  const setTheme = useCallback((next: Theme) => _setTheme(next), []);
  const setFontSize = useCallback((next: FontSize) => _setFontSize(next), []);

  return (
    <AppearanceContext.Provider
      value={{ theme, setTheme, fontSize, setFontSize, resolvedTheme }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Consume appearance state anywhere in the tree.
 *
 * @example
 * const { theme, setTheme, fontSize, setFontSize } = useAppearance();
 */
export function useAppearance(): AppearanceContextType {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error("useAppearance must be used inside <AppearanceProvider>");
  }
  return ctx;
}
