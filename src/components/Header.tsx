"use client";

import Link from "next/link";
import { MapPin, Menu, Scissors, ShoppingBag, Truck, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

const navItems = [
  { href: "/products", label: "Shop" },
  { href: "/collections/brooklyn-souvenirs", label: "Brooklyn" },
  { href: "/collections/new-york-city-souvenirs", label: "NYC" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-cream-50/94 backdrop-blur-xl">
      <div className="hidden border-b border-ink-900/10 bg-ink-900 px-4 py-2 text-xs font-bold text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} aria-hidden="true" /> 176 5th Ave, Park Slope
          </span>
          <span className="inline-flex items-center gap-5 text-cream-100">
            <span className="inline-flex items-center gap-2">
              <Truck size={14} aria-hidden="true" /> Free shipping $150+
            </span>
            <span className="inline-flex items-center gap-2">
              <Scissors size={14} aria-hidden="true" /> Custom embroidery on-site
            </span>
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center rounded-[8px] focus-ring" aria-label="Gift Man home">
          <img src="/images/logo.svg" alt="Gift Man" width={203} height={60} className="h-11 w-auto sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-bold text-ink-900 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-2 transition hover:bg-white hover:text-coral-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-sm flex-1 md:block">
          <SearchBar compact />
        </div>

        <Link
          href="/gift-card"
          className="hidden rounded-[8px] bg-coral-700 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-coral-800 sm:inline-flex"
        >
          Gift Card
        </Link>

        <button
          type="button"
          className="relative flex size-11 items-center justify-center rounded-[8px] border border-ink-900/10 bg-white text-ink-900 shadow-sm transition hover:border-coral-300"
          aria-label="Cart"
        >
          <ShoppingBag size={20} aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-[6px] bg-coral-700 text-[11px] font-bold text-white">
            0
          </span>
        </button>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-[8px] border border-ink-900/10 bg-white text-ink-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink-900/10 bg-cream-50 px-4 pb-5 pt-3 lg:hidden">
          <div className="mb-4">
            <SearchBar compact />
          </div>
          <nav className="grid gap-1 text-base font-bold text-ink-900">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[8px] px-3 py-3 transition hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/gift-card"
              className="rounded-[8px] px-3 py-3 font-black text-coral-700 transition hover:bg-white"
              onClick={() => setOpen(false)}
            >
              Gift Card
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
