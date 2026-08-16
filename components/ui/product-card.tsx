"use client";

import Link from "next/link";
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

export type CardVariant = "default" | "compact" | "numbered" | "carousel";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: CardVariant;
  onQuickView: (product: Product) => void;
}

export function ProductCard({
  product,
  index = 0,
  variant = "default",
  onQuickView,
}: ProductCardProps) {
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
      className={cn(
        "group relative flex flex-col overflow-hidden border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10",
        variant === "carousel" ? "h-full rounded-3xl" : "rounded-lg",
        variant === "compact" && "rounded-none",
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "relative aspect-square overflow-hidden",
          variant === "carousel" ? "rounded-t-3xl" : "rounded-t-lg",
          variant === "compact" && "rounded-none",
        )}
      >
        <ProductArtwork product={product} className="h-full w-full" />

        {variant === "numbered" && (
          <span className="absolute left-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/85 font-heading text-sm font-bold text-theme-accent backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {variant !== "numbered" && (
          <div className="absolute left-3 top-3 z-30 flex flex-col items-start gap-1.5">
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} variant="secondary" className="glass backdrop-blur-md">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </Link>

      <div
        className={cn(
          "absolute right-3 top-3 z-30 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100",
          variant === "numbered" && "right-auto left-3 top-12",
        )}
      >
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

      <div
        className={cn(
          "flex flex-1 flex-col gap-2",
          variant === "compact" ? "p-3" : "p-4",
        )}
      >
        <p
          className={cn(
            "font-sans font-semibold uppercase tracking-[0.16em] text-muted-foreground",
            variant === "compact" ? "text-[10px]" : "text-[11px]",
          )}
        >
          {product.line}
        </p>
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "font-heading leading-tight font-semibold",
              variant === "compact" ? "text-sm" : "text-lg",
            )}
          >
            {product.name}
          </Link>
          <span
            className={cn(
              "shrink-0 text-muted-foreground",
              variant === "compact" ? "text-[10px]" : "text-xs",
            )}
          >
            {product.format}
          </span>
        </div>
        {variant !== "compact" && (
          <p className="text-sm leading-snug text-muted-foreground text-pretty">
            {product.tagline}
          </p>
        )}
        <Stars rating={product.rating} reviews={product.reviews} size={variant === "compact" ? 12 : 14} />

        <div className={cn("mt-1 flex flex-wrap gap-1.5", variant === "compact" && "gap-1")}>
          {product.ingredients.slice(0, variant === "compact" ? 2 : 3).map((ing) => (
            <span
              key={ing}
              className={cn(
                "rounded-full border border-border bg-chip text-chip-foreground",
                variant === "compact"
                  ? "px-2 py-0.5 text-[10px] font-medium"
                  : "px-2.5 py-0.5 text-[11px] font-medium",
                variant === "compact" && "rounded-none",
              )}
            >
              {ing}
            </span>
          ))}
        </div>

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3",
            variant === "compact" ? "pt-2" : "pt-3",
          )}
        >
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-heading font-bold",
                variant === "compact" ? "text-base" : "text-lg",
              )}
            >
              {formatMYR(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatMYR(product.compareAt)}
              </span>
            )}
          </div>
          <Button
            size={variant === "compact" ? "icon" : "sm"}
            onClick={handleAdd}
            className={cn(
              !variant.includes("compact") && "rounded-full gap-1.5",
              variant === "carousel" && "rounded-full gap-1.5",
            )}
            aria-label={`Add ${product.name}`}
          >
            <ShoppingBag className="h-4 w-4" />
            {variant !== "compact" && "Add"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
