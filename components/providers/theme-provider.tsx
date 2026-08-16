"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getTheme, THEMES, type ThemeDef } from "@/lib/themes";

const THEME_STORAGE_KEY = "skinpiens-theme";
const DEFAULT_THEME = "navy-cream";

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
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
  const [veil, setVeil] = useState(false);
  const timers = useRef<number[]>([]);

  // Apply the data-theme attribute to <html> whenever the store changes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Honour a ?theme= share link on first load (pre-paint script handles the
  // initial attribute; this keeps the store in sync).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("theme");
    if (requested && THEMES.some((t) => t.id === requested)) {
      writeTheme(requested);
    }
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const setTheme = useCallback((id: string) => {
    if (!THEMES.some((t) => t.id === id)) return;
    if (id === readTheme()) return;

    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    // Crossfade: fade the veil to opaque, swap the theme behind it, reveal.
    setVeil(true);
    timers.current.push(
      window.setTimeout(() => writeTheme(id), 200),
      window.setTimeout(() => setVeil(false), 240),
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeDef: getTheme(theme), setTheme }}>
      <div
        className="theme-veil"
        style={{ opacity: veil ? 1 : 0, pointerEvents: veil ? "auto" : "none" }}
        aria-hidden
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
