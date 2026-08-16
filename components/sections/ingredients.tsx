"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, FlaskConical } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/components/providers/theme-provider";

const ACTIVES = [
  { name: "Illumys®", dose: "0.3%", claim: "Non-irritating luminosity", color: "#a65a2f" },
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
  { product: "Epsilon Cream", measure: "TEWL reduction", result: "-27%", cohort: "week 8" },
];

export function IngredientsSection() {
  const [barrierValue, setBarrierValue] = useState(68);
  const { themeDef } = useTheme();

  const copy =
    themeDef.tone === "technical"
      ? {
          kicker: "Active Ingredient Specifications",
          title: "The spec sheet",
          sub: "Every Skinpiens formula declares its key actives, doses and the clinical claims they back.",
        }
      : themeDef.tone === "luxury"
        ? {
            kicker: "Clinical Trial Data",
            title: "Proof, not promises",
            sub: "IRB-approved studies behind every claim — luminosity, tolerance and barrier metrics.",
          }
        : themeDef.tone === "frosted"
          ? {
              kicker: "Hydration Statistics",
              title: "Measured glass-skin gains",
              sub: "Clinical metrics on hydration, glow and barrier integrity — straight from the lab.",
            }
          : themeDef.tone === "scandinavian"
            ? {
                kicker: "Clean Formula Index",
                title: "What’s inside, honestly",
                sub: "Our actives, doses and the botanical science behind each one. No greenwashing.",
              }
            : {
                kicker: "The Formulary Notes",
                title: "Actives with receipts, not rhetoric",
                sub: "Every Skinpiens formula declares its key actives, doses and the clinical claims they back.",
              };

  return (
    <section id="ingredients" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="heading-case font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
          {copy.kicker}
        </p>
        <h2 className="heading-case mt-3 font-heading text-3xl font-bold sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">{copy.sub}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIVES.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: `color-mix(in srgb, ${a.color} 18%, transparent)` }}
              >
                <FlaskConical className="h-5 w-5" style={{ color: a.color }} />
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs font-medium">
                {a.dose}
              </span>
            </div>
            <p className="mt-4 font-heading text-lg font-semibold">{a.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{a.claim}</p>
          </motion.div>
        ))}
      </div>

      {/* Clinical trial data table */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-border">
        <div className="flex items-center justify-between border-b border-border bg-muted/60 px-5 py-4">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.14em]">
            Selected clinical data
          </p>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-theme-accent" />
            IRB-approved studies
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-sm">
            <tbody>
              {TRIALS.map((row, i) => (
                <tr
                  key={`${row.product}-${row.measure}`}
                  className={i % 2 ? "bg-muted/40" : "bg-card"}
                >
                  <td className="px-5 py-3 font-medium">{row.product}</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.measure}</td>
                  <td className="px-5 py-3 font-heading text-base font-bold text-theme-accent">
                    {row.result}
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">
                    {row.cohort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive barrier hydration meter */}
      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="glass rounded-2xl p-6 lg:col-span-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-theme-accent">
                <Droplets className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-semibold">Barrier Hydration Meter</p>
                <p className="text-xs text-muted-foreground">
                  Drag to simulate your barrier’s hydration state.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading text-3xl font-bold text-theme-accent">
                {Math.round((barrierValue + 24) * 0.96)}%
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                hydration score
              </p>
            </div>
          </div>
          <div className="mt-6 px-1">
            <Slider
              min={0}
              max={100}
              value={[barrierValue]}
              onValueChange={(v) => {
                const val = Array.isArray(v) ? v[0] : v;
                setBarrierValue(typeof val === "number" ? val : barrierValue);
              }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>0 · severely compromised</span>
            <span>100 · optimally hydrated</span>
          </div>
          <p className="mt-5 text-sm text-muted-foreground text-pretty">
            {barrierValue < 40 &&
              "Low hydration signal — prioritise ceramide-rich occlusion before any brightening actives."}
            {barrierValue >= 40 &&
              barrierValue < 70 &&
              "Moderate barrier state — pair Illumys® with a triple-ceramide seal to keep gains comfortable."}
            {barrierValue >= 70 &&
              "Strong barrier — full Fortress+ + Epsilon ritual unlocked for maximum luminosity."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-card p-6 lg:col-span-2"
        >
          {[
            ["Clean formula index", "0.0%"],
            ["Paraben / sulfate-free", "100%"],
            ["Eczema-grade standards", "Yes"],
            ["Cruelty-free", "Yes"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0"
            >
              <span className="text-muted-foreground">{label}</span>
              <span className="font-heading font-semibold">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
