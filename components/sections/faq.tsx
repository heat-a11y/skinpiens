"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    a: "No. The Illumys® formula is 100% fragrance-free, essential-oil-free and free of harsh acids. It will not trigger fragrance-sensitive skin.",
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(FAQS[0].q);

  return (
    <section className="border-b border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="micro text-muted-foreground">[08] Dermatological advice</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display mb-8 text-[clamp(2rem,4.4vw,3.6rem)]">
              Frequently <em className="text-accent">asked.</em>
            </h2>

            <Accordion
              value={openItem ? [openItem] : []}
              onValueChange={(v) => setOpenItem(v[0] ?? null)}
              className="border-t border-foreground/25"
            >
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={f.q} className="border-b border-foreground/15">
                  <AccordionTrigger className="py-5 text-base hover:no-underline">
                    <span className="flex items-baseline gap-4 text-left">
                      <span className="micro-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-xl sm:text-2xl">{f.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-6 pl-9 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
