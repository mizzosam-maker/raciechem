"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

export default function ProductsPage() {
  const params = useSearchParams();
  const initialCat = params.get("cat") || "All";
  const [cat, setCat] = useState(initialCat);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products.slice();
    if (cat !== "All") list = list.filter(p => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.formula?.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
      );
    }
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [cat, q, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Product Catalogue</h1>
        <p className="text-slate-600 mt-2">
          Browse laboratory chemicals, glassware and safety supplies. All prices in KES.
        </p>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by name, formula or category…"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <select
          value={cat}
          onChange={e => setCat(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        >
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="mb-4 text-sm text-slate-500">{filtered.length} product{filtered.length !== 1 && "s"}</div>

      <ProductGrid items={filtered} />
    </div>
  );
}