"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ reveal */

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- split lines */

export function SplitLines({
  lines,
  className,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block will-change-transform"
            initial={reduced ? undefined : { y: "110%", rotate: 2 }}
            animate={reduced ? undefined : { y: 0, rotate: 0 }}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------ section head */

export function SectionHead({
  index,
  kicker,
  title,
  note,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 border-t border-foreground/15 pt-5 lg:grid-cols-12 lg:gap-8",
        className,
      )}
    >
      <div className="micro flex items-start gap-3 text-muted-foreground lg:col-span-3">
        <span className="text-accent">[{index}]</span>
        <span>{kicker}</span>
      </div>
      <Reveal className="lg:col-span-6">
        <h2 className="display text-[clamp(2.4rem,5.4vw,4.6rem)]">{title}</h2>
      </Reveal>
      {note && (
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:col-span-3 lg:justify-self-end">
          {note}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- numerals */

export function Marker({ children }: { children: ReactNode }) {
  return (
    <span className="micro-sm inline-flex h-6 min-w-6 items-center justify-center border border-foreground/25 px-1.5">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- marquee */

export function Ticker({
  items,
  className,
  speed = 38,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={`${dup}-${item}`} className="flex items-center">
                <span className="display px-6 text-[clamp(2rem,4.6vw,3.6rem)] uppercase tracking-[-0.02em]">
                  {item}
                </span>
                <span className="text-[0.5em] text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
