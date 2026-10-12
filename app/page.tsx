import Link from "next/link";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand via-brand to-brand-dark" />
        <div className="absolute inset-0 -z-10 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 0, transparent 40%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)" }} />

        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-white">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide">
            Trusted by schools & laboratories across Kenya
          </span>
          <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
            Laboratory chemicals &<br className="hidden md:block" /> science supplies, delivered.
          </h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg">
            Racie Chem Supplies provides analytical reagents, teaching chemicals, glassware and PPE
            to secondary schools, colleges and research institutions. Order by cart or request a
            quotation for bulk supply.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-xl bg-accent text-ink font-semibold px-5 py-3 hover:brightness-95 transition">
              Browse Products
            </Link>
            <Link href="/contact" className="rounded-xl border border-white/40 px-5 py-3 font-medium hover:bg-white/10 transition">
              Request a Quotation
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              ["8+", "Product lines"],
              ["47", "Counties served"],
              ["24hr", "Nairobi dispatch"],
              ["M-Pesa", "Secure payment"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white/10 px-4 py-3">
                <div className="font-bold text-lg">{v}</div>
                <div className="text-white/75">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { t: "Institutional ordering", d: "Bulk quantities, LPOs and invoice-based supply for schools and colleges." },
            { t: "Safety first", d: "Every chemical is supplied with handling guidance, hazard labels and PPE recommendations." },
            { t: "Reliable delivery", d: "Same-day dispatch within Nairobi and 2–4 day courier countrywide." },
          ].map(f => (
            <div key={f.t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand font-bold">✓</div>
              <h3 className="mt-4 font-semibold text-lg">{f.t}</h3>
              <p className="mt-1 text-slate-600 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured supplies</h2>
            <p className="text-slate-600 mt-1 text-sm">Popular chemicals and apparatus for teaching and analysis.</p>
          </div>
          <Link href="/products" className="hidden md:inline text-brand font-medium hover:underline">
            View all →
          </Link>
        </div>
        <ProductGrid items={featured} />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Shop by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Laboratory Chemicals", "Acids, bases, salts & reagents", "from-brand/10 to-brand/5"],
            ["Teaching & Demonstration", "Safe chemicals for classroom experiments", "from-accent/15 to-accent/5"],
            ["Glassware & Apparatus", "Beakers, flasks, pipettes & more", "from-slate-200 to-slate-100"],
            ["Testing & Measurement", "pH, indicators, meters", "from-emerald-100 to-emerald-50"],
            ["Safety & PPE", "Goggles, gloves, coats, spill kits", "from-amber-100 to-amber-50"],
            ["Bulk & Institutional", "LPO, invoice, termly supply", "from-rose-100 to-rose-50"],
          ].map(([t, d, g]) => (
            <Link
              key={t as string}
              href={`/products?cat=${encodeURIComponent(t as string)}`}
              className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${g} p-6 hover:shadow-md transition`}
            >
              <div className="font-semibold text-lg">{t}</div>
              <div className="text-sm text-slate-600 mt-1">{d}</div>
              <div className="mt-4 text-brand font-medium text-sm">Shop now →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl bg-ink text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Ordering for your school or lab?</h3>
            <p className="mt-2 text-slate-300">Request a formal quotation — we accept LPOs and issue invoices on supply.</p>
          </div>
          <Link href="/contact" className="rounded-xl bg-accent text-ink font-semibold px-5 py-3 whitespace-nowrap">
            Request Quotation
          </Link>
        </div>
      </section>
    </>
  );
}