"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LocalImage } from "@/components/ui/local-image";
import { ArticleReader } from "@/components/journal/article-reader";
import { ARTICLES, type Article } from "@/lib/articles";

export function JournalPage() {
  const [reading, setReading] = useState<Article | null>(null);

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
          Skinpiens formula.
        </p>
      </div>

      <div className="relative mb-12 h-56 overflow-hidden rounded-3xl sm:h-64">
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
            Six stories from the Skinpiens lab
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article, i) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            onClick={() => setReading(article)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
          >
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
            </div>
            <div className="p-5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-accent">
                {article.kicker}
              </p>
              <h2 className="mt-2 font-heading text-lg font-semibold leading-snug group-hover:text-theme-accent">
                {article.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground text-pretty">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{article.date}</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
                <span className="ml-auto font-medium text-theme-accent">Read →</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <ArticleReader article={reading} open={reading !== null} onOpenChange={(o) => !o && setReading(null)} />
    </div>
  );
}
