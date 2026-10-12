import { Product } from "@/types/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
        No products match your filter.
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}