"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-cream-50/92 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Gift Man home">
          <Image
            src="/images/logo.svg"
            alt="Gift Man"
            width={210}
            height={62}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-800 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-coral-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-sm flex-1 md:block">
          <SearchBar compact />
        </div>

        <Link
          href="/gift-card"
          className="hidden rounded-full bg-coral-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-coral-800 sm:inline-flex"
        >
          Gift Card
        </Link>

        <button
          type="button"
          className="relative flex size-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-950 shadow-sm transition hover:border-coral-300"
          aria-label="Cart"
        >
          <ShoppingBag size={20} aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-coral-700 text-[11px] font-bold text-white">
            0
          </span>
        </button>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-950 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-stone-200 bg-cream-50 px-4 pb-5 pt-3 lg:hidden">
          <div className="mb-4">
            <SearchBar compact />
          </div>
          <nav className="grid gap-1 text-base font-semibold text-stone-900">
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
              className="rounded-[8px] px-3 py-3 text-coral-700 transition hover:bg-white"
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
