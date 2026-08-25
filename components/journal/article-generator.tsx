"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import type { Article } from "@/lib/articles";
import { generateArticle } from "@/lib/generator";

export function ArticleGenerator({ onGenerated }: { onGenerated: (a: Article) => void }) {
  const [busy, setBusy] = useState(false);

  const run = () => {
    if (busy) return;
    setBusy(true);
    window.setTimeout(() => {
      onGenerated(generateArticle());
      setBusy(false);
    }, 700);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative mb-10 overflow-hidden rounded-3xl border border-dashed border-border bg-card/60 p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-theme-accent/10 blur-3xl"
      />
      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-theme-accent/15 text-theme-accent">
          <Sparkles className={`h-5 w-5 ${busy ? "animate-pulse" : ""}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-bold">Style Lab — generate a journal draft</h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            A tiny on-device model trained on every Kris note in this journal. Each click recomposes
            hooks, facts and pharmacist tips into a brand-new draft — for inspiration, not medical advice.
          </p>
        </div>
        <button
          onClick={run}
          disabled={busy}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-theme-accent px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-theme-accent/25 transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-70"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate article
            </>
          )}
        </button>
      </div>
    </motion.section>
  );
}
