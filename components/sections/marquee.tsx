import { Leaf, ShieldCheck, Sparkle, TestTube2, Truck } from "lucide-react";

const ACTIVES = [
  "ILLUMYS®",
  "CERAMIDE NP",
  "TRANEXAMIC ACID 2%",
  "POOG™",
  "NIACINAMIDE 5%",
  "EPSILON-FERM COMPLEX",
  "BETA-GLUCAN",
  "CICA COMPLEX",
  "MARINE COLLAGEN",
  "PANTENOL 5%",
];

export function ActivesMarquee() {
  return (
    <section className="border-y border-border bg-muted/40 py-3" aria-hidden>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8">
              {ACTIVES.map((a) => (
                <span
                  key={`${dup}-${a}`}
                  className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  <TestTube2 className="h-3.5 w-3.5 text-theme-accent" />
                  {a}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: ShieldCheck, title: "Eczema-grade", sub: "Dermatologist-tested" },
  { icon: Leaf, title: "Clinical Botanicals", sub: "Non-irritating actives" },
  { icon: Sparkle, title: "Sensitive-safe", sub: "No harsh acids" },
  { icon: Truck, title: "Free Shipping", sub: "Over RM 150" },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-4 py-10 lg:grid-cols-4">
        {TRUST.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-theme-accent">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
