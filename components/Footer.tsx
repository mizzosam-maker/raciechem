import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white font-bold">R</span>
            <div className="font-bold">Racie Chem Supplies</div>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Laboratory and educational chemical supplies serving schools, colleges and research labs across Kenya.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-accent">All Products</Link></li>
            <li><Link href="/products?cat=Laboratory%20Chemicals" className="hover:text-accent">Laboratory Chemicals</Link></li>
            <li><Link href="/products?cat=Glassware%20%26%20Apparatus" className="hover:text-accent">Glassware</Link></li>
            <li><Link href="/products?cat=Safety%20%26%20PPE" className="hover:text-accent">Safety & PPE</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/policies" className="hover:text-accent">Policies</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Nairobi, Kenya</li>
            <li>+254 117 345 286</li>
            <li>sales@raciechem.co.ke</li>
            <li>Mon–Sat · 8:00–18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Racie Chem Supplies. Prototype.</div>
          <div>M-Pesa · Bank Transfer · Institutional Invoicing</div>
        </div>
      </div>
    </footer>
  );
}