"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { FREE_SHIPPING_THRESHOLD, formatMYR, getProduct } from "@/lib/products";
import { useCart } from "@/components/providers/cart-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

type Step = "bag" | "checkout" | "success";

export function CartSheet() {
  const cart = useCart();
  const { themeDef } = useTheme();
  const [step, setStep] = useState<Step>("bag");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", state: "" });
  const [orderNumber, setOrderNumber] = useState("");

  const hasFreeShipping = cart.freeShippingRemaining <= 0;
  const shipping = hasFreeShipping ? 0 : 8;

  const handleOpenChange = (open: boolean) => {
    cart.closeCart();
    if (!open) setTimeout(() => setStep("bag"), 300);
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    setOrderNumber(`SP-${Math.floor(100000 + Math.random() * 899999)}`);
    setStep("success");
    setTimeout(cart.clearCart, 800);
  };

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <Sheet open={cart.isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full max-w-md flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-heading">
            {step === "bag" && (
              <>
                <ShoppingBag className="h-4 w-4" />
                Your Bag
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {cart.count} {cart.count === 1 ? "item" : "items"}
                </span>
              </>
            )}
            {step === "checkout" && (
              <>
                <Lock className="h-4 w-4" />
                Checkout
                <button
                  onClick={() => setStep("bag")}
                  className="ml-auto flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to bag
                </button>
              </>
            )}
            {step === "success" && (
              <>
                <CheckCircle2 className="h-4 w-4 text-theme-accent" />
                Order confirmed
              </>
            )}
          </SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {step === "bag" && (
            <motion.div
              key="bag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="border-b border-border px-5 py-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-theme-accent" />
                  {hasFreeShipping ? (
                    <p className="font-medium">
                      You’ve unlocked <span className="font-semibold">FREE shipping</span> 🎉
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Add{" "}
                      <span className="font-semibold text-foreground">
                        {formatMYR(cart.freeShippingRemaining)}
                      </span>{" "}
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
                            <span className="font-semibold">
                              {formatMYR(product.price * item.qty)}
                            </span>
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
                  <Button
                    size="lg"
                    className={cn("w-full rounded-full")}
                    onClick={() => setStep("checkout")}
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {step === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <form onSubmit={placeOrder} className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex-1 space-y-4 px-5 py-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="co-name" className="text-xs font-medium">Full name</Label>
                    <Input id="co-name" required value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Aina Binti Rahman" className="rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="co-email" className="text-xs font-medium">Email</Label>
                    <Input id="co-email" type="email" required value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="aina@email.com" className="rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="co-address" className="text-xs font-medium">Address</Label>
                    <Input id="co-address" required value={form.address} onChange={(e) => set("address")(e.target.value)} placeholder="12, Jalan Ampang" className="rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="co-city" className="text-xs font-medium">City</Label>
                      <Input id="co-city" required value={form.city} onChange={(e) => set("city")(e.target.value)} placeholder="Kuala Lumpur" className="rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="co-state" className="text-xs font-medium">State</Label>
                      <Input id="co-state" required value={form.state} onChange={(e) => set("state")(e.target.value)} placeholder="WP" className="rounded-lg" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <Lock className="h-3.5 w-3.5 text-theme-accent" />
                      Payment — cash on delivery (demo)
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="font-medium text-foreground">{formatMYR(cart.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span className="font-medium text-foreground">
                          {shipping === 0 ? "Free" : formatMYR(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 font-heading text-base font-bold">
                        <span>Total</span>
                        <span>{formatMYR(cart.subtotal + shipping)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border px-5 py-4">
                  <Button type="submit" size="lg" className="w-full rounded-full">
                    Place Order — {formatMYR(cart.subtotal + shipping)}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-theme-accent/15 text-theme-accent">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <p className="font-heading text-2xl font-bold">Order confirmed!</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Your Skinpiens
                order is on its way to {form.city || "you"}. A confirmation email is on
                its way to {form.email || "your inbox"}.
              </p>
              <div className="rounded-xl border border-border bg-muted/40 px-5 py-3 font-mono text-xs text-muted-foreground">
                Order #{orderNumber}
              </div>
              <Button onClick={cart.closeCart} className="mt-2 rounded-full">
                Continue Shopping
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
