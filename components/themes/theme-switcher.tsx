"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Palette } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Design overhaul switcher.
 * Desktop: slim always-open left rail listing all 10 themes.
 * Mobile:  bottom strip with wrapping chips.
 */
export function ThemeSwitcher() {
  const { theme, themeDef, setTheme } = useTheme();
  const [railOpen, setRailOpen] = useState(true);

  return (
    <>
      {/* Desktop left rail */}
      <div className="fixed left-3 top-1/2 z-[45] hidden -translate-y-1/2 md:block">
        <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
          <AnimatePresence initial={false}>
            {railOpen ? (
              <motion.div
                key="open"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 176, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-theme-accent">
                    <Palette className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold leading-tight">
                      21-in-1 Design
                    </p>
                    <p className="truncate text-[10px] text-muted-foreground leading-tight">
                      {themeDef.name} · {themeDef.brand}
                    </p>
                  </div>
                  <button
                    onClick={() => setRailOpen(false)}
                    aria-label="Collapse theme rail"
                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="no-scrollbar max-h-[52vh] overflow-y-auto p-1.5">
                  {THEMES.map((t) => {
                    const active = t.id === theme;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        title={`${t.brand} — ${t.tagline}`}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[10px] font-medium transition-colors",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <span className="flex shrink-0 -space-x-1">
                          {t.swatches.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="h-3 w-3 rounded-full border border-background"
                              style={{ background: s }}
                            />
                          ))}
                        </span>
                        <span className="truncate">{t.name}</span>
                        {active && <Check className="ml-auto h-3 w-3 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                <p className="border-t border-border px-3 py-2 text-[10px] leading-snug text-muted-foreground">
                  {themeDef.tagline}
                </p>
              </motion.div>
            ) : (
              <motion.button
                key="closed"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 40, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                onClick={() => setRailOpen(true)}
                aria-label="Expand theme rail"
                className="flex items-center justify-center py-3"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom strip */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-3 pb-3 md:hidden">
        <div className="glass pointer-events-auto min-w-0 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
          <div className="flex min-w-0 items-center gap-2 border-b border-border px-3 py-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-theme-accent">
              <Palette className="h-3 w-3" />
            </span>
            <p className="min-w-0 truncate text-[11px] font-bold">
              21-in-1 Design ·{" "}
              <span className="font-medium text-theme-accent">{themeDef.name}</span>
            </p>
          </div>
          <div className="no-scrollbar flex min-w-0 items-center gap-1.5 overflow-x-auto px-3 py-2">
            {THEMES.map((t) => {
              const active = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={`${t.brand} — ${t.tagline}`}
                  className={cn(
                    "flex max-w-full shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background/70 text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="flex shrink-0 -space-x-0.5">
                    {t.swatches.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="h-3 w-3 rounded-full border border-background"
                        style={{ background: s }}
                      />
                    ))}
                  </span>
                  <span className="truncate">{t.name}</span>
                  {active && <Check className="h-3 w-3 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
