"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getTheme, THEMES, type ThemeDef } from "@/lib/themes";

const THEME_STORAGE_KEY = "skinpiens-theme";
const DEFAULT_THEME = "aesop";

function readTheme(): string {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored && THEMES.some((t) => t.id === stored) ? stored : DEFAULT_THEME;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeTheme(id: string) {
  window.localStorage.setItem(THEME_STORAGE_KEY, id);
  listeners.forEach((l) => l());
}

interface ThemeContextValue {
  theme: string;
  themeDef: ThemeDef;
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    readTheme,
    () => DEFAULT_THEME,
  );

  const setTheme = useCallback((id: string) => {
    if (!THEMES.some((t) => t.id === id)) return;
    writeTheme(id);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", theme);
    const t = window.setTimeout(() => root.classList.remove("theme-anim"), 700);
    return () => window.clearTimeout(t);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, themeDef: getTheme(theme), setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
