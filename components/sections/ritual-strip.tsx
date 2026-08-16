"use client";

import { motion } from "framer-motion";
import { Droplets, Sparkles, Sun, Waves } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: Sun, title: "Cleanse", sub: "Epsilon ceramide cleanser", data: "pH 5.5" },
  { icon: Droplets, title: "Treat", sub: "Fortress+ Illumys® 0.3%", data: "AM & PM" },
  { icon: Waves, title: "Seal", sub: "Epsilon soothing cream", data: "3:1:1" },
  { icon: Sparkles, title: "Maintain", sub: "Veragen inner-barrier", data: "daily" },
];

/**
 * SK-II / Beauty of Joseon — horizontal ritual flow.
 * SK-II renders a dense numbered rail; BOJ renders frosted routine cards.
 */
export function RitualStrip() {
  const { themeDef } = useTheme();
  const isBoj = themeDef.id === "beauty-of-joseon";

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="heading-case font-sans text-xs font-semibold uppercase tracking-[0.24em] text-theme-accent">
              {isBoj ? "Skin Routine · 4 steps" : "The Hikari Ritual"}
            </p>
            <h2 className="heading-case mt-3 font-heading text-3xl font-bold sm:text-4xl">
              {isBoj ? "Layering for glass skin" : "Four steps to light"}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            {isBoj
              ? "Each layer builds the translucent, bouncy finish — thinnest to richest."
              : "Cleanse → treat → seal → maintain. A sequence, not a scramble."}
          </p>
        </div>

        {isBoj ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, sub, data }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass flex flex-col gap-3 rounded-3xl p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-card/80 text-theme-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-heading text-2xl font-bold text-muted-foreground/25">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{sub}</p>
                </div>
                <span className="mt-auto rounded-full bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {data}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto border border-border">
            {STEPS.map(({ icon: Icon, title, sub, data }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "flex min-w-[240px] flex-1 snap-start flex-col gap-2 border-border p-5",
                  i !== 0 && "border-l",
                )}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-theme-accent" />
                  <span className="font-mono text-xs text-muted-foreground">STEP {data}</span>
                </div>
                <p className="font-heading text-lg font-bold text-theme-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-heading text-base font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
