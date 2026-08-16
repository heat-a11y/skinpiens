"use client";

import { motion } from "framer-motion";

/** Aesop — apothecary manifesto band. Sparse, centered, editorial. */
export function Manifesto() {
  return (
    <section className="border-y border-border bg-card/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28"
      >
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-theme-accent">
          A Skinpiens Doctrine
        </span>
        <blockquote className="mt-8 font-heading text-2xl font-medium leading-snug text-balance sm:text-3xl lg:text-4xl">
          “We do not believe brightness should be purchased at the cost of the
          barrier. We believe the two can be <em className="italic text-theme-accent">one</em>.”
        </blockquote>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          For a decade we compounded for pharmacies. Every formula we make still
          begins there — with what skin needs, not what sells.
        </p>
        <div className="mx-auto mt-10 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>Est. 2016</span>
          <span className="h-px w-12 bg-border" />
          <span>Kuala Lumpur</span>
        </div>
      </motion.div>
    </section>
  );
}
