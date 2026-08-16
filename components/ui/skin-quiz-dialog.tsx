"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    result.push({ product: pick("veragen-nuca"), role: "NUCA night renewal" });
  }
  if (concerns.includes("Dehydration") || skinType === "Dry") {
    result.push({ product: pick("veragen-poog"), role: "Inner-barrier collagen" });
  }

  if (routine === "Full ritual") {
    const ids = result.map((r) => r.product.id);
    for (const id of ["epsilon-mist", "veragen-poog"]) {
      if (!ids.includes(id)) result.push({ product: pick(id), role: "Full ritual add-on" });
    }
  }

  return result;
}

const STEPS = 3;

export function SkinQuizDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [concerns, setConcerns] = useState<SkinConcern[]>([]);
  const [routine, setRoutine] = useState<Routine | null>(null);
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
  };

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) setTimeout(reset, 300);
  };

  const next = () => setStep((s) => Math.min(STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const canNext =
    (step === 0 && skinType) ||
    (step === 1 && concerns.length > 0) ||
    step === 2;

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <button
          aria-label="Close consultation"
          onClick={() => close(false)}
          className="absolute right-3 top-3 z-20 rounded-full bg-background/70 p-2 backdrop-blur transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="flex items-center gap-2 font-heading">
            <Sparkles className="h-4 w-4 text-theme-accent" />
            Skin Consultation
          </DialogTitle>
          <DialogDescription>
            A 3-step diagnostic to tailor your Skinpiens regimen.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pt-4">
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

        <div className="relative min-h-[320px] px-6 py-5">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                <h4 className="font-heading text-lg font-semibold">
                  How would you describe your skin type?
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {(["Oily", "Combination", "Dry", "Sensitive", "Normal"] as SkinType[]).map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setSkinType(t)}
                        className={cn(
                          "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
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
                className="space-y-3"
              >
                <h4 className="font-heading text-lg font-semibold">
                  What are your main skin concerns?
                </h4>
                <p className="text-sm text-muted-foreground">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
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
                className="space-y-3"
              >
                <h4 className="font-heading text-lg font-semibold">
                  How committed is your routine?
                </h4>
                <div className="space-y-2">
                  {(["Minimal 3-step", "Full ritual", "Barrier-first"] as Routine[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRoutine(r)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
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
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < STEPS - 1 ? (
            <Button onClick={next} disabled={!canNext} className="gap-1">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="gap-1"
              onClick={() => {
                regimen.forEach((r) => addToCart(r.product.id));
                close(false);
                openCart();
              }}
            >
              Add My Regimen ({regimen.length})
            </Button>
          )}
        </div>

        <AnimatePresence>
          {step === STEPS - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-h-48 space-y-2 overflow-y-auto border-t border-border bg-muted/40 px-6 py-4"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Your tailored regimen
              </p>
              {regimen.map((r) => (
                <div key={r.product.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border">
                    <ProductArtwork product={r.product} className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{r.product.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatMYR(r.product.price)}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
