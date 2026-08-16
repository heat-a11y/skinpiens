"use client";

import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { FREE_SHIPPING_THRESHOLD, formatMYR, getProduct } from "@/lib/products";
import { useCart } from "@/components/providers/cart-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

export function CartSheet() {
  const cart = useCart();
  const { themeDef } = useTheme();

  const hasFreeShipping = cart.freeShippingRemaining <= 0;

  return (
    <Sheet open={cart.isOpen} onOpenChange={cart.closeCart}>
      <SheetContent className="flex w-full max-w-md flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingBag className="h-4 w-4" />
            Your Bag
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {cart.count} {cart.count === 1 ? "item" : "items"}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-theme-accent" />
            {hasFreeShipping ? (
              <p className="font-medium">
                You’ve unlocked <span className="font-semibold">FREE shipping</span> 🎉
              </p>
            ) : (
              <p className="text-muted-foreground">
                Add <span className="font-semibold text-foreground">{formatMYR(cart.freeShippingRemaining)}</span>{" "}
                more for free shipping
              </p>
            )}
          </div>
          <div
            className="mt-3 h-2 w-full overflow-hidden rounded-full"
            style={{ background: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${cart.shippingProgress}%`,
                background: `linear-gradient(90deg, color-mix(in srgb, ${themeDef.swatches[1]} 70%, white), ${themeDef.swatches[1]})`,
              }}
            />
          </div>
          <p className="mt-1.5 text-right text-xs text-muted-foreground">
            Free shipping on orders over {formatMYR(FREE_SHIPPING_THRESHOLD)}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="glass flex h-20 w-20 items-center justify-center rounded-full">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-heading text-lg font-semibold">Your bag is empty</p>
              <p className="max-w-[220px] text-sm text-muted-foreground">
                Discover brightening that never hurts and eczema-grade barrier repair.
              </p>
              <Button onClick={cart.closeCart} className="mt-2 rounded-full">
                Start Shopping
              </Button>
            </div>
          ) : (
            cart.items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border">
                    <ProductArtwork product={product} className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-tight">{product.name}</p>
                      <button
                        onClick={() => cart.removeFromCart(product.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.format}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => cart.updateQty(product.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.qty}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => cart.updateQty(product.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold">{formatMYR(product.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-heading text-xl font-bold">{formatMYR(cart.subtotal)}</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Shipping & taxes calculated at checkout.
            </p>
            <Button size="lg" className={cn("w-full rounded-full")}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
