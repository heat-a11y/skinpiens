"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ui/product-card";
import { QuickViewDialog } from "@/components/ui/quick-view-dialog";
import { PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";

const TABS = [
  { value: "all", label: "All" },
  { value: "Skin", label: "Skin" },
  { value: "Eczema Range", label: "Eczema Range" },
  { value: "Supplement", label: "Supplement" },
] as const;

export function ProductGrid() {
  const [active, setActive] = useState<string>("all");
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active],
  );

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
            The Formulary
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Engineered for sensitive skin.
            <br />
            <span className="text-muted-foreground">Obsessed with results.</span>
          </h2>
        </div>
        <Tabs
          value={active}
          onValueChange={setActive}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto">
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="flex-1 sm:flex-none">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={active} onValueChange={setActive}>
        <TabsContent value={active} keepMounted className="mt-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickView}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <QuickViewDialog
        product={quickView}
        open={quickView !== null}
        onOpenChange={(open) => !open && setQuickView(null)}
      />
    </section>
  );
}
