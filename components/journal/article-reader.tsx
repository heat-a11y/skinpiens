"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/articles";
import { useTheme } from "@/components/providers/theme-provider";

export function ArticleReader({
  article,
  open,
  onOpenChange,
}: {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { themeDef } = useTheme();

  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-2xl gap-0 overflow-hidden p-0">
        <button
          aria-label="Close article"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-20 rounded-full bg-background/80 p-2 backdrop-blur transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-52 w-full shrink-0 overflow-hidden">
          <Image src={article.cover} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <Badge variant="secondary" className="glass mb-2">
              {article.category} · {article.kicker}
            </Badge>
            <DialogHeader className="gap-1 text-left">
              <DialogTitle className="font-heading text-2xl font-bold leading-tight">
                {article.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="max-h-[calc(88vh-13rem)] overflow-y-auto px-6 py-5">
          <div className="mb-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{article.date}</span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime} read
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="text-theme-accent">SKINPIENS · {themeDef.brand}</span>
          </div>

          <p className="mb-6 text-base leading-relaxed text-muted-foreground text-pretty">
            {article.excerpt}
          </p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-5">
            {article.body.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h3 className="mb-1.5 font-heading text-lg font-semibold">{block.heading}</h3>
                )}
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{block.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
