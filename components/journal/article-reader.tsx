"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Bookmark, BookmarkCheck, ChevronRight, FileUp, Globe, Link2, RefreshCw, Share2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LocalImage } from "@/components/ui/local-image";
import type { Article } from "@/lib/articles";
import { getArticleMeta } from "@/lib/article-meta";
import { useBookmarks } from "@/lib/use-bookmarks";
import { withBase } from "@/lib/base-path";
import { useTheme } from "@/components/providers/theme-provider";
import { useTranslate, type TranslateLang } from "@/lib/use-translate";

const FONT_SIZES = ["text-sm", "text-base", "text-lg"] as const;
const RELATED: Record<string, { slug: string; label: string }[]> = {
  fortress: [{ slug: "fortress-plus-brightening-serum", label: "Fortress+ Serum" }],
  epsilon: [
    { slug: "epsilon-ultra-soothing-cream", label: "Epsilon Cream" },
    { slug: "epsilon-ultra-soothing-mist", label: "Epsilon Mist" },
  ],
  nuca: [{ slug: "nuca-revobiotic", label: "NUCA® RevoBiotic" }],
  防晒: [{ slug: "fortress-plus-brightening-serum", label: "Fortress+ Serum" }],
  湿疹: [
    { slug: "epsilon-ultra-soothing-cream", label: "Epsilon Cream" },
    { slug: "epsilon-ultra-soothing-mist", label: "Epsilon Mist" },
  ],
  美白: [{ slug: "fortress-plus-brightening-serum", label: "Fortress+ Serum" }],
 益生菌: [{ slug: "nuca-revobiotic", label: "NUCA® RevoBiotic" }],
};

