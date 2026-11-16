"use client";

import { motion, useReducedMotion } from "framer-motion";

const WORDS =
  "We do not believe brightness should be purchased at the cost of the barrier.".split(
    " ",
  );

/** Studio — a full-bleed doctrine statement, revealed word by word. */
export function Manifesto() {
  const reduced = useReducedMotion();

  return (
    <section className="border-b border-foreground/15 bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
        <div className="flex items-baseline justify-between border-b border-background/20 pb-4">
          <p className="micro text-background/60">A Skinpiens doctrine</p>
          <p className="micro text-background/60">Est. 2016 · Kuala Lumpur</p>
        </div>

        <blockquote className="display mt-10 max-w-5xl text-[clamp(2rem,5.4vw,4.4rem)] leading-[0.95]">
          {WORDS.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={reduced ? undefined : { opacity: 0.12 }}
              whileInView={reduced ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.035 }}
              className="mr-[0.24em] inline-block"
            >
              {word === "barrier." ? (
                <em className="text-signal">{word}</em>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </blockquote>

        <div className="mt-12 grid gap-8 border-t border-background/20 pt-6 lg:grid-cols-12">
          <p className="micro text-background/60 lg:col-span-3">The premise</p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-background/75 text-pretty lg:col-span-6">
            For a decade we compounded for pharmacies. Every formula we make still
            begins there — with what skin needs, not what sells. Luminosity and
            tolerance are not a trade-off; they are the same project.
          </p>
          <div className="micro space-y-1.5 text-background/50 lg:col-span-3 lg:text-right">
            <p>24 formulas in development</p>
            <p>3 IRB-approved studies</p>
            <p className="text-background">0% stinging reports</p>
          </div>
        </div>
      </div>
    </section>
  );
}
