import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <span className="text-[11px] uppercase tracking-widest text-brand font-semibold">About us</span>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold">Science supplies, delivered with care.</h1>
      <p className="mt-4 text-slate-700 text-lg">
        Racie Chem Supplies is a Kenyan supplier of laboratory chemicals, glassware, safety equipment
        and teaching materials. We serve secondary schools, TVET institutions, universities and
        private research laboratories.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-xl">Our mission</h2>
          <p className="mt-2 text-slate-700 text-sm">
            To make high-quality, correctly-labelled laboratory supplies accessible to every
            learning institution in Kenya — reliably, safely and at fair prices.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-xl">Our vision</h2>
          <p className="mt-2 text-slate-700 text-sm">
            To be the most trusted chemical-supply partner for schools and laboratories across East Africa.
          </p>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold">What we do</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          ["Supply", "Analytical reagents, teaching chemicals, glassware, PPE and consumables."],
          ["Support", "Technical advice on handling, storage and safe disposal of chemicals."],
          ["Institutional ordering", "LPOs, invoicing and termly supply contracts for schools and labs."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-slate-600">{d}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold">Why schools choose us</h2>
      <ul className="mt-5 space-y-3">
        {[
          "Correct labelling and Safety Data Sheet (SDS) information included with every chemical.",
          "Bulk and termly supply agreements for repeat orders.",
          "Delivery within Nairobi in 24 hours, and countrywide in 2–4 days.",
          "Friendly customer support via phone, email and WhatsApp.",
          "Transparent pricing with no hidden charges.",
        ].map(item => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-brand text-white text-xs flex-shrink-0">✓</span>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl bg-ink text-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Need a supply partner for your school?</h3>
          <p className="text-slate-300 text-sm mt-1">Talk to us about termly supply and bulk pricing.</p>
        </div>
        <Link href="/contact" className="rounded-xl bg-accent text-ink font-semibold px-5 py-3 whitespace-nowrap">
          Contact Us
        </Link>
      </div>

      <p className="mt-8 text-xs text-slate-500">
        Note: This page is part of a prototype. Business details, figures and claims are placeholders
        to be replaced with verified information.
      </p>
    </div>
  );
}