export function ArticleReader({
  article,
  open,
  onOpenChange,
  onPublish,
  onRefresh,
}: {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish?: (a: Article) => void;
  onRefresh?: () => void;
}) {
  const { themeDef } = useTheme();
  const { toggle, has } = useBookmarks();
  const { lang, translated, loading: translating, translate, clear: clearTranslate, LANG_LABELS } = useTranslate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [fontIdx, setFontIdx] = useState(1);
  const [summaryLang, setSummaryLang] = useState<"off" | "en" | "bm">("off");
  const [copiedLink, setCopiedLink] = useState(false);

  const syncProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = Math.round((el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) * 100);
    setProgress(pct);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setProgress(0);
    setFontIdx(1);
    setSummaryLang("off");
    clearTranslate();
    el.addEventListener("scroll", syncProgress, { passive: true });
    return () => el.removeEventListener("scroll", syncProgress);
  }, [article?.slug, open, syncProgress]);

  if (!article) return null;

  const meta = getArticleMeta(article.slug);
  const uniqueRelated = Array.from(
    new Map(
      Object.entries(RELATED)
        .filter(([key]) => `${article.title} ${article.body.map((b) => `${b.heading ?? ""} ${b.text}`).join(" ")}`.toLowerCase().includes(key.toLowerCase()))
        .flatMap(([, arr]) => arr)
        .map((p) => [p.slug, p])
    ).values()
  );

  const headings = article.body
    .map((b, i) => (b.heading ? { i, text: b.heading } : null))
    .filter((h): h is { i: number; text: string } => h !== null);

  const shareUrl =
    article.slug.startsWith("generated-")
      ? null
      : typeof window !== "undefined"
        ? window.location.origin + withBase(`/journal/${article.slug}`)
        : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <button
          aria-label="Close article"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-20 rounded-full bg-background/80 p-2 backdrop-blur transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-52">
          <LocalImage src={article.cover} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <Badge variant="secondary" className="glass mb-2">
              {article.category} · {article.kicker}
            </Badge>
            <h2 className="font-heading text-xl font-bold leading-tight sm:text-2xl">{article.title}</h2>
          </div>
        </div>

        <div
          className="relative flex flex-1 flex-col overflow-hidden"
          style={{ maxHeight: "calc(90vh - 14rem)" }}
        >
          {/* progress bar */}
          <div className="h-0.5 w-full bg-border">
            <motion.div
              className="h-full bg-theme-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
          >
            {/* meta row */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{article.date}</span>
              <span className="h-3 w-px bg-border" />
              <span>{article.readTime} read</span>
              <span className="h-3 w-px bg-border" />
              <span className="text-theme-accent">SKINPIENS · {themeDef.brand}</span>

              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => setFontIdx((p) => (p + 1) % FONT_SIZES.length)}
                  aria-label="Toggle font size"
                  className="rounded-md border border-border bg-card px-2 py-1 font-sans text-xs font-bold transition-colors hover:border-theme-accent"
                >
                  {["A-", "A", "A+"][fontIdx]}
                </button>
                <button
                  onClick={() => toggle(article.slug)}
                  aria-label={has(article.slug) ? "Remove bookmark" : "Add bookmark"}
                  className="rounded-md border border-border bg-card p-1 transition-colors hover:border-theme-accent"
                >
                  {has(article.slug) ? (
                    <BookmarkCheck className="h-3.5 w-3.5 fill-theme-accent text-theme-accent" />
                  ) : (
                    <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
                {shareUrl && (
                  <button
                    onClick={() => { navigator.clipboard.writeText(shareUrl); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 1600); }}
                    aria-label="Copy link"
                    className="rounded-md border border-border bg-card p-1 transition-colors hover:border-theme-accent"
                  >
                    <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {copiedLink && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-2 text-xs text-theme-accent">
                  Link copied to clipboard ✓
                </motion.p>
              )}
            </AnimatePresence>

            {/* summary toggle */}
            {(meta.summaryEn || meta.summaryBm) && (
              <div className="mb-4">
                <div className="flex gap-1">
                  {(["off", "en", "bm"] as const).map((l) =>
                    l === "en" && !meta.summaryEn ? null : l === "bm" && !meta.summaryBm ? null : (
                      <button
                        key={l}
                        onClick={() => setSummaryLang((p) => (p === l ? "off" : l))}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                          summaryLang === l
                            ? "border-theme-accent bg-theme-accent/10 text-theme-accent"
                            : "border-border bg-card text-muted-foreground hover:text-theme-accent"
                        }`}
                      >
                        {l === "en" ? "EN" : "BM"}
                      </button>
                    )
                  )}
                </div>
                <p className="mt-2 rounded-xl bg-muted/50 px-4 py-3 text-sm italic text-muted-foreground text-pretty">
                  {summaryLang === "en" ? meta.summaryEn : summaryLang === "bm" ? meta.summaryBm : ""}
                </p>
              </div>
            )}

            {/* excerpt */}
            <p className="mb-5 text-base leading-relaxed text-muted-foreground text-pretty">{article.excerpt}</p>

            {/* language translate bar */}
            <div className="mb-5 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <div className="flex gap-1">
                {(["zh", "en", "ms", "ta"] as TranslateLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      if (lang === l) { clearTranslate(); } else { translate(article.body, l); }
                    }}
                    disabled={translating}
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                      lang === l
                        ? "border-theme-accent bg-theme-accent/10 text-theme-accent"
                        : "border-border bg-card text-muted-foreground hover:text-theme-accent"
                    } disabled:opacity-50`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              {lang && lang !== "zh" && !translating && (
                <span className="text-[11px] text-muted-foreground">via Google Translate</span>
              )}
              {translating && (
                <span className="text-[11px] text-muted-foreground animate-pulse">Translating…</span>
              )}
            </div>

            {/* TOC */}
            {headings.length >= 3 && (
              <nav className="mb-6 flex flex-wrap gap-1.5">
                {headings.map((h) => (
                  <button
                    key={h.i}
                    onClick={() => {
                      const el = scrollRef.current?.children[0]?.children[h.i + 2] as HTMLElement | undefined;
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-theme-accent hover:text-theme-accent"
                  >
                    <ChevronRight className="h-3 w-3" />
                    {h.text.length > 28 ? h.text.slice(0, 26) + "…" : h.text}
                  </button>
                ))}
              </nav>
            )}

            {/* body */}
            <div className={`space-y-5 ${FONT_SIZES[fontIdx]}`}>
              {(translated ?? article.body).map((block, i) => {
                if (block.heading && block.text === block.heading) {
                  return (
                    <h3 key={i} className={i === 0 ? "font-heading text-lg font-semibold" : "mt-6 font-heading text-lg font-semibold"}>
                      {block.heading}
                    </h3>
                  );
                }
                return (
                  <div key={i}>
                    {block.heading && block.text && block.heading !== block.text && (
                      <h3 className="mb-1.5 font-heading text-lg font-semibold">{block.heading}</h3>
                    )}
                    {block.text && (
                      <p className="leading-relaxed text-muted-foreground text-pretty whitespace-pre-line">{block.text}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* related products */}
            {uniqueRelated.length > 0 && (
              <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Related products</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueRelated.map((p) => (
                    <a
                      key={p.slug}
                      href={withBase(`/products/${p.slug}`)}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:border-theme-accent hover:text-theme-accent"
                    >
                      {p.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* community CTA */}
            <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6 text-center">
              <p className="mb-3 font-heading text-base font-bold">Join the Skinpiens community</p>
              <p className="mx-auto mb-4 max-w-sm text-sm text-muted-foreground text-pretty">
                Get pharmacist-curated skincare tips, group-buy updates, and a direct line to ask Kris anything.
              </p>
              <div className="inline-flex gap-3">
                <a
                  href={withBase("/#newsletter")}
                  className="rounded-full bg-theme-accent px-5 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  Join our newsletter
                </a>
              </div>
            </div>

            {/* standalone link */}
            {shareUrl && (
              <div className="mt-8 border-t border-border pt-4">
                <a
                  href={withBase(`/journal/${article.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-accent transition-opacity hover:opacity-80"
                >
                  <Share2 className="h-3.5 w-3.5" /> Open standalone article page
                </a>
              </div>
            )}
          </div>
        </div>

        {onPublish && article.slug.startsWith("generated-") && (
          <button
            onClick={() => onPublish(article)}
            className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full bg-theme-accent px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-theme-accent/30 transition-all hover:scale-[1.04] hover:shadow-xl active:scale-95"
          >
            <FileUp className="h-4 w-4" /> Publish to Journal
          </button>
        )}

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-bold text-muted-foreground shadow-lg transition-all hover:scale-[1.04] hover:text-theme-accent hover:shadow-xl active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Next article
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
