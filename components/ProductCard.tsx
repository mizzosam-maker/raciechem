"use client";

import Link from "next/link";
import { Product } from "@/types/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const stockColor =
    product.stock === "In Stock"
      ? "text-emerald-700 bg-emerald-50"
      : product.stock === "Low Stock"
      ? "text-amber-700 bg-amber-50"
      : "text-rose-700 bg-rose-50";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-[4/3] bg-gradient-to-br from-brand/5 to-accent/10 grid place-items-center relative">
          <span className="text-4xl font-bold text-brand/40">{product.formula || product.name.charAt(0)}</span>
          <span className={`absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded-full ${stockColor}`}>
            {product.stock}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-500">{product.category}</div>
        <Link href={`/products/${product.id}`} className="block mt-1 font-semibold text-ink hover:text-brand line-clamp-2">
          {product.name}
        </Link>
        <div className="mt-1 text-xs text-slate-500">{product.unit} · {product.grade}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-bold text-brand">
            KES {product.price.toLocaleString()}
          </div>
          <button
            onClick={() => add(product.id)}
            className="rounded-lg bg-brand text-white text-sm font-medium px-3 py-2 hover:bg-brand-dark transition"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}