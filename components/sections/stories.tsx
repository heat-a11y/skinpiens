"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LocalImage } from "@/components/ui/local-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHead } from "@/components/studio/primitives";

const STORIES = [
  {
    id: "brightening",
    kicker: "Editorial · The Illumys® Doctrine",
    title: "Why Brightening Shouldn't Hurt",
    excerpt:
      "For decades, brightening meant acids, stinging and downtime. We rebuilt the pathway from the skin barrier up — luminosity without a single day of regret.",
    accent: "#a65a2f",
    label: "Illumys®",
    image: "/editorial/story-brightening.png",
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
    accent: "#2f6a7d",
    label: "ε",
    image: "/editorial/story-epsilon.jpg",
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
  const [openItem, setOpenItem] = useState<Record<string, string | null>>({
    brightening: "brightening-0",
  });

  return (
    <section id="science" className="border-b border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHead
          index="05"
          kicker="Editorial & clinical"
          title={
            <>
              The science behind
              <br />
              <em className="text-accent">the glow.</em>
            </>
          }
          note="Two stories define Skinpiens: brightening that honours the barrier, and eczema science that treats the cause — not just the symptom."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {STORIES.map((story, idx) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={idx === 1 ? "lg:mt-16" : undefined}
            >
              <div className="group relative aspect-[4/3] overflow-hidden border border-foreground/15">
                <LocalImage
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-start justify-between p-4">
                  <span className="micro bg-background/85 px-2.5 py-1 text-foreground backdrop-blur">
                    {story.kicker}
                  </span>
                  <span className="display bg-foreground/80 px-2.5 py-0.5 text-2xl text-background backdrop-blur">
                    0{idx + 1}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span
                    className="display text-2xl text-background"
                    style={{ textShadow: "0 1px 20px rgba(0,0,0,.35)" }}
                  >
                    {story.label}
                  </span>
                  <span className="micro text-background/80">Skinpiens Research · MMXXVI</span>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="display text-3xl sm:text-4xl">{story.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty">
                  {story.excerpt}
                </p>

                <Accordion
                  value={openItem[story.id] ? [openItem[story.id]!] : []}
                  onValueChange={(v) =>
                    setOpenItem((prev) => ({ ...prev, [story.id]: v[0] ?? null }))
                  }
                  className="mt-6 border-t border-foreground/15"
                >
                  {story.chapters.map((ch, i) => (
                    <AccordionItem
                      key={ch.q}
                      value={`${story.id}-${i}`}
                      className="border-b border-foreground/15"
                    >
                      <AccordionTrigger className="py-4 text-sm hover:no-underline">
                        <span className="flex items-baseline gap-3 text-left">
                          <span className="micro-sm text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{ch.q}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-muted-foreground">
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
