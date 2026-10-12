"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/policies", label: "Policies" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white font-bold">R</span>
          <div className="leading-tight">
            <div className="font-bold text-brand">Racie Chem</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Supplies · Kenya</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-brand transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-brand hover:text-brand transition"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-white px-1">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden rounded-lg border border-slate-200 p-2"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}