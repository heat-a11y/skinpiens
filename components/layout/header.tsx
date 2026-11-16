"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductArtwork } from "@/components/ui/product-artwork";
import { PRODUCTS } from "@/lib/products";
import { withBase } from "@/lib/base-path";
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
    label: "Eczema",
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

const UTILITY = [
  { label: "Journal", href: "/journal", n: "07" },
  { label: "Routine", href: "/routine", n: "08" },
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
      {/* Announcement */}
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-1.5 sm:px-6 lg:px-10">
          <p className="micro-sm">Free shipping over RM 150</p>
          <p className="micro-sm hidden text-background/60 sm:block">
            Eczema-grade · Pharmacist-formulated · Kuala Lumpur
          </p>
          <p className="micro-sm">Apotik · MMXXVI</p>
        </div>
      </div>

      {/* Primary nav */}
      <div
        className="border-b border-foreground/15 bg-background/80 backdrop-blur-xl"
        onMouseLeave={() => setActive(null)}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <a href="#top" className="flex items-baseline gap-3">
            <span className="display text-[26px] leading-none tracking-[-0.045em]">
              Skinpiens
            </span>
            <span className="micro hidden text-muted-foreground md:inline">
              Clinical · Botanical
            </span>
          </a>

          <nav className="ml-auto hidden items-center lg:flex">
            <ul className="flex items-stretch">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.label} onMouseEnter={() => setActive(item.label)}>
                  <button
                    className={cn(
                      "micro flex h-16 items-center gap-1.5 border-l border-transparent px-4 transition-colors hover:border-foreground/25 hover:bg-foreground hover:text-background",
                      active === item.label && "border-foreground/25 bg-foreground text-background",
                    )}
                    onClick={() => item.label === "Consult" && onConsult()}
                  >
                    <span className="text-[8px] opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
              {UTILITY.map((item, i) => (
                <li key={item.label}>
                  <a
                    href={withBase(item.href)}
                    className="micro flex h-16 items-center gap-1.5 border-l border-foreground/15 px-4 transition-colors hover:bg-foreground hover:text-background"
                  >
                    <span className="text-[8px] opacity-50">{item.n}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <Button variant="ghost" size="icon" aria-label="Search" className="rounded-none">
              <Search className="h-[18px] w-[18px]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Open bag, ${count} items`}
              className="relative rounded-none"
              onClick={openCart}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute right-0 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-semibold text-background">
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-foreground/15 bg-background lg:block"
            >
              <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-8 px-10 py-10">
                {(() => {
                  const item = NAV_ITEMS.find((n) => n.label === active)!;
                  const products = categoryProducts(item.category);
                  return (
                    <>
                      <div className="col-span-4">
                        <p className="micro text-muted-foreground">The Index</p>
                        <p className="display mt-3 text-6xl leading-[0.9]">{item.label}</p>
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                          {item.blurb}
                        </p>
                      </div>
                      <div className="col-span-3 border-l border-foreground/15 pl-6">
                        <p className="micro text-muted-foreground">Within</p>
                        <ul className="mt-4 space-y-2">
                          {item.links.map((link) => (
                            <li key={link}>
                              <a
                                href="#products"
                                onClick={() => setActive(null)}
                                className="link-draw text-sm text-foreground/80 hover:text-foreground"
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-5 grid grid-cols-2 gap-3">
                        {products.length > 0 ? (
                          products.slice(0, 4).map((p) => (
                            <a
                              key={p.id}
                              href="#products"
                              onClick={() => setActive(null)}
                              className="group flex items-center gap-3 border border-foreground/15 p-2 transition-colors hover:border-foreground/50"
                            >
                              <div className="h-16 w-14 shrink-0 overflow-hidden">
                                <ProductArtwork product={p} className="h-full w-full" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm">{p.name}</p>
                                <p className="micro mt-1 text-muted-foreground">
                                  RM {p.price.toFixed(2)}
                                </p>
                              </div>
                            </a>
                          ))
                        ) : (
                          <div className="col-span-2 flex items-center gap-3 border border-dashed border-foreground/25 p-4 text-sm text-muted-foreground">
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
        <SheetContent side="left" className="w-full max-w-sm rounded-none p-0">
          <SheetHeader className="border-b border-foreground/15 px-5 py-5">
            <SheetTitle className="display text-left text-2xl font-normal">
              Skinpiens
            </SheetTitle>
          </SheetHeader>
          <nav className="overflow-y-auto">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label} className="border-b border-foreground/10">
                <button
                  onClick={() => {
                    if (item.label === "Consult") {
                      setMobileOpen(false);
                      onConsult();
                      return;
                    }
                    setMobileNav(mobileNav === item.label ? null : item.label);
                  }}
                  className="flex w-full items-center justify-between px-5 py-4"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="micro-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-xl font-normal">{item.label}</span>
                  </span>
                  <span className="micro text-muted-foreground">
                    {mobileNav === item.label ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {mobileNav === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 px-5 pb-4">
                        {categoryProducts(item.category)
                          .slice(0, 4)
                          .map((p) => (
                            <a
                              key={`${item.label}-${p.id}`}
                              href="#products"
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
                            >
                              <span className="h-9 w-8 overflow-hidden">
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
            {UTILITY.map((item) => (
              <a
                key={item.label}
                href={withBase(item.href)}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-foreground/10 px-5 py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="micro-sm text-muted-foreground">{item.n}</span>
                  <span className="display text-xl font-normal">{item.label}</span>
                </span>
                <span className="micro text-muted-foreground">↗</span>
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("skinpiens:design-index"));
              }}
              className="flex w-full items-center justify-between border-b border-foreground/10 px-5 py-4"
            >
              <span className="flex items-baseline gap-3">
                <span className="micro-sm text-muted-foreground">09</span>
                <span className="display text-xl font-normal">Design index</span>
              </span>
              <span className="micro text-muted-foreground">22</span>
            </button>
          </nav>
          <div className="p-5">
            <p className="micro text-muted-foreground">
              Eczema-grade · Clinical · Botanical
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
