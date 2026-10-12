"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
  const router = useRouter();
  const { subtotal, clear } = useCart();
  const [method, setMethod] = useState<"mpesa" | "card" | "invoice">("mpesa");
  const [mpesa, setMpesa] = useState("");
  const [processing, setProcessing] = useState(false);

  const checkout = typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("racie-checkout") || "{}")
    : {};
  const total = checkout.total ?? subtotal;

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      const ref = `CHEM-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${String(Math.floor(Math.random()*900)+100)}`;
      sessionStorage.setItem("racie-order", JSON.stringify({
        ref, method, total, customer: checkout, paidAt: new Date().toISOString(),
      }));
      clear();
      router.push("/confirmation");
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Payment</h1>
      <p className="text-slate-600 mb-8">Step 2 of 2 — Choose how you'd like to pay.</p>

      <form onSubmit={pay} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <div className="rounded-xl bg-brand/5 border border-brand/20 p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-600">Amount due</div>
            <div className="text-2xl font-bold text-brand">KES {Number(total).toLocaleString()}</div>
          </div>
          <div className="text-xs text-slate-500 text-right">
            Prototype only<br/>No real payment is processed
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { id: "mpesa", label: "M-Pesa", sub: "Paybill / STK" },
            { id: "card", label: "Card", sub: "Visa / Mastercard" },
            { id: "invoice", label: "Invoice / LPO", sub: "Institutional" },
          ].map(o => (
            <button
              type="button"
              key={o.id}
              onClick={() => setMethod(o.id as any)}
              className={`rounded-xl border p-4 text-left ${method === o.id ? "border-brand bg-brand/5" : "border-slate-200 hover:border-slate-300"}`}
            >
              <div className="font-semibold">{o.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{o.sub}</div>
            </button>
          ))}
        </div>

        {method === "mpesa" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              Pay via <strong>Paybill 000000 · Acc: CHEM-ORDER</strong>. Enter your M-Pesa number below and we'll send an STK push.
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">M-Pesa phone number *</label>
              <input
                required value={mpesa} onChange={e => setMpesa(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>
        )}

        {method === "card" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Card number</label>
              <input required placeholder="4242 4242 4242 4242" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expiry</label>
              <input required placeholder="MM/YY" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input required placeholder="123" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
            </div>
          </div>
        )}

        {method === "invoice" && (
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            We will send a formal quotation and invoice to your institution. An account manager
            will contact you within 1 business day to confirm LPO details.
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          className="w-full rounded-xl bg-accent text-ink font-bold px-5 py-4 hover:brightness-95 transition disabled:opacity-60"
        >
          {processing ? "Processing payment…" : `Pay KES ${Number(total).toLocaleString()}`}
        </button>

        {processing && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            Simulating {method === "mpesa" ? "M-Pesa STK push" : "secure payment"}…
          </div>
        )}
      </form>
    </div>
  );
}