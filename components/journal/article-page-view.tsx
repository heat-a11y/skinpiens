"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Bookmark, BookmarkCheck, ChevronRight, Link2, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LocalImage } from "@/components/ui/local-image";
import type { Article } from "@/lib/articles";
import { getArticleMeta } from "@/lib/article-meta";
import { useBookmarks } from "@/lib/use-bookmarks";
import { withBase } from "@/lib/base-path";
import { useTheme } from "@/components/providers/theme-provider";

const FONT_SIZES = ["text-sm", "text-base", "text-lg"] as const;
const RELATED: Record<string, { slug: string; label: string }[]> = {
  fortress: [{ slug: "fortress-plus-brightening-serum", label: "Fortress+ Serum" }],
  epsilon: [{ slug: "epsilon-ultra-soothing-cream", label: "Epsilon Cream" }, { slug: "epsilon-ultra-soothing-mist", label: "Epsilon Mist" }],
  nuca: [{ slug: "nuca-revobiotic", label: "NUCA® RevoBiotic" }],
  美白: [{ slug: "fortress-plus-brightening-serum", label: "Fortress+ Serum" }],
  湿疹: [{ slug: "epsilon-ultra-soothing-cream", label: "Epsilon Cream" }, { slug: "epsilon-ultra-soothing-mist", label: "Epsilon Mist" }],
  益生菌: [{ slug: "nuca-revobiotic", label: "NUCA® RevoBiotic" }],
  防晒: [{ slug: "fortress-plus-brightening-serum", label: "Fortress+ Serum" }],
};

export function ArticlePageView({ article }: { article: Article }) {
  const { themeDef } = useTheme();
  const { toggle, has } = useBookmarks();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [fontIdx, setFontIdx] = useState(1);
  const [summaryLang, setSummaryLang] = useState<"off" | "en" | "bm">("off");
  const [copiedLink, setCopiedLink] = useState(false);

  const syncProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setProgress(Math.round((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 100));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncProgress, { passive: true });
    return () => el.removeEventListener("scroll", syncProgress);
  }, [syncProgress]);

  const meta = getArticleMeta(article.slug);
  const uniqueRelated = Array.from(
    new Map(
      Object.entries(RELATED)
        .filter(([k]) => `${article.title} ${article.body.map((b) => `${b.heading ?? ""} ${b.text}`).join(" ")}`.toLowerCase().includes(k.toLowerCase()))
        .flatMap(([, v]) => v)
        .map((p) => [p.slug, p])
    ).values()
  );
  const headings = article.body.map((b, i) => (b.heading ? { i, text: b.heading } : null)).filter((h): h is { i: number; text: string } => h !== null);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <div className="h-1 w-full bg-border">
        <motion.div className="h-full bg-theme-accent" animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
        <a href={withBase("/journal")} className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-theme-accent transition-opacity hover:opacity-80">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Journal
        </a>

        <div className="relative mb-8 h-64 overflow-hidden rounded-3xl sm:h-80">
          <LocalImage src={article.cover} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <Badge variant="secondary" className="glass mb-2">{article.category} · {article.kicker}</Badge>
            <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{article.date}</span>
          <span className="h-3 w-px bg-border" />
          <span>{article.readTime} read</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-theme-accent">SKINPIENS · {themeDef.brand}</span>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setFontIdx((p) => (p + 1) % FONT_SIZES.length)} className="rounded-md border border-border bg-card px-2 py-1 font-sans text-xs font-bold hover:border-theme-accent">{["A-", "A", "A+"][fontIdx]}</button>
            <button onClick={() => toggle(article.slug)} className="rounded-md border border-border bg-card p-1 hover:border-theme-accent">
              {has(article.slug) ? <BookmarkCheck className="h-3.5 w-3.5 fill-theme-accent text-theme-accent" /> : <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
            <button onClick={() => { navigator.clipboard.writeText(shareUrl); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 1600); }} className="rounded-md border border-border bg-card p-1 hover:border-theme-accent"><Link2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
          </div>
        </div>

        <AnimatePresence>{copiedLink && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4 text-xs text-theme-accent">Link copied ✓</motion.p>}</AnimatePresence>

        {(meta.summaryEn || meta.summaryBm) && (
          <div className="mb-6">
            <div className="flex gap-1">
              {(["en", "bm"] as const).map((l) => (
                <button key={l} onClick={() => setSummaryLang((p) => (p === l ? "off" : l))} className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${summaryLang === l ? "border-theme-accent bg-theme-accent/10 text-theme-accent" : "border-border bg-card text-muted-foreground hover:text-theme-accent"}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            {summaryLang !== "off" && <p className="mt-2 rounded-xl bg-muted/50 px-4 py-3 text-sm italic text-muted-foreground text-pretty">{summaryLang === "en" ? meta.summaryEn : meta.summaryBm}</p>}
          </div>
        )}

        <p className="mb-6 text-base leading-relaxed text-muted-foreground text-pretty">{article.excerpt}</p>

        {headings.length >= 3 && (
          <nav className="mb-8 flex flex-wrap gap-1.5">
            {headings.map((h) => (
              <button key={h.i} onClick={() => { const el = scrollRef.current?.children[0]?.children[h.i] as HTMLElement | undefined; el?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-theme-accent hover:text-theme-accent">
                <ChevronRight className="h-3 w-3" />{h.text.length > 28 ? h.text.slice(0, 26) + "…" : h.text}
              </button>
            ))}
          </nav>
        )}

        <div className={`space-y-5 ${FONT_SIZES[fontIdx]}`}>
          {article.body.map((block, i) => {
            if (block.heading && block.text === block.heading) return <h3 key={i} className="mt-6 font-heading text-lg font-semibold">{block.heading}</h3>;
            return (
              <div key={i}>
                {block.heading && block.text && block.heading !== block.text && <h3 className="mb-1.5 font-heading text-lg font-semibold">{block.heading}</h3>}
                {block.text && <p className="leading-relaxed text-muted-foreground text-pretty whitespace-pre-line">{block.text}</p>}
              </div>
            );
          })}
        </div>

        {uniqueRelated.length > 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Related products</p>
            <div className="flex flex-wrap gap-2">
              {uniqueRelated.map((p) => (
                <a key={p.slug} href={withBase(`/products/${p.slug}`)} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-theme-accent hover:text-theme-accent">
                  {p.label}<ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 text-center">
          <p className="mb-2 font-heading text-base font-bold">Join the Skinpiens community</p>
          <p className="mx-auto mb-4 max-w-sm text-sm text-muted-foreground text-pretty">Get pharmacist-curated skincare tips, group-buy updates, and a direct line to ask Kris anything.</p>
          <a href={withBase("/#newsletter")} className="inline-block rounded-full bg-theme-accent px-5 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-[1.03]">Join our newsletter</a>
        </div>
      </div>
    </div>
  );
}
