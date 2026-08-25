"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import type { Article } from "@/lib/articles";
import { generateWithFallback } from "@/lib/llm";

export function ArticleGenerator({ onGenerated }: { onGenerated: (a: Article) => void }) {
  const [busy, setBusy] = useState(false);
  const [source, setSource] = useState<string | null>(null);

  const run = async () => {
    if (busy) return;
    setBusy(true);
    setSource(null);
    try {
      const result = await generateWithFallback();
      setSource(result.source);
      onGenerated(result.article);
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-card/60 p-6 sm:p-8"
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
            Trained on every Kris note in this journal. Click to recompose a brand-new draft in
            the same voice — via AI when an API key is set, otherwise on-device.
          </p>
          {source && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              Source: {source === "local" ? "on-device style model" : `live LLM (${source})`}
            </p>
          )}
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
