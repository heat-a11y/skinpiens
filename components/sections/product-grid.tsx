"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { QuickViewDialog } from "@/components/ui/quick-view-dialog";
import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "all", label: "All" },
  { value: "Skin", label: "Skin" },
  { value: "Eczema Range", label: "Eczema Range" },
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

  const heading = themeDef.tone === "technical" ? "The Formulary" : "The Collection";

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
            {heading}
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
              <div
                key={product.id}
                className="w-[270px] shrink-0 snap-start sm:w-[290px]"
              >
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
