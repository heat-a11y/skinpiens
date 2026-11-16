"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ClipboardCheck, SlidersHorizontal, Target } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

const STEPS = [
  { icon: ClipboardCheck, title: "Diagnose", sub: "Skin type & barrier state" },
  { icon: SlidersHorizontal, title: "Tailor", sub: "Actives matched to concerns" },
  { icon: Target, title: "Regimen", sub: "A buildable daily ritual" },
];

export function QuizBanner({ onConsult }: { onConsult: () => void }) {
  const { themeDef } = useTheme();
  const clinic = themeDef.hero === "clinic";

  return (
    <section className="border-b border-foreground/15 bg-muted/30">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="micro text-muted-foreground">
              [07] {clinic ? "Virtual clinic" : "Personalised skincare"}
            </p>
            <h2 className="display mt-5 text-[clamp(2.4rem,5.6vw,4.6rem)]">
              Not sure where
              <br />
              to start? <em className="text-accent">Ask your skin.</em>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground text-pretty">
              Three questions. Our diagnostic reads your barrier, concerns and
              routine, then builds a Skinpiens regimen with one-tap add-to-bag.
            </p>
            <button
              onClick={onConsult}
              className="group mt-8 flex items-center justify-between gap-12 bg-foreground px-5 py-4 text-background transition-colors hover:bg-accent hover:text-accent-foreground"
              data-cursor="Start"
            >
              <span className="micro">Take the skin quiz · 60 seconds</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <div className="border-t border-foreground/20">
              {STEPS.map(({ icon: Icon, title, sub }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex items-start gap-4 border-b border-foreground/15 py-5"
                >
                  <span className="micro mt-1 text-muted-foreground">
                    0{i + 1}
                  </span>
                  <Icon className="mt-0.5 h-4 w-4 text-accent" />
                  <div className="flex-1">
                    <p className="text-base">{title}</p>
                    <p className="text-sm text-muted-foreground">{sub}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </motion.div>
              ))}
            </div>
            <p className="micro mt-5 text-muted-foreground">
              No account needed · Results in 60 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
