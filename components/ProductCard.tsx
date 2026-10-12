
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [imageError, setImageError] = useState(false);

  const stockColor =
    product.stock === "In Stock"
      ? "text-emerald-700 bg-emerald-50"
      : product.stock === "Low Stock"
      ? "text-amber-700 bg-amber-50"
      : "text-rose-700 bg-rose-50";

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-brand/5 to-accent/10">
          {/* Product image */}
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-4 transition duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-4xl font-bold text-brand/40">
              {product.formula || product.name.charAt(0)}
            </span>
          )}

          {/* Stock badge */}
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[11px] font-medium ${stockColor}`}
          >
            {product.stock}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-500">
          {product.category}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-1 block line-clamp-2 font-semibold text-ink hover:text-brand"
        >
          {product.name}
        </Link>

        <div className="mt-1 text-xs text-slate-500">
          {product.unit}
          {product.grade && ` · ${product.grade}`}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="font-bold text-brand">
            KES {product.price.toLocaleString()}
          </div>

          <button
            onClick={() => add(product.id)}
            className="rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-dark"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
