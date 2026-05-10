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
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-stone-950 sm:text-5xl">
              Shop by Category
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
              Easy paths into the neighborhood classics: Brooklyn apparel, NYC souvenirs, mugs, books, baby gifts, and
              keepsakes.
            </p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-coral-700">
            View all products <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCollections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-stone-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <ProductImage
                src={collection.image}
                alt={collection.name}
                priority={index < 2}
                className="aspect-[5/4]"
                imageClassName="group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="flex items-end justify-between gap-4 p-4">
                <div>
                  <h3 className="text-lg font-bold leading-tight text-stone-950">{collection.name}</h3>
                  <p className="mt-1 text-sm font-medium text-stone-500">{collection.count} products</p>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-coral-700 text-white">
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
