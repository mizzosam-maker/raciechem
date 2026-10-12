"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <span className="text-[11px] uppercase tracking-widest text-brand font-semibold">Contact</span>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold">Get in touch</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">
        Reach us by phone, email or WhatsApp. For institutional orders, request a formal quotation
        using the form on this page.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { t: "Phone", v: "+254 700 000 000", s: "Mon–Sat · 8:00–18:00" },
            { t: "Email", v: "sales@raciechem.co.ke", s: "Replies within 1 business day" },
            { t: "WhatsApp", v: "+254 700 000 000", s: "Fast order support" },
            { t: "Location", v: "Industrial Area, Nairobi, Kenya", s: "Warehouse & pickup point" },
          ].map(c => (
            <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">{c.t}</div>
              <div className="mt-1 font-semibold">{c.v}</div>
              <div className="text-sm text-slate-500 mt-0.5">{c.s}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          {sent ? (
            <div className="text-center py-10">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">✓</div>
              <h2 className="mt-4 text-xl font-bold">Message sent</h2>
              <p className="mt-2 text-slate-600 text-sm">
                Thank you. Our team will get back to you within one business day.
              </p>
              <button onClick={() => setSent(false)} className="mt-6 text-brand font-medium hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              <h2 className="font-bold text-lg">Send us a message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full name *" required />
                <Input label="Email *" type="email" required />
                <Input label="Phone *" required />
                <Input label="Institution" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea
                  required rows={5}
                  placeholder="Tell us about your requirements…"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <button type="submit" className="w-full rounded-xl bg-brand text-white font-semibold px-5 py-3 hover:bg-brand-dark transition">
                Send Message
              </button>
              <p className="text-xs text-slate-500">
                Prototype form — no message is actually sent.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type} required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}