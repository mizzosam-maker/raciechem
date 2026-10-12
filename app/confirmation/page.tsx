"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const [order, setOrder] = useState<any>(null);
  useEffect(() => {
    const raw = sessionStorage.getItem("racie-order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">No recent order</h1>
        <Link href="/products" className="inline-block mt-6 rounded-xl bg-brand text-white font-semibold px-5 py-3">
          Browse Products
        </Link>
      </div>
    );
  }

  const c = order.customer || {};
  const methodLabel = { mpesa: "M-Pesa", card: "Card", invoice: "Invoice / LPO" }[order.method as string] || order.method;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 text-3xl">✓</div>
        <h1 className="mt-5 text-3xl md:text-4xl font-bold">Order confirmed</h1>
        <p className="mt-2 text-slate-600">
          Thank you{c.fullName ? `, ${c.fullName}` : ""}! We've received your order and sent a confirmation to your phone.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-500">Order reference</div>
            <div className="text-xl font-bold text-brand">{order.ref}</div>
          </div>
          <div className="text-sm text-slate-600">
            {new Date(order.paidAt).toLocaleString()}
          </div>
        </div>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <Row k="Payment method" v={methodLabel} />
          <Row k="Amount paid" v={`KES ${Number(order.total).toLocaleString()}`} />
          <Row k="Phone" v={c.phone || "—"} />
          <Row k="Email" v={c.email || "—"} />
          <Row k="Institution" v={c.institution || "—"} />
          <Row k="Delivery" v={c.delivery === "express" ? "Express (Nairobi)" : c.delivery === "pickup" ? "Warehouse pickup" : "Standard courier"} />
          <Row k="County / Town" v={`${c.county || "—"} / ${c.town || "—"}`} />
          <Row k="Delivery fee" v={`KES ${Number(c.deliveryFee ?? 0).toLocaleString()}`} />
        </dl>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href="/products" className="flex-1 text-center rounded-xl bg-brand text-white font-semibold px-5 py-3 hover:bg-brand-dark transition">
          Continue Shopping
        </Link>
        <Link href="/contact" className="flex-1 text-center rounded-xl border border-slate-200 px-5 py-3 font-medium hover:border-brand hover:text-brand transition">
          Contact Support
        </Link>
      </div>

      <p className="mt-6 text-xs text-slate-500 text-center">
        This is a prototype. No actual payment has been processed and no goods will be delivered.
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
      <dt className="text-slate-500">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}