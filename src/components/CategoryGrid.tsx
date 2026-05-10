import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import type { Collection } from "@/lib/types";

type CategoryGridProps = {
  collections: Collection[];
};

export default function CategoryGrid({ collections }: CategoryGridProps) {
  const visibleCollections = collections.filter((collection) => collection.count > 0).slice(0, 8);

  return (
    <section className="bg-cream-100 py-14 sm:py-20">
      <div className="section-shell">
        <div className="scroll-reveal scroll-soft mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              Shop by Category
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-700">
              Easy paths into the neighborhood classics: Brooklyn apparel, NYC souvenirs, mugs, books, baby gifts, and
              keepsakes.
            </p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-black text-coral-700">
            View all products <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="scroll-reveal reveal-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCollections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className={`group overflow-hidden rounded-[8px] border border-ink-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-coral-300 hover:shadow-lift ${
                index === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <ProductImage
                src={collection.image}
                alt={collection.name}
                priority={index < 2}
                className={`${index === 0 ? "aspect-[16/11] lg:aspect-[1.26]" : "aspect-[5/4]"} bg-cream-50`}
                imageClassName="object-contain p-5 group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="flex items-end justify-between gap-4 p-4">
                <div>
                  <h3 className="text-lg font-black leading-tight text-ink-900">{collection.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-stone-500">{collection.count} products</p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-coral-700 text-white">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
