"use client";

import { motion } from "framer-motion";
import { Droplets, Sparkles, Sun, Waves } from "lucide-react";
import { SectionHead } from "@/components/studio/primitives";

const STEPS = [
  { icon: Sun, title: "Cleanse", sub: "Epsilon ceramide cleanser", data: "pH 5.5" },
  { icon: Droplets, title: "Treat", sub: "Fortress+ Illumys® 0.3%", data: "AM & PM" },
  { icon: Waves, title: "Seal", sub: "Epsilon soothing cream", data: "3:1:1" },
  { icon: Sparkles, title: "Maintain", sub: "Veragen inner-barrier", data: "Daily" },
];

export function RitualStrip() {
  return (
    <section className="border-b border-foreground/15">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHead
          index="03"
          kicker="The Ritual"
          title={
            <>
              Four steps <em className="text-accent">to light.</em>
            </>
          }
          note="Cleanse → treat → seal → maintain. A sequence, not a scramble — built to be layered in under four minutes."
        />

        <div className="mt-12 grid border-t border-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, sub, data }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between gap-16 border-b border-foreground/15 px-0 py-6 sm:px-5 sm:[&:not(:nth-child(2n+1))]:border-l lg:border-b-0 lg:[&:not(:first-child)]:border-l"
            >
              <div className="flex items-start justify-between">
                <span className="display text-[clamp(3rem,6vw,5rem)] leading-none text-foreground/15 transition-colors duration-500 group-hover:text-accent">
                  0{i + 1}
                </span>
                <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <div>
                <p className="display text-2xl">{title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
                <p className="micro mt-5 border-t border-foreground/15 pt-3 text-muted-foreground">
                  {data}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
