"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Flower2,
  Menu,
  Search,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { PRODUCTS } from "@/lib/products";
import type { Category } from "@/lib/types";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  category: Category;
  blurb: string;
  links: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Skin",
    category: "Skin",
    blurb: "Clinical brightening & daily actives",
    links: ["Fortress+ Serum", "Vitamin C Layer", "Daily Moisturisers", "Night Actives"],
  },
  {
    label: "Eczema Range",
    category: "Eczema Range",
    blurb: "Dermatologist-grade barrier repair",
    links: ["Epsilon Science", "Ceramide Cream", "Soothing Mist", "Gentle Cleanser"],
  },
  {
    label: "Hair",
    category: "Hair",
    blurb: "Scalp-first botanical care",
    links: ["Scalp Serum", "Root Elixir", "Shampoo Bars"],
  },
  {
    label: "Body",
    category: "Body",
    blurb: "Whole-body barrier rituals",
    links: ["Body Butter", "Hand Repair", "Body Mist"],
  },
  {
    label: "Supplement",
    category: "Supplement",
    blurb: "Ingestible inner-barrier support",
    links: ["Veragen POOG Collagen", "NUCA Night Renewal", "Gut-Skin Reset"],
  },
  {
    label: "Consult",
    category: "Consult",
    blurb: "Your tailored 3-step skin diagnostic",
    links: ["Start Consultation", "Book Dermatologist", "Routine Builder"],
  },
];

export function Header({ onConsult }: { onConsult: () => void }) {
  const { count, openCart } = useCart();
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState<string | null>(null);

  const categoryProducts = (category: Category) =>
    PRODUCTS.filter((p) => p.category === category);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
        <span className="hidden sm:inline">
          Free shipping on orders over RM 150 · Eczema-grade barrier science, powered by clinical botanicals.
        </span>
        <span className="sm:hidden">
          Free shipping over RM 150 · Clinical botanicals.
        </span>
      </div>

      {/* Primary nav */}
      <div
        className="glass border-b border-border"
        onMouseLeave={() => setActive(null)}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
              S
            </span>
            <span className="font-heading text-lg font-bold tracking-[0.08em]">
              SKINPIENS
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:inline">
              Clinical · Botanical
            </span>
          </a>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => setActive(item.label)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      active === item.label && "bg-muted",
                    )}
                    onClick={() => item.label === "Consult" && onConsult()}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Search" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Open bag, ${count} items`}
              className="relative rounded-full"
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full hidden border-b border-border bg-background/95 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-6 py-8">
                {(() => {
                  const item = NAV_ITEMS.find((n) => n.label === active)!;
                  const products = categoryProducts(item.category);
                  return (
                    <>
                      <div className="col-span-2">
                        <p className="font-heading text-xl font-semibold">{item.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.blurb}</p>
                        <div className="mt-4 space-y-1">
                          {item.links.map((link) => (
                            <a
                              key={link}
                              href="#products"
                              onClick={() => setActive(null)}
                              className="block rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 grid grid-cols-2 gap-3">
                        {products.length > 0 ? (
                          products.slice(0, 4).map((p) => (
                            <a
                              key={p.id}
                              href="#products"
                              onClick={() => setActive(null)}
                              className="group flex items-center gap-3 rounded-xl border border-border p-2 transition-colors hover:bg-muted"
                            >
                              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                                <ProductArtwork product={p} className="h-full w-full" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{p.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  RM {p.price.toFixed(2)}
                                </p>
                              </div>
                            </a>
                          ))
                        ) : (
                          <div className="col-span-2 flex items-center gap-3 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                            <Stethoscope className="h-5 w-5 shrink-0" />
                            {active === "Consult"
                              ? "Answer 3 questions and we’ll tailor your regimen."
                              : `${active} collection arriving soon.`}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-full max-w-xs p-0">
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle className="flex items-center gap-2 font-heading">
              <Flower2 className="h-4 w-4 text-theme-accent" />
              SKINPIENS
            </SheetTitle>
          </SheetHeader>
          <nav className="overflow-y-auto px-2 py-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (item.label === "Consult") {
                      setMobileOpen(false);
                      onConsult();
                      return;
                    }
                    setMobileNav(mobileNav === item.label ? null : item.label);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileNav === item.label && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileNav === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 px-3 pb-3">
                        {categoryProducts(item.category)
                          .concat(categoryProducts(item.category).slice(0, 1))
                          .slice(0, 4)
                          .map((p) => (
                            <a
                              key={`${item.label}-${p.id}`}
                              href="#products"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                              <span className="h-6 w-6 overflow-hidden rounded-md">
                                <ProductArtwork product={p} className="h-full w-full" />
                              </span>
                              {p.name}
                            </a>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
          <div className="border-t border-border p-4">
            <Badge variant="secondary" className="w-full justify-center py-2">
              Eczema-grade · Clinical · Botanical
            </Badge>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
