"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { QuickViewDialog } from "@/components/ui/quick-view-dialog";
import { SectionHead } from "@/components/studio/primitives";
import { PRODUCTS, formatMYR } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useTheme } from "@/components/providers/theme-provider";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "all", label: "All" },
  { value: "Skin", label: "Skin" },
  { value: "Eczema Range", label: "Eczema" },
  { value: "Supplement", label: "Supplement" },
] as const;

export function ProductGrid() {
  const { themeDef } = useTheme();
  const [active, setActive] = useState<string>("all");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const layout = themeDef.products;
  const filtered = useMemo(
    () =>
      active === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active],
  );

  const count = (v: string) =>
    v === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === v).length;

  if (layout === "index") {
    return (
      <section id="products" className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHead
          index="02"
          kicker="The Formulary"
          title={
            <>
              Four formulas.
              <br />
              <em className="text-accent">Nothing spare.</em>
            </>
          }
          note="Every product declares its actives, its dose and the clinical claim behind it. Pharmacist-formulated in Kuala Lumpur."
        />

        <IndexTable
          products={filtered}
          active={active}
          setActive={setActive}
          count={count}
          onQuickView={setQuickView}
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/15 pt-5">
          <p className="micro text-muted-foreground">
            {filtered.length} of {PRODUCTS.length} formulas shown
          </p>
          <Link
            href="/routine"
            className="micro link-draw flex items-center gap-2 text-foreground"
            data-cursor="Build"
          >
            Build a routine <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <QuickViewDialog
          product={quickView}
          open={quickView !== null}
          onOpenChange={(open) => !open && setQuickView(null)}
        />
      </section>
    );
  }

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="heading-case font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
            {themeDef.tone === "technical"
              ? "Active Ingredient Index"
              : themeDef.tone === "luxury"
                ? "The Protocol"
                : "The Formulary"}
          </p>
          <h2 className="heading-case mt-3 font-heading text-3xl font-bold sm:text-4xl">
            The Collection
          </h2>
        </div>
        <Tabs value={active} onValueChange={setActive} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="flex-1 sm:flex-none">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {layout === "carousel" ? (
        <div className="group/carousel relative">
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
            {filtered.map((product, i) => (
              <div key={product.id} className="w-[270px] shrink-0 snap-start sm:w-[290px]">
                <ProductCard
                  product={product}
                  index={i}
                  variant="carousel"
                  onQuickView={setQuickView}
                />
              </div>
            ))}
          </div>
          <CarouselArrows />
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-5",
            layout === "grid-2" && "sm:grid-cols-2",
            layout === "grid-3" && "sm:grid-cols-2 lg:grid-cols-3",
            layout === "grid-4" && "grid-cols-2 lg:grid-cols-4",
          )}
        >
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              variant={layout === "grid-2" ? "numbered" : layout === "grid-4" ? "compact" : "default"}
              onQuickView={setQuickView}
            />
          ))}
        </div>
      )}

      <QuickViewDialog
        product={quickView}
        open={quickView !== null}
        onOpenChange={(open) => !open && setQuickView(null)}
      />
    </section>
  );
}

/* ------------------------------ index layout ------------------------------ */

function IndexTable({
  products,
  active,
  setActive,
  count,
  onQuickView,
}: {
  products: Product[];
  active: string;
  setActive: (v: string) => void;
  count: (v: string) => number;
  onQuickView: (p: Product) => void;
}) {
  const { addToCart, openCart } = useCart();
  const [hovered, setHovered] = useState<Product | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 1200 });

  return (
    <div className="mt-12">
      <div className="mb-1 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-foreground/15 pb-3">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setActive(t.value)}
            className={cn(
              "micro flex items-center gap-2 pb-1 transition-colors",
              active === t.value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "inline-block h-1.5 w-1.5 rounded-full",
                active === t.value ? "bg-signal" : "bg-foreground/20",
              )}
            />
            {t.label}
            <span className="text-[8px] opacity-50">{String(count(t.value)).padStart(2, "0")}</span>
          </button>
        ))}
        <p className="micro ml-auto hidden text-muted-foreground sm:block">
          Hover to inspect
        </p>
      </div>

      <div
        className="relative"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width });
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {products.map((product, i) => (
          <div key={product.id} className="group">
            <div
              className="index-row flex items-start gap-3 border-b border-foreground/15 px-1 py-5 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 lg:py-6"
              onMouseEnter={() => setHovered(product)}
            >
              <div className="micro w-5 shrink-0 pt-1.5 text-muted-foreground sm:col-span-1 sm:w-auto sm:pt-0">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1 sm:col-span-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex flex-col gap-1"
                  data-cursor="Open"
                >
                  <span className="display text-2xl leading-none sm:text-[2rem]">
                    {shortName(product.name)}
                  </span>
                  <span className="micro index-row-muted text-muted-foreground">
                    {product.line} · {product.format}
                  </span>
                </Link>
              </div>

              <div className="index-row-muted hidden text-sm text-muted-foreground sm:col-span-3 sm:block">
                {product.ingredients.slice(0, 2).join(" · ")}
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2.5 sm:col-span-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="display text-lg tracking-[0] sm:text-xl">
                  {formatMYR(product.price)}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      addToCart(product.id);
                      openCart();
                    }}
                    aria-label={`Add ${product.name} to bag`}
                    className="flex h-8 w-8 items-center justify-center border border-foreground/20 transition-colors hover:bg-signal hover:text-ink group-hover:border-background/40 sm:h-9 sm:w-9"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onQuickView(product)}
                    aria-label={`Quick view ${product.name}`}
                    className="hidden h-9 w-9 items-center justify-center border border-foreground/20 transition-colors hover:bg-signal hover:text-ink group-hover:border-background/40 sm:flex"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* cursor-tracked artwork */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute z-20 hidden h-[220px] w-[176px] overflow-hidden border border-foreground/20 lg:block"
            style={{
              left: Math.min(Math.max(pos.x + 24, 0), Math.max(pos.w - 200, 0)),
              top: pos.y - 110,
            }}
          >
            <ProductArtwork product={hovered} className="h-full w-full" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function shortName(name: string) {
  return name
    .replace("Brightening Serum with Illumys®", "")
    .replace("Ultra Soothing ", "")
    .replace("Barrier Restoring Ceramide ", "")
    .trim();
}

function CarouselArrows() {
  const scroll = (dir: number) => {
    const el = document.querySelector<HTMLElement>("#products .no-scrollbar");
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };
  return (
    <div className="mt-2 flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        aria-label="Scroll products left"
        onClick={() => scroll(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        aria-label="Scroll products right"
        onClick={() => scroll(1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
