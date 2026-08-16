"use client";

import { motion } from "framer-motion";
import { Eye, Plus, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { Stars } from "@/components/ui/stars";
import { formatMYR } from "@/lib/products";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, openCart } = useCart();

  const handleAdd = () => {
    addToCart(product.id);
    openCart();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <ProductArtwork product={product} className="h-full w-full" />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <Badge key={badge} variant="secondary" className="glass backdrop-blur-md">
              {badge}
            </Badge>
          ))}
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            aria-label={`Quick view ${product.name}`}
            onClick={() => onQuickView(product)}
            className="glass h-9 w-9 rounded-full backdrop-blur-md"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            aria-label={`Add ${product.name} to bag`}
            onClick={handleAdd}
            className="h-9 w-9 rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {product.line}
        </p>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg leading-tight font-semibold">
            {product.name}
          </h3>
          <span className="shrink-0 text-xs text-muted-foreground">{product.format}</span>
        </div>
        <p className="text-sm leading-snug text-muted-foreground text-pretty">
          {product.tagline}
        </p>
        <Stars rating={product.rating} reviews={product.reviews} />

        <div className="mt-1 flex flex-wrap gap-1.5">
          {product.ingredients.slice(0, 3).map((ing) => (
            <span
              key={ing}
              className="rounded-full border border-border bg-chip px-2.5 py-0.5 text-[11px] font-medium text-chip-foreground"
            >
              {ing}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg font-bold">
              {formatMYR(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatMYR(product.compareAt)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            className={cn("rounded-full gap-1.5")}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
