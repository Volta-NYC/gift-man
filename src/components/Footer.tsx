import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone, Scissors, Truck } from "lucide-react";
import { collections } from "@/lib/products";

export default function Footer() {
  const featuredCollections = collections.slice(0, 8);

  return (
    <footer className="border-t border-ink-900/10 bg-ink-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-[8px] bg-coral-700 font-black">GM</span>
            <span>
              <span className="block font-display text-2xl font-semibold">Gift Man</span>
              <span className="text-sm font-semibold uppercase text-coral-200">Brooklyn since 1982</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-stone-300">
            A Park Slope neighborhood shop for Brooklyn souvenirs, custom embroidery, local tees, mugs, baby gifts, and
            classic New York keepsakes.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-white/10 px-3 py-2 text-xs font-bold uppercase text-white">
              <Truck size={14} aria-hidden="true" /> Free Shipping $150+
            </span>
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-white/10 px-3 py-2 text-xs font-bold uppercase text-white">
              <Scissors size={14} aria-hidden="true" /> Custom Embroidery
            </span>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase text-coral-200">Visit</h2>
          <address className="space-y-3 not-italic text-sm leading-6 text-stone-300">
            <p className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-coral-300" aria-hidden="true" />
              <span>176 5th Ave, Park Slope Brooklyn, NY 11217</span>
            </p>
            <p className="flex gap-3">
              <Phone size={18} className="mt-1 shrink-0 text-coral-300" aria-hidden="true" />
              <a href="tel:+17184990721" className="hover:text-white">
                (718) 499-0721
              </a>
            </p>
            <p className="flex gap-3">
              <Mail size={18} className="mt-1 shrink-0 text-coral-300" aria-hidden="true" />
              <a href="mailto:giftmangifts@gmail.com" className="break-all hover:text-white">
                giftmangifts@gmail.com
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase text-coral-200">Hours</h2>
          <dl className="space-y-2 text-sm text-stone-300">
            <div className="flex justify-between gap-6">
              <dt>Mon-Fri</dt>
              <dd className="font-semibold text-white">10-6</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt>Sat</dt>
              <dd className="font-semibold text-white">11-6</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt>Sun</dt>
              <dd className="font-semibold text-white">11-5</dd>
            </div>
          </dl>
          <Link
            href="https://www.facebook.com/GiftmanGifts/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral-200 hover:text-white"
          >
            <ExternalLink size={16} aria-hidden="true" /> Facebook
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase text-coral-200">Collections</h2>
          <div className="grid gap-2 text-sm text-stone-300">
            {featuredCollections.map((collection) => (
              <Link key={collection.slug} href={`/collections/${collection.slug}`} className="hover:text-white">
                {collection.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Gift Man. Static catalog experience.
      </div>
    </footer>
  );
}
