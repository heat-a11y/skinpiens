"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** La Roche-Posay — dermatological FAQ. */
const FAQS = [
  {
    q: "Is Fortress+ safe for eczema-prone skin?",
    a: "Yes. Fortress+ is formulated to eczema-grade standards — fragrance-free, dye-free and non-comedogenic. In our sensitive-skin cohort, 0% of subjects reported stinging. Patch-test alongside Epsilon Ultra Soothing Cream for a 2-week introduction.",
  },
  {
    q: "How quickly should I expect results?",
    a: "Barrier comfort within the first week; visible luminosity in 4–8 weeks. Our 12-week study recorded a median luminosity improvement of +18.2% ΔE with continued use.",
  },
  {
    q: "Can I use it with eczema medication?",
    a: "We advise consulting your dermatologist. Fortress+ is designed to be compatible with barrier-repair protocols, but prescribed topicals should always take precedence in flare zones.",
  },
  {
    q: "Does it contain fragrance or essential oils?",
    a: "No. Illumys® formula is 100% fragrance-free, essential-oil-free and free of harsh acids. It will not trigger fragrance-sensitive skin.",
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(FAQS[0].q);
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Dermatological Advice
            </p>
            <h2 className="mt-1 font-heading text-3xl font-bold">Frequently asked</h2>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card px-5">
          <Accordion
            value={openItem ? [openItem] : []}
            onValueChange={(v) => setOpenItem(v[0] ?? null)}
          >
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}
