"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct, FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export interface CartItem {
  productId: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  freeShippingRemaining: number;
  shippingProgress: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "skinpiens-cart";

let cache: CartItem[] = [];
let initialized = false;

function readItems(): CartItem[] {
  if (typeof window === "undefined") return cache;
  if (!initialized) {
    initialized = true;
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) cache = JSON.parse(raw) as CartItem[];
    } catch {
      /* ignore corrupt storage */
    }
  }
  return cache;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CART_STORAGE_KEY) {
      try {
        if (e.newValue) cache = JSON.parse(e.newValue) as CartItem[];
      } catch {
        /* ignore */
      }
    }
    callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function persist(items: CartItem[]) {
  cache = items;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, readItems, () => cache);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((productId: string, qty = 1) => {
    const next = [...cache];
    const existing = next.find((i) => i.productId === productId);
    if (existing) existing.qty += qty;
    else next.push({ productId, qty });
    persist(next);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    persist(cache.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      persist(cache.filter((i) => i.productId !== productId));
    } else {
      persist(
        cache.map((i) => (i.productId === productId ? { ...i, qty } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => persist([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      return product ? sum + product.price * item.qty : sum;
    }, 0);
    const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    return {
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      freeShippingRemaining,
      shippingProgress,
    };
  }, [items, isOpen, addToCart, removeFromCart, updateQty, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
