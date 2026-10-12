"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { detailed, subtotal } = useCart();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", institution: "",
    county: "", town: "", notes: "", delivery: "standard",
  });

  if (!detailed.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Nothing to check out</h1>
        <p className="mt-2 text-slate-600">Your cart is empty.</p>
      </div>
    );
  }

  const deliveryFee = form.delivery === "express" ? 750 : form.delivery === "pickup" ? 0 : 350;
  const total = subtotal + deliveryFee;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("racie-checkout", JSON.stringify({ ...form, deliveryFee, subtotal, total }));
    router.push("/payment");
  };

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
      <p className="text-slate-600 mb-8">Step 1 of 2 — Delivery details</p>

      <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <h2 className="font-bold text-lg">Customer details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name *" value={form.fullName} onChange={v => set("fullName", v)} required />
            <Field label="Phone (M-Pesa) *" value={form.phone} onChange={v => set("phone", v)} required placeholder="07XX XXX XXX" />
            <Field label="Email *" type="email" value={form.email} onChange={v => set("email", v)} required />
            <Field label="Institution / School" value={form.institution} onChange={v => set("institution", v)} />
          </div>

          <h2 className="font-bold text-lg pt-2">Delivery address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="County *" value={form.county} onChange={v => set("county", v)} required placeholder="Nairobi" />
            <Field label="Town / Area *" value={form.town} onChange={v => set("town", v)} required placeholder="Westlands" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery notes</label>
            <textarea
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              rows={3}
              placeholder="e.g. Deliver to school store, ask for lab technician"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <h2 className="font-bold text-lg pt-2">Delivery method</h2>
          <div className="space-y-3">
            {[
              { id: "standard", t: "Standard courier", d: "2–4 business days · KES 350" },
              { id: "express", t: "Express (Nairobi)", d: "Same/next day · KES 750" },
              { id: "pickup", t: "Pickup at warehouse", d: "Free · Ready in 2 hrs" },
            ].map(o => (
              <label key={o.id} className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${form.delivery === o.id ? "border-brand bg-brand/5" : "border-slate-200"}`}>
                <input type="radio" name="delivery" checked={form.delivery === o.id} onChange={() => set("delivery", o.id)} className="mt-1 accent-[color:var(--color-brand)]" />
                <div>
                  <div className="font-medium">{o.t}</div>
                  <div className="text-sm text-slate-500">{o.d}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-lg mb-4">Order summary</h2>
          <div className="space-y-3 text-sm mb-4 max-h-64 overflow-y-auto">
            {detailed.map(({ product, qty, lineTotal }) => (
              <div key={product.id} className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-medium">{product.name}</div>
                  <div className="text-slate-500 text-xs">{qty} × KES {product.price.toLocaleString()}</div>
                </div>
                <div className="whitespace-nowrap">KES {lineTotal.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <dl className="space-y-2 text-sm border-t border-slate-200 pt-4">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>KES {subtotal.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>KES {deliveryFee.toLocaleString()}</dd></div>
            <div className="flex justify-between font-bold text-base border-t border-slate-200 pt-2 mt-2">
              <dt>Total</dt><dd className="text-brand">KES {total.toLocaleString()}</dd>
            </div>
          </dl>
          <button type="submit" className="mt-6 w-full rounded-xl bg-brand text-white font-semibold px-5 py-3 hover:bg-brand-dark transition">
            Continue to Payment
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type} value={value} required={required} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}