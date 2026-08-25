"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Clock, FileUp, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LocalImage } from "@/components/ui/local-image";
import { ArticleReader } from "@/components/journal/article-reader";
import { ArticleGenerator } from "@/components/journal/article-generator";
import { ARTICLES, type Article } from "@/lib/articles";
import { getArticleMeta } from "@/lib/article-meta";
import { useBookmarks } from "@/lib/use-bookmarks";
import { generateFromPool } from "@/lib/generator";

const CATEGORIES = ["All", "Editorial", "Clinical", "Ingredient", "Supplement"] as const;

export function JournalPage() {
  const [reading, setReading] = useState<Article | null>(null);
  const [generated, setGenerated] = useState<Article[]>([]);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const bk = useBookmarks();

  const allArticles = useMemo(() => [...generated, ...ARTICLES], [generated]);

  const tagCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of allArticles) {
      for (const t of getArticleMeta(a.slug).tags) m.set(t, (m.get(t) ?? 0) + 1);
    }
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14);
  }, [allArticles]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allArticles.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (bookmarksOnly && !bk.has(a.slug)) return false;
      const meta = getArticleMeta(a.slug);
      if (activeTag && !meta.tags.includes(activeTag)) return false;
      if (q) {
        const hay = `${a.title} ${a.excerpt} ${a.kicker} ${meta.tags.join(" ")} ${a.body.map((b) => b.text).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allArticles, category, activeTag, query, bookmarksOnly, bk]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="mb-12 max-w-2xl">
        <p className="heading-case font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
          The Skinpiens Journal
        </p>
        <h1 className="heading-case mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Clinical insights, without the jargon
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty">
          Barrier science, eczema research and the botanical actives behind every
          Skinpiens formula — plus Kris&apos; pharmacist notes.
        </p>
      </div>

      <div className="relative mb-10 h-56 overflow-hidden rounded-3xl sm:h-64">
        <LocalImage
          src="/editorial/hero.jpg"
          alt="Skinpiens atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 max-w-md">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-theme-accent">
            From the atelier
          </p>
          <p className="mt-2 font-heading text-2xl font-bold leading-snug">
            Stories that started a conversation
          </p>
        </div>
      </div>

      <div className="relative mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search articles in 中文 or English…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-theme-accent"
          />
        </div>
        <button
          onClick={() => setBookmarksOnly((p) => !p)}
          className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-colors ${
            bookmarksOnly
              ? "border-theme-accent bg-theme-accent text-white"
              : "border-border bg-card text-muted-foreground hover:text-theme-accent"
          }`}
        >
          {bookmarksOnly ? (
            <BookmarkCheck className="h-3.5 w-3.5" />
          ) : (
            <Bookmark className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">{bk.slugs.length}</span>
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setActiveTag(null); }}
            className={`rounded-full border px-4 py-1.5 font-sans text-xs font-semibold transition-colors ${
              category === c && !activeTag
                ? "border-transparent bg-theme-accent text-white"
                : "border-border bg-card text-muted-foreground hover:text-theme-accent"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="h-4 w-px bg-border" />
        {tagCounts.map(([tag, n]) => (
          <button
            key={tag}
            onClick={() => { setActiveTag((p) => (p === tag ? null : tag)); setCategory("All"); }}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold transition-colors ${
              activeTag === tag
                ? "border-theme-accent bg-theme-accent/10 text-theme-accent"
                : "border-border bg-card text-muted-foreground hover:text-theme-accent"
            }`}
          >
            {tag}
            <span className="ml-1 text-[10px] opacity-60">{n}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => {
          const meta = getArticleMeta(article.slug);
          return (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
            >
              <button
                onClick={(e) => { e.stopPropagation(); bk.toggle(article.slug); }}
                aria-label={bk.has(article.slug) ? "Remove bookmark" : "Add bookmark"}
                className="absolute right-3 top-3 z-10 rounded-full bg-background/70 p-2 backdrop-blur transition-colors hover:bg-background/90"
              >
                {bk.has(article.slug) ? (
                  <BookmarkCheck className="h-4 w-4 fill-theme-accent text-theme-accent" />
                ) : (
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              <div onClick={() => setReading(article)} className="contents">
                <div className="relative h-44 overflow-hidden">
                  <LocalImage
                    src={article.cover}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <Badge
                    variant="secondary"
                    className="glass absolute left-3 top-3"
                    style={{ color: article.accent }}
                  >
                    {article.category}
                  </Badge>
                  {article.slug.startsWith("generated-") && (
                    <span className="glass absolute left-3 top-11 inline-flex items-center gap-1 rounded-full bg-theme-accent/90 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      <FileUp className="h-2.5 w-2.5" /> Published
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-accent">
                    {article.kicker}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-semibold leading-snug group-hover:text-theme-accent line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground text-pretty">
                    {article.excerpt}
                  </p>
                  {meta.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {meta.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="h-3 w-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    <span className="ml-auto font-medium text-theme-accent">Read →</span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-muted-foreground">No articles match your filters — try a different tag or keyword.</p>
      )}

      <div className="mt-16">
        <ArticleGenerator onGenerated={(a) => setReading(a)} />
      </div>

      <ArticleReader
        article={reading}
        open={reading !== null}
        onOpenChange={(o) => !o && setReading(null)}
        onRefresh={() => setReading(generateFromPool())}
        onPublish={(a) => {
          setGenerated((prev) => [a, ...prev]);
          setReading(null);
        }}
      />
    </div>
  );
}
