"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Beaker,
  Droplets,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TestTube2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { Stars } from "@/components/ui/stars";
import { PRODUCTS } from "@/lib/products";
import { useTheme } from "@/components/providers/theme-provider";
import { useCart } from "@/components/providers/cart-provider";
import type { HeroVariant } from "@/lib/themes";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero({ onConsult }: { onConsult: () => void }) {
  const { themeDef } = useTheme();
  const { addToCart, openCart } = useCart();
  const hero = PRODUCTS.find((p) => p.id === "fortress-plus")!;
  const variant = themeDef.hero as HeroVariant;

  const add = () => {
    addToCart(hero.id);
    openCart();
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-16">
        {variant === "editorial-center" && (
          <EditorialCenter onConsult={onConsult} add={add} hero={hero} />
        )}
        {variant === "editorial" && (
          <EditorialSplit onConsult={onConsult} add={add} hero={hero} />
        )}
        {variant === "split" && <TechnicalLab onConsult={onConsult} add={add} hero={hero} />}
        {variant === "clinical" && <Clinical onConsult={onConsult} add={add} hero={hero} />}
        {variant === "soft-center" && <SoftCenter onConsult={onConsult} add={add} hero={hero} />}
        {variant === "dark-editorial" && (
          <VintageDark onConsult={onConsult} add={add} hero={hero} />
        )}
        {variant === "japanese" && <JapaneseZen onConsult={onConsult} add={add} />}
        {variant === "luxury" && <Luxury onConsult={onConsult} add={add} hero={hero} />}
        {variant === "frosted" && <FrostedGlass onConsult={onConsult} add={add} hero={hero} />}
        {variant === "clinic" && <Clinic onConsult={onConsult} add={add} hero={hero} />}
      </div>
    </section>
  );
}

/* ---------------------------------- shared --------------------------------- */

function CTA({ onConsult, add }: { onConsult: () => void; add: () => void }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button size="lg" className="gap-2 rounded-full" onClick={add}>
        Shop Fortress+ · RM 128.00
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button size="lg" variant="outline" className="gap-2 rounded-full" onClick={onConsult}>
        <Stethoscope className="h-4 w-4 text-theme-accent" />
        Take the Skin Quiz
      </Button>
    </div>
  );
}

function ProductFrame({
  hero,
  add,
  floating,
  className,
}: {
  hero: (typeof PRODUCTS)[number];
  add: () => void;
  floating?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-[2rem] p-4 shadow-2xl shadow-primary/10",
        floating && "animate-[float_7s_ease-in-out_infinite]",
        className,
      )}
    >
      <div className="relative aspect-square">
        <ProductArtwork product={hero} className="h-full w-full" />
        <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-background/85 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-semibold">{hero.name}</p>
              <p className="text-xs text-muted-foreground">{hero.format} · RM 128.00</p>
            </div>
            <Button size="sm" className="rounded-full" onClick={add}>
              Add
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {hero.ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} custom={0} className="flex flex-wrap items-center gap-2">
      {children}
    </motion.div>
  );
}

/* --------------------------- 1 · Aesop (editorial-center) --------------------------- */

function EditorialCenter({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center pt-8 text-center"
    >
      <motion.p
        variants={fadeUp}
        custom={0}
        className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-theme-accent"
      >
        Nº 001 — The Fortress+ Doctrine
      </motion.p>
      <motion.h1
        variants={fadeUp}
        custom={1}
        className="mt-6 max-w-3xl font-heading text-4xl font-medium leading-[1.15] sm:text-5xl lg:text-6xl"
      >
        Brightening that{" "}
        <span className="italic text-theme-accent">never hurts</span>
      </motion.h1>
      <motion.p
        variants={fadeUp}
        custom={2}
        className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
      >
        Fortress+ Brightening Serum with Illumys®. A luminous pathway built on
        the skin barrier — no acids, no sting, no apology.
      </motion.p>
      <motion.div variants={fadeUp} custom={3} className="mt-10">
        <div className="mx-auto w-44 overflow-hidden rounded-full border border-border shadow-lg">
          <ProductArtwork product={hero} className="aspect-square w-full" showBrand={false} />
        </div>
      </motion.div>
      <motion.div variants={fadeUp} custom={4}>
        <CTA onConsult={onConsult} add={add} />
      </motion.div>
      <motion.div variants={fadeUp} custom={5} className="mt-8">
        <Stars rating={hero.rating} reviews={hero.reviews} size={16} />
      </motion.div>
    </motion.div>
  );
}

/* --------------------------- 2 · The Ordinary (split / technical) --------------------------- */

