"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Palette } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Always-visible design overhaul dock. Lists all 10 aesthetic
 * architectures; clicking one restyles the entire storefront via the
 * data-theme attribute — no page reload.
 */
export function ThemeSwitcher() {
  const { theme, themeDef, setTheme } = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-3 pb-3">
      <div className="pointer-events-auto glass min-w-0 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
        {/* Header row */}
        <div className="flex min-w-0 items-center gap-2 border-b border-border px-3 py-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-theme-accent">
            <Palette className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">
              10-in-1 Design Overhaul
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              <span className="font-medium text-foreground">{themeDef.name}</span>
              {" · "}
              {themeDef.brand}
            </p>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Hide theme list" : "Show theme list"}
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", !open && "rotate-180")}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Theme chips */}
              <div className="no-scrollbar flex min-w-0 gap-1.5 overflow-x-auto px-3 py-2.5">
                {THEMES.map((t) => {
                  const active = t.id === theme;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      title={`${t.brand} — ${t.tagline}`}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background/70 text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span className="flex -space-x-0.5">
                        {t.swatches.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="h-3 w-3 rounded-full border border-background"
                            style={{ background: s }}
                          />
                        ))}
                      </span>
                      {t.name}
                      {active && <Check className="h-3 w-3" />}
                    </button>
                  );
                })}
              </div>

              {/* Active theme description */}
              <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">{themeDef.name}</span>
                {" · "}
                {themeDef.tagline}
                {" — "}
                {themeDef.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
