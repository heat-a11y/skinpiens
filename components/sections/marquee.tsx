import { Ticker } from "@/components/studio/primitives";
import { Leaf, ShieldCheck, Sparkle, Truck } from "lucide-react";

const ACTIVES = [
  "ILLUMYS®",
  "CERAMIDE NP",
  "TRANEXAMIC 2%",
  "POOG™",
  "NIACINAMIDE 5%",
  "EPSILON-FERM",
  "BETA-GLUCAN",
  "CICA",
  "MARINE COLLAGEN",
  "PANTENOL 5%",
];

export function ActivesMarquee() {
  return (
    <section
      className="border-b border-foreground/15 bg-background py-5"
      aria-label="Key actives"
    >
      <Ticker items={ACTIVES} speed={46} />
    </section>
  );
}

const TRUST = [
  { icon: ShieldCheck, title: "Eczema-grade", sub: "Dermatologist-tested" },
  { icon: Leaf, title: "Clinical botanicals", sub: "Non-irritating actives" },
  { icon: Sparkle, title: "Sensitive-safe", sub: "No harsh acids" },
  { icon: Truck, title: "Free shipping", sub: "On orders over RM 150" },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-2 border-b border-foreground/15 lg:grid-cols-4">
        {TRUST.map(({ icon: Icon, title, sub }, i) => (
          <div
            key={title}
            className="flex items-start gap-3 border-foreground/15 py-8 pr-4 sm:pr-8 [&:not(:nth-child(2n))]:border-r lg:[&:not(:last-child)]:border-r lg:[&:nth-child(2n)]:border-r"
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="micro text-foreground">{title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
              <p className="micro-sm mt-3 text-muted-foreground/60">
                0{i + 1} — 04
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
