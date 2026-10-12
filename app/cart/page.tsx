"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();
  const delivery = subtotal > 0 ? 350 : 0;
  const total = subtotal + delivery;

  if (!detailed.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Browse our catalogue and add supplies to your order.</p>
        <Link href="/products" className="inline-block mt-6 rounded-xl bg-brand text-white font-semibold px-5 py-3">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Order</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {detailed.map(({ product, qty, lineTotal }) => (
            <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-4 flex gap-4">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-brand/5 to-accent/10 grid place-items-center flex-shrink-0">
                <span className="text-xl font-bold text-brand/40">{product.formula || product.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/products/${product.id}`} className="font-semibold hover:text-brand">
                      {product.name}
                    </Link>
                    <div className="text-xs text-slate-500 mt-0.5">{product.unit} · {product.grade}</div>
                  </div>
                  <button onClick={() => remove(product.id)} className="text-slate-400 hover:text-rose-600 text-sm">
                    Remove
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-slate-200">
                    <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-1.5">−</button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-1.5">+</button>
                  </div>
                  <div className="font-semibold text-brand">KES {lineTotal.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clear} className="text-sm text-slate-500 hover:text-rose-600">
            Clear cart
          </button>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-lg">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>KES {subtotal.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt>Delivery (Nairobi)</dt><dd>KES {delivery.toLocaleString()}</dd></div>
            <div className="flex justify-between border-t border-slate-200 pt-2 mt-2 font-bold text-base">
              <dt>Total</dt><dd className="text-brand">KES {total.toLocaleString()}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="mt-6 block text-center rounded-xl bg-brand text-white font-semibold px-5 py-3 hover:bg-brand-dark transition">
            Proceed to Checkout
          </Link>
          <Link href="/products" className="mt-3 block text-center text-sm text-slate-600 hover:text-brand">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}