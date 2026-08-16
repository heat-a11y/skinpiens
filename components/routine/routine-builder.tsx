"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { formatMYR, getProduct } from "@/lib/products";
import type { Product, SkinConcern } from "@/lib/types";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

type SkinType = "Oily" | "Combination" | "Dry" | "Sensitive" | "Normal";
type Routine = "Minimal 3-step" | "Full ritual" | "Barrier-first";

interface RegimenItem {
  product: Product;
  role: string;
}

function buildRegimen(skinType: SkinType, concerns: SkinConcern[], routine: Routine): RegimenItem[] {
  const pick = (id: string) => getProduct(id)!;
  const result: RegimenItem[] = [];

  const barrierConcern =
    concerns.includes("Redness / Eczema") ||
    concerns.includes("Barrier Repair") ||
    concerns.includes("Sensitive") ||
    skinType === "Sensitive";

  if (routine === "Barrier-first" || barrierConcern) {
    result.push({ product: pick("epsilon-cleanser"), role: "AM/PM gentle cleanse" });
    result.push({ product: pick("epsilon-cream"), role: "Ceramide barrier lock" });
    if (concerns.includes("Redness / Eczema") || skinType === "Sensitive") {
      result.push({ product: pick("epsilon-mist"), role: "Instant redness relief" });
    }
  } else if (routine === "Minimal 3-step") {
    result.push({ product: pick("epsilon-cleanser"), role: "AM/PM gentle cleanse" });
    result.push({ product: pick("epsilon-cream"), role: "Ceramide barrier lock" });
  }

  if (concerns.includes("Brightening")) {
    result.push({ product: pick("fortress-plus"), role: "Illumys® brightening serum" });
  }
  if (routine === "Full ritual" && !result.some((r) => r.product.id === "fortress-plus")) {
    result.push({ product: pick("fortress-plus"), role: "Illumys® brightening serum" });
  }

  if (concerns.includes("Aging")) {
    result.push({ product: pick("nuca-revobiotic"), role: "NUCA® RevoBiotic" });
  }
  if (concerns.includes("Dehydration") || skinType === "Dry") {
    result.push({ product: pick("nuca-revogard"), role: "NUCA® RevoGard" });
  }

  if (routine === "Full ritual") {
    const ids = result.map((r) => r.product.id);
    for (const id of ["epsilon-mist", "nuca-revogard"]) {
      if (!ids.includes(id)) result.push({ product: pick(id), role: "Full ritual add-on" });
    }
  }

  return result;
}

const STEPS = 3;

export function RoutineBuilder() {
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [concerns, setConcerns] = useState<SkinConcern[]>([]);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [done, setDone] = useState(false);
  const { addToCart, openCart } = useCart();

  const regimen = buildRegimen(
    skinType ?? "Normal",
    concerns.length ? concerns : ["Dehydration"],
    routine ?? "Minimal 3-step",
  );

  const toggleConcern = (c: SkinConcern) =>
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const reset = () => {
    setStep(0);
    setSkinType(null);
    setConcerns([]);
    setRoutine(null);
    setDone(false);
  };

  const canNext =
    (step === 0 && skinType) ||
    (step === 1 && concerns.length > 0) ||
    step === 2;

  const addAll = () => {
    regimen.forEach((r) => addToCart(r.product.id));
    openCart();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="mb-10 text-center">
        <p className="heading-case font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
          <Sparkles className="mr-1 inline h-3.5 w-3.5" />
          Virtual Clinic
        </p>
        <h1 className="heading-case mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Build your ritual
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-pretty">
          A 3-step diagnostic that tailors a Skinpiens regimen to your barrier,
          concerns and routine.
        </p>
      </div>

      {!done ? (
        <>
          <div className="mb-6">
            <div className="flex gap-1.5">
              {Array.from({ length: STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors duration-300",
                    i <= step ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
            <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Step {step + 1} of {STEPS}
            </p>
          </div>

          <div className="relative min-h-[260px] rounded-3xl border border-border bg-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-heading text-xl font-semibold">
                    How would you describe your skin type?
                  </h2>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {(["Oily", "Combination", "Dry", "Sensitive", "Normal"] as SkinType[]).map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => setSkinType(t)}
                          className={cn(
                            "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                            skinType === t
                              ? "border-primary bg-primary/10"
                              : "border-border hover:bg-muted",
                          )}
                        >
                          {t}
                          <span
                            className={cn(
                              "h-4 w-4 rounded-full border-2 transition-colors",
                              skinType === t ? "border-primary bg-primary" : "border-muted-foreground/40",
                            )}
                          />
                        </button>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-heading text-xl font-semibold">
                    What are your main skin concerns?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">Select all that apply.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {([
                      "Brightening",
                      "Redness / Eczema",
                      "Barrier Repair",
                      "Dehydration",
                      "Aging",
                    ] as SkinConcern[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleConcern(c)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                          concerns.includes(c)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-heading text-xl font-semibold">
                    How committed is your routine?
                  </h2>
                  <div className="mt-5 space-y-2">
                    {(["Minimal 3-step", "Full ritual", "Barrier-first"] as Routine[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRoutine(r)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                          routine === r
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        {r}
                        <span
                          className={cn(
                            "h-4 w-4 rounded-full border-2 transition-colors",
                            routine === r ? "border-primary bg-primary" : "border-muted-foreground/40",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              {step < STEPS - 1 ? (
                <Button onClick={() => setStep((s) => Math.min(STEPS - 1, s + 1))} disabled={!canNext} className="gap-1">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={() => setDone(true)} disabled={!canNext} className="gap-1">
                  See my ritual
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-border bg-card"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-theme-accent">
                Your tailored regimen
              </p>
              <h2 className="mt-1 font-heading text-xl font-bold">
                {regimen.length} products · {formatMYR(regimen.reduce((s, r) => s + r.product.price, 0))}
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Retake
            </Button>
          </div>
          <div className="space-y-2 p-4">
            {regimen.map((r, i) => (
              <div
                key={r.product.id}
                className="flex items-center gap-4 rounded-2xl border border-border p-3"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
                  <ProductArtwork product={r.product} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {r.role}
                  </p>
                  <p className="truncate font-heading font-semibold">{r.product.name}</p>
                </div>
                <span className="text-sm font-semibold">{formatMYR(r.product.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-6 py-4">
            <Button size="lg" className="w-full gap-2 rounded-full" onClick={addAll}>
              <ShoppingBag className="h-4 w-4" />
              Add all {regimen.length} to bag
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