function TechnicalLab({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show">
        <Eyebrow>
          <Badge
            variant="secondary"
            className="border border-border font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            <FlaskConical className="h-3 w-3 text-theme-accent" />
            Formulation FN-101 · Batch 26
          </Badge>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="heading-case mt-6 font-heading text-4xl font-bold uppercase sm:text-5xl lg:text-6xl"
        >
          Brightening,
          <br />
          without the toll
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground"
        >
          Illumys® brightens via a non-irritating pathway. Zero harsh acids. Zero
          stinging. Zero downtime. This is the spec sheet.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
        <motion.div variants={fadeUp} custom={4} className="mt-8">
          <Stars rating={hero.rating} reviews={hero.reviews} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md justify-self-end"
      >
        <div className="border border-foreground/15 bg-card font-mono text-sm shadow-sm">
          <div className="border-b border-foreground/15 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Active Ingredient Specification
          </div>
          {[
            ["Illumys®", "0.3%", "luminosity"],
            ["Tranexamic Acid", "2%", "even-tone"],
            ["Niacinamide", "5%", "barrier"],
            ["pH", "5.5–6.0", "physiological"],
          ].map(([name, dose, role], i) => (
            <div
              key={name}
              className={cn(
                "flex items-center justify-between gap-4 px-4 py-2.5",
                i % 2 === 0 ? "bg-muted/50" : "",
              )}
            >
              <span className="font-medium">{name}</span>
              <span className="ml-auto text-theme-accent">{dose}</span>
              <span className="w-20 text-right text-xs text-muted-foreground">{role}</span>
            </div>
          ))}
          <div className="border-t border-foreground/15 bg-theme-accent px-4 py-2.5 font-semibold text-theme-accent-foreground">
            12-week study · 94% luminosity · 0% stinging
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <ProductArtwork product={hero} className="aspect-square w-32 overflow-hidden rounded-none border border-foreground/15" showBrand={false} />
          <div className="flex-1 rounded-none border border-foreground/15 bg-card p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Batch 26 · 30 ml
            </p>
            <p className="mt-1 font-heading text-lg font-bold">{hero.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">RM 128.00</p>
            <Button size="sm" onClick={add} className="mt-3 w-full rounded-none font-mono uppercase">
              Add to Formula
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 3 · La Roche-Posay (clinical) --------------------------- */

function Clinical({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show">
        <Eyebrow>
          <Badge className="gap-1.5 border border-primary/30 bg-primary/10 text-primary">
            <ShieldCheck className="h-3 w-3" />
            Dermatologist tested
          </Badge>
          <Badge variant="secondary" className="gap-1.5 border border-border">
            Eczema-friendly
          </Badge>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-6 font-heading text-4xl font-bold sm:text-5xl"
        >
          Barrier-first brightening for reactive skin
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Fortress+ with Illumys® delivers visible luminosity while strengthening
          the skin barrier — suitable for sensitive and eczema-prone skin.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
        <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-3 gap-2">
          {[
            { v: "94%", l: "visible luminosity" },
            { v: "0%", l: "stinging reports" },
            { v: "12 wk", l: "dermatological study" },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="font-heading text-lg font-bold text-primary">{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-3">
          <ProductArtwork product={hero} className="aspect-square w-full overflow-hidden rounded-xl" />
        </div>
        <div className="glass absolute -bottom-4 left-1/2 flex w-[85%] -translate-x-1/2 items-center justify-between rounded-xl px-4 py-2.5 text-sm shadow-lg">
          <span className="flex items-center gap-2 text-xs">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Suitable for sensitive skin
          </span>
          <Button size="sm" className="rounded-full" onClick={add}>
            Add
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 4 · Rhode (soft-center) --------------------------- */

function SoftCenter({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="flex flex-col items-center pt-6 text-center">
      <motion.div initial="hidden" animate="show" className="max-w-2xl">
        <Eyebrow>
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            ✦ clean dewy glow ✦
          </span>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-6 font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          Glowy, but make it
          <br />
          <span className="bg-gradient-to-r from-theme-accent to-primary bg-clip-text text-transparent">
            safe for your skin
          </span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Fortress+ gives you that lit-from-within glow with zero irritation.
          Just tap add — it’s that easy.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="mt-8">
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mt-12 w-full max-w-md"
      >
        <ProductFrame hero={hero} add={add} floating />
        <div className="absolute -left-4 top-10 rotate-[-8deg] rounded-full bg-card px-3 py-1.5 text-xs font-medium shadow-lg">
          ✨ glow up
        </div>
        <div className="absolute -right-3 bottom-16 rotate-[6deg] rounded-full bg-card px-3 py-1.5 text-xs font-medium shadow-lg">
          no sting ✓
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 5 · Le Labo (dark-editorial) --------------------------- */

function VintageDark({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show" className="order-2 lg:order-1">
        <Eyebrow>
          <span className="stamp">Nº 002 · Illumys</span>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-6 font-heading text-4xl font-medium sm:text-5xl lg:text-6xl"
        >
          Lumen, distilled
          <br />
          <span className="italic text-theme-accent">for the sensitive.</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Batch No. 002. Fortress+ Brightening Serum — a botanical-alchemist’s
          take on luminosity, compounded at our Kuala Lumpur atelier.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-8 flex items-center gap-4 text-xs text-muted-foreground"
        >
          <span>Batch 002 / 26</span>
          <span className="h-px w-10 bg-border" />
          <span>Compounded 2026</span>
          <span className="h-px w-10 bg-border" />
          <span>Kuala Lumpur</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="order-1 lg:order-2"
      >
        <div className="relative">
          <div
            className="absolute inset-0 -rotate-2 rounded-[2rem]"
            style={{ background: "color-mix(in srgb, var(--theme-accent) 25%, transparent)" }}
          />
          <ProductFrame hero={hero} add={add} className="relative rotate-1" />
          <span className="stamp absolute right-6 top-6">SKINPIENS · Nº 002</span>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 6 · SK-II (japanese / dense) --------------------------- */

function JapaneseZen({
  onConsult,
  add,
}: {
  onConsult: () => void;
  add: () => void;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_1fr]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden lg:flex flex-col items-center gap-3 self-stretch justify-center border-r border-border pr-6"
      >
        <span className="vertical-text font-heading text-2xl tracking-[0.4em] text-theme-accent">
          輝きは傷つけない
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Luminous · Barrier-first
        </span>
      </motion.div>

      <motion.div initial="hidden" animate="show" className="max-w-xl">
        <Eyebrow>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-theme-accent">
            光 / HIKARI — the Illumys® ritual
          </span>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-5 font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Lumière, sans
          <br />
          sacrifice
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-sm leading-relaxed text-muted-foreground"
        >
          A 4-step ritual — cleanse, tone, treat, seal — that restores the
          barrier while it illuminates. Designed for skin that demands proof.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2.5"
      >
        {[
          ["01", "Cleanse", "Epsilon Ceramide Cleanser", "pH 5.5"],
          ["02", "Treat", "Fortress+ Illumys®", "0.3%"],
          ["03", "Seal", "Epsilon Soothing Cream", "3:1:1"],
          ["04", "Maintain", "Veragen POOG", "500 mg"],
        ].map(([n, step, name, data], i) => (
          <div
            key={n}
            className={cn(
              "flex items-center gap-3 border border-border bg-card p-3",
              i === 1 && "border-theme-accent",
            )}
          >
            <span className="font-heading text-lg font-bold text-theme-accent">{n}</span>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">{step}</p>
              <p className="text-sm text-muted-foreground">{name}</p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{data}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border border-border bg-muted/50 px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5">
            <Droplets className="h-3.5 w-3.5 text-theme-accent" />
            Hydration +38%
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-theme-accent" />
            Luminosity ΔE +18.2%
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 7 · Augustinus Bader (luxury) --------------------------- */

function Luxury({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show">
        <Eyebrow>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-theme-accent">
            The Skinpiens Protocol
          </span>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="heading-case mt-6 font-heading text-4xl font-medium sm:text-5xl lg:text-6xl"
        >
          Luminescence,
          <br />
          <span className="italic">engineered</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Illumys® is not an acid. It is a delivery system for luminosity that
          works with the skin’s own barrier biology.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-theme-accent/40 bg-theme-accent/40"
        >
          {[
            ["94%", "luminosity @ wk 8"],
            ["0.1%", "adverse events"],
            ["n=62", "IRB cohort"],
          ].map(([v, l]) => (
            <div key={l} className="bg-card p-3 text-center">
              <p className="font-heading text-xl font-bold text-theme-accent">{v}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="absolute inset-0 m-4 rounded-[2rem] border border-theme-accent/50" />
        <div className="relative ml-4 mt-4 rounded-[2rem] border border-theme-accent/30 bg-card p-3">
          <ProductArtwork product={hero} className="aspect-square w-full overflow-hidden rounded-[1.5rem]" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-theme-accent px-5 py-2 text-sm font-semibold text-theme-accent-foreground">
            RM 128.00
          </div>
        </div>
        <button
          onClick={add}
          className="absolute right-4 top-4 rounded-full border border-theme-accent/60 bg-background/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur transition-colors hover:bg-theme-accent hover:text-theme-accent-foreground"
        >
          + Add
        </button>
      </motion.div>
    </div>
  );
}

/* --------------------------- 8 · Beauty of Joseon (frosted) --------------------------- */

function FrostedGlass({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show">
        <Eyebrow>
          <span className="rounded-full border border-border bg-card/70 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
            Glass-skin formula · Rice-inspired
          </span>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-6 font-heading text-4xl font-semibold sm:text-5xl"
        >
          Glass skin, <span className="text-theme-accent">glass safe</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Layer by layer, Illumys® builds the luminous, bouncy finish K-beauty
          is known for — without a single drop of irritation.
        </motion.p>
        <motion.div variants={fadeUp} custom={3}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
        <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-2 gap-2">
          {[
            ["Hydration", "+38%", "TEWL -27%"],
            ["Glow", "ΔE +18.2", "sensitive-safe"],
          ].map(([label, v, sub]) => (
            <div key={label} className="glass rounded-2xl p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
              <p className="font-heading text-xl font-bold text-theme-accent">{v}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="glass rounded-[2.5rem] p-6">
          <ProductArtwork product={hero} className="aspect-square w-full overflow-hidden rounded-[1.75rem]" />
        </div>
        <div className="glass absolute -bottom-5 left-8 right-8 rounded-2xl px-4 py-3 text-sm">
          <p className="flex items-center justify-between">
            <span className="font-medium">{hero.name}</span>
            <Button size="sm" className="rounded-full" onClick={add}>
              Add
            </Button>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ★ 4.9 · {hero.reviews.toLocaleString()} reviews
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 9 · YTTP (editorial / scandinavian) --------------------------- */

function EditorialSplit({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  const supporting = PRODUCTS[1];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show" className="max-w-xl">
        <Eyebrow>
          <Badge
            variant="secondary"
            className="gap-1.5 border border-border py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em]"
          >
            <Sparkles className="h-3 w-3 text-theme-accent" />
            Clinical skincare · Botanical science
          </Badge>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-5 font-heading text-4xl font-bold text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
        >
          Brightening that <span className="relative whitespace-nowrap">never hurts</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Fortress+ with Illumys® — visible luminosity through a non-irritating
          pathway. No harsh acids, no stinging, no downtime.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Stars rating={hero.rating} reviews={hero.reviews} size={16} />
          <span className="hidden h-4 w-px bg-border sm:block" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">12-week</strong> dermatological study
          </p>
        </motion.div>
        <motion.div variants={fadeUp} custom={4}>
          <CTA onConsult={onConsult} add={add} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto w-full max-w-md"
      >
        <ProductFrame hero={hero} add={add} />
        <div className="absolute -left-6 top-10 hidden w-24 -rotate-6 overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:block">
          <ProductArtwork product={supporting} className="aspect-square w-full" />
        </div>
        <div className="absolute -right-8 bottom-14 hidden w-24 rotate-6 overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:block">
          <ProductArtwork product={PRODUCTS[4]} className="aspect-square w-full" />
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------- 10 · Curology (clinic) --------------------------- */

function Clinic({
  onConsult,
  add,
  hero,
}: {
  onConsult: () => void;
  add: () => void;
  hero: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <motion.div initial="hidden" animate="show">
        <Eyebrow>
          <span className="flex items-center gap-1.5 rounded-full bg-theme-accent/15 px-3 py-1 text-xs font-semibold text-theme-accent">
            <Stethoscope className="h-3.5 w-3.5" />
            Virtual Clinic — open
          </span>
        </Eyebrow>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-6 font-heading text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          Your glow,
          <br />
          prescribed
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Answer 3 questions. Get a tailored Fortress+ regimen built for your
          skin type, concerns and routine — in under a minute.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="mt-8">
          <Button size="lg" className="gap-2 rounded-full" onClick={onConsult}>
            <Beaker className="h-4 w-4" />
            Start My Diagnosis
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <Stars rating={hero.rating} reviews={hero.reviews} size={13} />
            62,000+ routines generated
          </div>
        </motion.div>
        <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap gap-2">
          {["Sensitive-safe", "Eczema-friendly", "Brightening", "Barrier repair"].map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="rounded-3xl border border-border bg-card p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-theme-accent" />
              Your 3-step plan
            </p>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              Step 1 of 3
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-28 shrink-0 overflow-hidden rounded-xl border border-border">
              <ProductArtwork product={hero} className="aspect-square w-full" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between rounded-xl border border-theme-accent/50 bg-theme-accent/5 px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{hero.name}</p>
                  <p className="text-xs text-muted-foreground">Illumys® 0.3%</p>
                </div>
                <Button size="sm" className="rounded-full" onClick={add}>
                  Add
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-2">
                <div>
                  <p className="text-sm font-medium">Epsilon Cream</p>
                  <p className="text-xs text-muted-foreground">Ceramide 3:1:1</p>
                </div>
                <span className="text-sm font-semibold">+ RM 90</span>
              </div>
            </div>
          </div>
          <button
            onClick={onConsult}
            className="mt-4 flex w-full items-center justify-between rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              <TestTube2 className="h-4 w-4" />
              Generate my full regimen
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute -right-4 -top-4 rotate-3 rounded-xl border border-theme-accent/40 bg-card px-3 py-1.5 text-xs font-semibold shadow-lg">
          Free shipping over RM 150
        </div>
      </motion.div>
    </div>
  );
}
