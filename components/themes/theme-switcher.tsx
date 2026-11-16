"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Design index — a quiet launcher for the 22 art directions.
 * Collapsed it is a single hairline chip; open it lists every system.
 */
export function ThemeSwitcher() {
  const { theme, themeDef, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener("skinpiens:design-index", openPanel);
    return () => window.removeEventListener("skinpiens:design-index", openPanel);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-1/2 z-[65] hidden -translate-y-1/2 lg:block print:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Open design index"
          className="flex flex-col items-center gap-3 border-y border-r border-foreground/25 bg-background/85 px-1.5 py-3 backdrop-blur-xl transition-colors hover:bg-foreground hover:text-background"
        >
          <span className="flex flex-col gap-1">
            {themeDef.swatches.slice(0, 3).map((s) => (
              <span
                key={s}
                className="inline-block h-2.5 w-2.5 border border-foreground/20"
                style={{ background: s }}
              />
            ))}
          </span>
          <span className="micro v-label">Design index</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-2 top-1/2 z-[66] w-[min(92vw,26rem)] -translate-y-1/2 border border-foreground/20 bg-background shadow-2xl sm:left-12 print:hidden"
          >
            <div className="flex items-start justify-between border-b border-foreground/15 px-4 py-3">
              <div>
                <p className="micro">Design index</p>
                <p className="micro-sm mt-1 text-muted-foreground">
                  {THEMES.length} art directions · one storefront
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close design index"
                className="flex h-7 w-7 items-center justify-center border border-foreground/20 hover:bg-foreground hover:text-background"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="no-scrollbar max-h-[58vh] overflow-y-auto">
              {THEMES.map((t) => {
                const active = t.id === theme;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 border-b border-foreground/10 px-4 py-2.5 text-left transition-colors hover:bg-muted",
                      active && "bg-muted",
                    )}
                  >
                    <span className="flex shrink-0 -space-x-1">
                      {t.swatches.map((s) => (
                        <span
                          key={s}
                          className="inline-block h-3.5 w-3.5 rounded-full border border-foreground/20"
                          style={{ background: s }}
                        />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm">{t.name}</span>
                      <span className="micro-sm block truncate text-muted-foreground">
                        {t.brand}
                      </span>
                    </span>
                    {active && <Check className="h-3.5 w-3.5 shrink-0 text-accent" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
