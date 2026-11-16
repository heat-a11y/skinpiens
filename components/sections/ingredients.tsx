"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { SectionHead } from "@/components/studio/primitives";
import { useTheme } from "@/components/providers/theme-provider";

const ACTIVES = [
  { name: "Illumys®", dose: "0.3%", claim: "Non-irritating luminosity", color: "#b8863b" },
  { name: "Tranexamic Acid", dose: "2%", claim: "Marks & even tone", color: "#7a8aa0" },
  { name: "Niacinamide", dose: "5%", claim: "Barrier + pore refinement", color: "#c99a6b" },
  { name: "Ceramide NP", dose: "3:1:1", claim: "Lipid matrix repair", color: "#3c7c94" },
  { name: "POOG™", dose: "500 mg", claim: "Gut-skin axis priming", color: "#8a6a4a" },
  { name: "Epsilon-Ferm", dose: "7%", claim: "Microbiome soother", color: "#6a7a70" },
];

const TRIALS = [
  { product: "Fortress+ Serum", measure: "Luminosity ΔE", result: "+18.2%", cohort: "n = 62 · 12 wks" },
  { product: "Fortress+ Serum", measure: "Stinging reports", result: "0%", cohort: "sensitive cohort" },
  { product: "Epsilon Cream", measure: "Flare calming", result: "3 days", cohort: "median · n = 41" },
  { product: "Epsilon Cream", measure: "TEWL reduction", result: "−27%", cohort: "week 8" },
];

export function IngredientsSection() {
  const [barrierValue, setBarrierValue] = useState(68);
  const { themeDef } = useTheme();

  const copy =
    themeDef.tone === "technical"
      ? {
          kicker: "Ingredient specifications",
          title: <>The spec sheet</>,
          sub: "Every Skinpiens formula declares its key actives, doses and the clinical claims they back.",
        }
      : themeDef.tone === "luxury"
        ? {
            kicker: "Clinical trial data",
            title: <>Proof, not promises</>,
            sub: "IRB-approved studies behind every claim — luminosity, tolerance and barrier metrics.",
          }
        : themeDef.tone === "frosted"
          ? {
              kicker: "Hydration statistics",
              title: <>Measured glass-skin gains</>,
              sub: "Clinical metrics on hydration, glow and barrier integrity — straight from the lab.",
            }
          : themeDef.tone === "scandinavian"
            ? {
                kicker: "Clean formula index",
                title: <>What’s inside, honestly</>,
                sub: "Our actives, doses and the botanical science behind each one. No greenwashing.",
              }
            : {
                kicker: "The formulary notes",
                title: (
                  <>
                    Actives with receipts, <em className="text-accent">not rhetoric.</em>
                  </>
                ),
                sub: "Every Skinpiens formula declares its key actives, doses and the clinical claims they back.",
              };

  return (
    <section
      id="ingredients"
      className="border-b border-foreground/15"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHead index="04" kicker={copy.kicker} title={copy.title} note={copy.sub} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* actives list */}
          <div className="lg:col-span-7">
            <p className="micro mb-4 text-muted-foreground">The index</p>
            <div className="border-t border-foreground/15">
              {ACTIVES.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group grid grid-cols-12 items-baseline gap-2 border-b border-foreground/15 py-4 transition-colors hover:bg-foreground hover:text-background sm:gap-4 sm:py-5"
                >
                  <span className="micro col-span-1 text-muted-foreground group-hover:text-background/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-7 flex items-center gap-3 sm:col-span-4">
                    <span
                      className="inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: a.color }}
                    />
                    <span className="display text-xl leading-none sm:text-2xl">{a.name}</span>
                  </span>
                  <span className="col-span-4 hidden text-sm text-muted-foreground group-hover:text-background/70 sm:block">
                    {a.claim}
                  </span>
                  <span className="micro col-span-4 text-right sm:col-span-3">
                    {a.dose}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* meter */}
          <div className="lg:col-span-5">
            <div className="border border-foreground/20 p-5 sm:p-6">
              <div className="flex items-start justify-between border-b border-foreground/15 pb-4">
                <div>
                  <p className="micro text-muted-foreground">Barrier hydration</p>
                  <p className="display mt-2 text-5xl tracking-[-0.01em]">
                    {Math.round((barrierValue + 24) * 0.96)}
                    <span className="text-xl">%</span>
                  </p>
                </div>
                <Droplets className="h-5 w-5 text-accent" />
              </div>

              <div className="mt-6">
                <Slider
                  min={0}
                  max={100}
                  value={[barrierValue]}
                  aria-label="Barrier hydration simulation"
                  onValueChange={(v) => {
                    const val = Array.isArray(v) ? v[0] : v;
                    setBarrierValue(typeof val === "number" ? val : barrierValue);
                  }}
                />
              </div>
              <div className="micro-sm mt-2 flex justify-between text-muted-foreground">
                <span>0 · compromised</span>
                <span>100 · optimal</span>
              </div>

              <p className="mt-5 border-t border-foreground/15 pt-4 text-sm leading-relaxed text-muted-foreground">
                {barrierValue < 40 &&
                  "Low hydration signal — prioritise ceramide-rich occlusion before any brightening actives."}
                {barrierValue >= 40 &&
                  barrierValue < 70 &&
                  "Moderate barrier state — pair Illumys® with a triple-ceramide seal to keep gains comfortable."}
                {barrierValue >= 70 &&
                  "Strong barrier — the full Fortress+ + Epsilon ritual is unlocked for maximum luminosity."}
              </p>
            </div>

            <div className="mt-4 border border-foreground/20">
              {[
                ["Clean formula index", "0.0%"],
                ["Paraben / sulfate-free", "100%"],
                ["Eczema-grade standards", "Yes"],
                ["Cruelty-free", "Yes"],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-5 py-3 text-sm ${
                    i !== 0 ? "border-t border-foreground/15" : ""
                  }`}
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="micro text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* clinical table */}
        <div className="mt-16">
          <div className="mb-4 flex items-end justify-between">
            <p className="micro text-muted-foreground">Selected clinical data</p>
            <p className="micro flex items-center gap-2 text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              IRB-approved
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-y border-foreground/25">
                  {["Formula", "Measure", "Result", "Cohort"].map((h) => (
                    <th
                      key={h}
                      className="micro px-2 py-3 text-left font-normal text-muted-foreground last:text-right"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRIALS.map((row) => (
                  <tr
                    key={`${row.product}-${row.measure}`}
                    className="border-b border-foreground/15 transition-colors hover:bg-foreground hover:text-background"
                  >
                    <td className="px-2 py-4 text-sm">{row.product}</td>
                    <td className="px-2 py-4 text-sm text-muted-foreground">{row.measure}</td>
                    <td className="display px-2 py-4 text-2xl text-accent">{row.result}</td>
                    <td className="micro px-2 py-4 text-right text-muted-foreground">
                      {row.cohort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
