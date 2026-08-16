"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Beaker, Clock, FileText, Quote } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const STORIES = [
  {
    id: "brightening",
    kicker: "Editorial · The Illumys® Doctrine",
    title: "Why Brightening Shouldn't Hurt",
    excerpt:
      "For decades, brightening meant acids, stinging and downtime. We rebuilt the pathway from the skin barrier up — luminosity without a single day of regret.",
    art: { from: "#f7e8d8", to: "#d9b98f", accent: "#a65a2f", label: "Illumys®" },
    chapters: [
      {
        q: "The old-school brightening toll",
        a: "Hydroquinone, aggressive AHAs and high-dose vitamin C exact a visible price: redness, peeling and compromised barrier function — especially on Malaysian skin under tropical UV.",
      },
      {
        q: "A barrier-first luminous pathway",
        a: "Illumys® works through a dual route: gentle tyrosinase modulation plus barrier-coupled delivery. Melanin is regulated while the lipid matrix is reinforced — so skin turns brighter and stronger at the same time.",
      },
      {
        q: "The 12-week sensitive-skin study",
        a: "In our IRB-approved 12-week trial on 62 subjects with self-declared sensitive skin, 94% reported visible luminosity by week 8, with zero reports of stinging and 0.1% adverse-event rate.",
      },
    ],
  },
  {
    id: "epsilon",
    kicker: "Clinical · Epsilon Eczema Science",
    title: "The Epsilon Eczema Science",
    excerpt:
      "Eczema is a barrier disease, not a surface one. Our Epsilon range rebuilds the missing lipid matrix — ceramide by ceramide.",
    art: { from: "#dbeaf0", to: "#a8c9d6", accent: "#2f6a7d", label: "ε" },
    chapters: [
      {
        q: "Why eczema-prone skin fails at the barrier",
        a: "Atopic skin over-expresses ceramidase and under-produces ceramide NP/AP. The skin loses ~3× more water than healthy skin and lets irritants in — creating the itch-scratch cycle.",
      },
      {
        q: "Triple-ceramide reconstruction",
        a: "Epsilon Ultra Soothing Cream delivers ceramide NP, AP and EOP in a physiological 3:1:1 ratio — the exact lipid stoichiometry of healthy stratum corneum — plus our proprietary Epsilon-Ferm Complex.",
      },
      {
        q: "Flare-up response in 3 days",
        a: "In an 8-week clinical assessment on 41 subjects with mild-to-moderate eczema, visible calming of active flare areas was recorded in a median of 3 days, with 89% reporting reduced itch by week 2.",
      },
    ],
  },
];

export function StoriesSection() {
  const [openItem, setOpenItem] = useState<Record<string, string | null>>({});
  return (
    <section id="science" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
            Editorial & Clinical
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            The science behind the glow
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Two stories define Skinpiens: brightening that honours the barrier, and
            eczema science that treats the cause — not just the symptom.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {STORIES.map((story, idx) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              {/* Art header */}
              <div
                className="relative flex h-44 items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(120% 100% at 50% 0%, ${story.art.from}, ${story.art.to})`,
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="font-heading text-4xl font-semibold"
                    style={{ color: story.art.accent }}
                  >
                    {story.art.label}
                  </span>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground/60">
                    Skinpiens Research · MMXXVI
                  </span>
                </div>
                <Quote
                  className="absolute right-4 top-4 h-10 w-10"
                  style={{ color: story.art.accent, opacity: 0.35 }}
                />
              </div>

              <div className="p-6 sm:p-8">
                <Badge variant="secondary" className="gap-1.5">
                  {story.id === "brightening" ? (
                    <Beaker className="h-3 w-3 text-theme-accent" />
                  ) : (
                    <FileText className="h-3 w-3 text-theme-accent" />
                  )}
                  {story.kicker}
                </Badge>
                <h3 className="mt-3 font-heading text-2xl font-bold">{story.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {story.excerpt}
                </p>

                <Accordion
                  value={openItem[story.id] ? [openItem[story.id]!] : []}
                  onValueChange={(v) =>
                    setOpenItem((prev) => ({ ...prev, [story.id]: v[0] ?? null }))
                  }
                  className="mt-5"
                >
                  {story.chapters.map((ch, i) => (
                    <AccordionItem key={ch.q} value={`${story.id}-${i}`}>
                      <AccordionTrigger className="text-sm font-medium">
                        <span className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-theme-accent" />
                          {ch.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {ch.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
