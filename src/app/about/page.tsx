import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scissors, Store } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import StoreMap from "@/components/StoreMap";
import { getHeroProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Gift Man, a Park Slope Brooklyn gift shop established in 1982 and owned by Jack Russo.",
};

export default function AboutPage() {
  const [primary, secondary] = getHeroProducts();

  return (
    <div className="bg-cream-50">
      <section className="section-shell grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="scroll-reveal scroll-left">
          <p className="mb-3 text-sm font-black uppercase text-coral-700">Est. 1982</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-ink-900 sm:text-7xl">
            A Park Slope gift shop with a working-shop soul.
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Gift Man is a mom-and-pop store at 176 5th Avenue in Brooklyn, owned by Jack Russo. It began as a small
            shop selling chairs to restaurants and evolved into a neighborhood destination for Brooklyn souvenirs, local
            apparel, custom embroidery, gifts, and New York keepsakes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-[8px] bg-coral-700 px-6 py-3 text-sm font-black uppercase text-white shadow-sm transition hover:bg-coral-800"
            >
              Shop products <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="focus-ring inline-flex items-center justify-center rounded-[8px] border border-ink-900/10 bg-white px-6 py-3 text-sm font-black uppercase text-ink-900 shadow-sm transition hover:border-coral-300"
            >
              Visit the shop
            </Link>
          </div>
        </div>

        <div className="scroll-reveal reveal-grid grid grid-cols-2 gap-4" data-delay="1">
          {primary ? (
            <ProductImage
              src={primary.featuredImage}
              alt={primary.title}
              priority
              className="aspect-[4/5] rounded-[8px] border border-ink-900/10 bg-white shadow-soft"
              imageClassName="object-contain p-5"
              sizes="(min-width: 1024px) 28vw, 50vw"
            />
          ) : null}
          {secondary ? (
            <ProductImage
              src={secondary.featuredImage}
              alt={secondary.title}
              priority
              className="mt-12 aspect-[4/5] rounded-[8px] border border-ink-900/10 bg-white shadow-soft"
              imageClassName="object-contain p-5"
              sizes="(min-width: 1024px) 28vw, 50vw"
            />
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell scroll-reveal reveal-grid grid gap-8 lg:grid-cols-3">
          <div className="rounded-[8px] border border-ink-900/10 bg-cream-50 p-6 shadow-sm">
            <Store size={30} className="text-coral-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-ink-900">Neighborhood Retail</h2>
            <p className="mt-3 leading-7 text-stone-600">
              The catalog mixes everyday souvenirs with locally flavored gifts that feel specific to Brooklyn and New
              York City.
            </p>
          </div>
          <div className="rounded-[8px] border border-ink-900/10 bg-cream-50 p-6 shadow-sm">
            <Scissors size={30} className="text-coral-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-ink-900">Custom Embroidery</h2>
            <p className="mt-3 leading-7 text-stone-600">
              The in-house 15-needle embroidery machine handles apparel, hats, totes, towels, banners, baby onesies,
              and sweatshirts.
            </p>
          </div>
          <div className="rounded-[8px] border border-ink-900/10 bg-cream-50 p-6 shadow-sm">
            <p className="text-5xl font-black text-coral-700">42+</p>
            <h2 className="mt-5 text-2xl font-black text-ink-900">Years in Brooklyn</h2>
            <p className="mt-3 leading-7 text-stone-600">
              Gift Man’s point of view comes from decades of serving visitors, neighbors, families, and repeat
              customers.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="scroll-reveal scroll-left">
          <h2 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
            Find Gift Man on 5th Avenue.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-700">
            The shop sits between Degraw and Sackett in Park Slope, close to the neighborhood’s restaurants, brownstone
            blocks, and steady weekend foot traffic.
          </p>
        </div>
        <div className="scroll-reveal scroll-right" data-delay="1">
          <StoreMap />
        </div>
      </section>
    </div>
  );
}
