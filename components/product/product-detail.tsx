"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { LocalImage } from "@/components/ui/local-image";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { ProductCard } from "@/components/ui/product-card";
import { QuickViewDialog } from "@/components/ui/quick-view-dialog";
import { formatMYR, PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const gallery = (product.gallery?.length ? product.gallery : [product.image]).filter(
    (x): x is string => Boolean(x),
  );
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product.id, qty);
    openCart();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
        <a href="#top" className="hover:text-foreground">Home</a>
        <span>/</span>
        <a href="#products" className="hover:text-foreground">{product.category}</a>
        <span>/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
            <ProductArtwork
              product={{ ...product, image: gallery[activeImage] }}
              className="h-full w-full"
              priority
            />
            <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
              {product.badges.slice(0, 2).map((b) => (
                <Badge key={b} variant="secondary" className="glass backdrop-blur-md">
                  {b}
                </Badge>
              ))}
            </div>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2">
              {gallery.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden rounded-lg border transition-colors",
                    activeImage === i ? "border-primary" : "border-border hover:border-muted-foreground/50",
                  )}
                >
                  <LocalImage src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
            {product.line} · {product.format}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-base text-muted-foreground text-pretty">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-heading text-3xl font-bold">{formatMYR(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-muted-foreground line-through">
                {formatMYR(product.compareAt)}
              </span>
            )}
            {product.compareAt && (
              <Badge variant="secondary" className="bg-theme-accent/15 text-theme-accent">
                Save {formatMYR(product.compareAt - product.price)}
              </Badge>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Key actives
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border border-border bg-chip px-3 py-1 text-xs font-medium text-chip-foreground"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {product.concerns.map((c) => (
              <Badge key={c} variant="outline">{c}</Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-between rounded-full border border-border sm:w-40">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-full"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-full"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1 gap-2 rounded-full" onClick={handleAdd}>
              <ShoppingBag className="h-4 w-4" />
              Add to Bag — {formatMYR(product.price * qty)}
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-theme-accent" />
              Free shipping over RM 150
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="flex items-center gap-1.5">
              <Wand2 className="h-3.5 w-3.5 text-theme-accent" />
              Matched in the Skin Consultation
            </span>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      <div className="mt-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent">
              Complete the ritual
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
              You may also need
            </h2>
          </div>
          <a href="#products" className="text-sm font-medium text-theme-accent hover:underline">
            View all →
          </a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </div>

      <QuickViewDialog
        product={quickView}
        open={quickView !== null}
        onOpenChange={(open) => !open && setQuickView(null)}
      />
    </div>
  );
}
