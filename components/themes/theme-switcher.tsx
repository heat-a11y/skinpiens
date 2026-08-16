"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch storefront theme"
        aria-expanded={open}
        className="glass fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-primary/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="p"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Palette className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass fixed bottom-20 right-5 z-[60] w-[min(92vw,340px)] overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="font-heading text-sm font-bold">10-in-1 Design Overhaul</p>
              <p className="text-xs text-muted-foreground">
                Preview Skinpiens under 10 aesthetic architectures.
              </p>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {THEMES.map((t) => {
                const active = t.id === theme;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      active ? "bg-primary/10" : "hover:bg-muted",
                    )}
                  >
                    <span className="flex shrink-0 -space-x-1">
                      {t.swatches.map((s) => (
                        <span
                          key={s}
                          className="h-5 w-5 rounded-full border border-border"
                          style={{ background: s }}
                        />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-semibold">{t.name}</span>
                        <span className="truncate text-[11px] text-muted-foreground">
                          {t.brand}
                        </span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {t.tagline}
                      </span>
                    </span>
                    {active && <Check className="h-4 w-4 shrink-0 text-primary" />}
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
