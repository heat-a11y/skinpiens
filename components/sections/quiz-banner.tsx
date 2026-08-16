"use client";

import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, SlidersHorizontal, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";

const STEPS = [
  { icon: ClipboardCheck, title: "Diagnose", sub: "Skin type & barrier state" },
  { icon: SlidersHorizontal, title: "Tailor", sub: "Actives matched to concerns" },
  { icon: Target, title: "Regimen", sub: "A buildable daily ritual" },
];

export function QuizBanner({ onConsult }: { onConsult: () => void }) {
  const { themeDef } = useTheme();
  const clinic = themeDef.layout === "clinic";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-2xl shadow-primary/10 sm:p-12"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--theme-accent) 25%, transparent)" }}
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
              {clinic ? "Virtual Clinic" : "Personalised Skincare"}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              {clinic
                ? "Start with your skin — 3 questions in."
                : "Not sure where to start? Ask your skin."}
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground text-pretty">
              Answer three quick questions and our diagnostic builds a Skinpiens
              regimen tailored to your barrier, concerns and routine — with one-tap
              add-to-bag.
            </p>
            <Button
              size="lg"
              className="mt-6 gap-2 rounded-full"
              onClick={onConsult}
            >
              Take the Skin Quiz
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3">
            {STEPS.map(({ icon: Icon, title, sub }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="glass flex items-center gap-4 rounded-2xl p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-theme-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-heading text-sm font-semibold">
                    {i + 1}. {title}
                  </p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <span className="font-heading text-2xl font-bold text-muted-foreground/25">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
