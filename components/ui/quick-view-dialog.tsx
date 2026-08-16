"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { Stars } from "@/components/ui/stars";
import { formatMYR } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/providers/cart-provider";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addToCart, openCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product.id, qty);
    onOpenChange(false);
    setQty(1);
    openCart();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:grid sm:grid-cols-2">
        <button
          aria-label="Close quick view"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-20 rounded-full bg-background/70 p-2 backdrop-blur transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <ProductArtwork product={product} className="hidden h-full min-h-80 sm:block" />

        <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto p-6">
          <DialogHeader className="gap-2 text-left">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {product.line} · {product.format}
            </p>
            <DialogTitle className="font-heading text-2xl font-semibold">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-pretty">
              {product.tagline}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3">
            <Stars rating={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold">{formatMYR(product.price)}</span>
            {product.compareAt && (
              <span className="text-base text-muted-foreground line-through">
                {formatMYR(product.compareAt)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <Badge key={b} variant="secondary">{b}</Badge>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {product.description}
          </p>

          <div>
            <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
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

          <div className="flex flex-wrap gap-1.5">
            {product.concerns.map((c) => (
              <Badge key={c} variant="outline">{c}</Badge>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
            <div className="flex items-center rounded-full border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1 gap-2" size="lg" onClick={handleAdd}>
              <ShoppingBag className="h-4 w-4" />
              Add to Bag — {formatMYR(product.price * qty)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
