"use client";

import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { Stars } from "@/components/ui/stars";
import { PRODUCTS } from "@/lib/products";
import { useTheme } from "@/components/providers/theme-provider";
import { useCart } from "@/components/providers/cart-provider";

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
  const supporting = [PRODUCTS[1], PRODUCTS[4]];
  const layout = themeDef.layout;

  const uppercase = layout === "split" || layout === "clinic";
  const centered = layout === "center";

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-16">
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 ${
            centered ? "lg:grid-cols-1 lg:justify-items-center lg:text-center" : ""
          }`}
        >
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className={centered ? "max-w-2xl" : "max-w-xl"}
          >
            <motion.div variants={fadeUp} custom={0} className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="gap-1.5 border border-border py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em]"
              >
                <Sparkles className="h-3 w-3 text-theme-accent" />
                Clinical skincare · Botanical science
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className={`mt-5 font-heading font-bold text-balance ${
                uppercase ? "uppercase tracking-tight" : ""
              } ${
                centered
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
              }`}
            >
              Brightening that{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">never hurts</span>
                <span
                  className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1"
                  style={{
                    background: "color-mix(in srgb, var(--theme-accent) 35%, transparent)",
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
            >
              Fortress+ Brightening Serum with <strong className="text-foreground">Illumys®</strong> delivers
              visible luminosity through a non-irritating pathway — no harsh acids, no stinging, no
              downtime. Eczema-grade barrier repair, engineered in Malaysia.
            </motion.p>

            {/* Trust metrics */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <Stars rating={hero.rating} reviews={hero.reviews} size={16} />
              <span className="hidden h-4 w-px bg-border sm:block" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">12-week</strong> dermatological study
              </p>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Sensitive-safe</strong> · Fragrance-free
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className={`mt-8 flex flex-wrap gap-3 ${
                centered ? "justify-center" : ""
              }`}
            >
              <Button
                size="lg"
                className="gap-2 rounded-full"
                onClick={() => {
                  addToCart(hero.id);
                  openCart();
                }}
              >
                Shop Fortress+ · RM 128.00
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full"
                onClick={onConsult}
              >
                <FlaskConical className="h-4 w-4 text-theme-accent" />
                Take the Skin Quiz
              </Button>
            </motion.div>

            {/* Ritual / horizontal flow for ritual themes */}
            {layout === "ritual" && (
              <motion.div
                variants={fadeUp}
                custom={5}
                className="mt-8 grid max-w-lg grid-cols-3 gap-2"
              >
                {[
                  ["01", "Cleanse", "Barrier cleanser"],
                  ["02", "Treat", "Illumys® serum"],
                  ["03", "Seal", "Ceramide cream"],
                ].map(([n, title, sub]) => (
                  <div key={n} className="rounded-xl border border-border bg-card p-3 text-center">
                    <p className="font-heading text-xs font-bold text-theme-accent">{n}</p>
                    <p className="mt-1 font-heading text-sm font-semibold">{title}</p>
                    <p className="text-[11px] text-muted-foreground">{sub}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Visual */}
          {!centered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="glass relative overflow-hidden rounded-[2rem] p-4 shadow-2xl shadow-primary/10">
                <div className="relative aspect-square">
                  <ProductArtwork product={hero} className="h-full w-full" />
                  <div className="absolute left-3 top-3">
                    <Badge className="gap-1 bg-background/80 text-foreground backdrop-blur">
                      <Sparkles className="h-3 w-3 text-theme-accent" />
                      Hero · Illumys®
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-background/85 p-3 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-heading text-sm font-semibold">{hero.name}</p>
                        <p className="text-xs text-muted-foreground">{hero.format} · RM 128.00</p>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() => {
                          addToCart(hero.id);
                          openCart();
                        }}
                      >
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

              {/* Floating supporting products */}
              <div className="absolute -left-6 top-10 hidden w-24 -rotate-6 overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:block">
                <ProductArtwork product={supporting[0]} className="aspect-square w-full" />
                <p className="truncate px-2 py-1 text-[10px] font-medium">Epsilon Cream</p>
              </div>
              <div className="absolute -right-8 bottom-14 hidden w-24 rotate-6 overflow-hidden rounded-xl border border-border bg-card shadow-xl sm:block">
                <ProductArtwork product={supporting[1]} className="aspect-square w-full" />
                <p className="truncate px-2 py-1 text-[10px] font-medium">POOG Collagen</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
