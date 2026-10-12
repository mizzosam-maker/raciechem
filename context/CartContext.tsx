"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/types/products";

type CartLine = { id: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { product: Product; qty: number; lineTotal: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "racie-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines]);

  const add = (id: string, qty = 1) => {
    setLines(prev => {
      const found = prev.find(l => l.id === id);
      if (found) return prev.map(l => l.id === id ? { ...l, qty: l.qty + qty } : l);
      return [...prev, { id, qty }];
    });
  };
  const remove = (id: string) => setLines(p => p.filter(l => l.id !== id));
  const setQty = (id: string, qty: number) =>
    setLines(p => p.map(l => l.id === id ? { ...l, qty: Math.max(1, qty) } : l));
  const clear = () => setLines([]);

  // import inside so no SSR issue
  const { products } = require("@/data/products");

  const detailed = useMemo(
    () => lines
      .map(l => {
        const product = products.find((p: Product) => p.id === l.id);
        if (!product) return null;
        return { product, qty: l.qty, lineTotal: product.price * l.qty };
      })
      .filter(Boolean) as CartCtx["detailed"],
    [lines]
  );

  const count = detailed.reduce((s, d) => s + d.qty, 0);
  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);

  return (
    <Ctx.Provider value={{ lines, add, remove, setQty, clear, count, subtotal, detailed }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}