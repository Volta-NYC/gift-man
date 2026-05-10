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
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-coral-700">Est. 1982</p>
          <h1 className="font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-stone-950 sm:text-7xl">
            A Park Slope gift shop with a working-shop soul.
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Gift Man is a mom-and-pop store at 176 5th Avenue in Brooklyn, owned by Jack Russo. It began as a small
            shop selling chairs to restaurants and evolved into a neighborhood destination for Brooklyn souvenirs, local
            apparel, custom embroidery, gifts, and New York keepsakes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-700 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-coral-800"
            >
              Shop products <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-stone-950 transition hover:border-coral-300"
            >
              Visit the shop
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {primary ? (
            <ProductImage
              src={primary.featuredImage}
              alt={primary.title}
              priority
              className="aspect-[4/5] rounded-[8px] shadow-soft"
              sizes="(min-width: 1024px) 28vw, 50vw"
            />
          ) : null}
          {secondary ? (
            <ProductImage
              src={secondary.featuredImage}
              alt={secondary.title}
              priority
              className="mt-12 aspect-[4/5] rounded-[8px] shadow-soft"
              sizes="(min-width: 1024px) 28vw, 50vw"
            />
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-[8px] border border-stone-200 bg-cream-50 p-6">
            <Store size={30} className="text-coral-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-stone-950">Neighborhood Retail</h2>
            <p className="mt-3 leading-7 text-stone-600">
              The catalog mixes everyday souvenirs with locally flavored gifts that feel specific to Brooklyn and New
              York City.
            </p>
          </div>
          <div className="rounded-[8px] border border-stone-200 bg-cream-50 p-6">
            <Scissors size={30} className="text-coral-700" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-stone-950">Custom Embroidery</h2>
            <p className="mt-3 leading-7 text-stone-600">
              The in-house 15-needle embroidery machine handles apparel, hats, totes, towels, banners, baby onesies,
              and sweatshirts.
            </p>
          </div>
          <div className="rounded-[8px] border border-stone-200 bg-cream-50 p-6">
            <p className="text-5xl font-black text-coral-700">42+</p>
            <h2 className="mt-5 text-2xl font-black text-stone-950">Years in Brooklyn</h2>
            <p className="mt-3 leading-7 text-stone-600">
              Gift Man’s point of view comes from decades of serving visitors, neighbors, families, and repeat
              customers.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-stone-950 sm:text-5xl">
            Find Gift Man on 5th Avenue.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            The shop sits between Degraw and Sackett in Park Slope, close to the neighborhood’s restaurants, brownstone
            blocks, and steady weekend foot traffic.
          </p>
        </div>
        <StoreMap />
      </section>
    </div>
  );
}
