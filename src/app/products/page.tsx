import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsBrowser from "@/components/ProductsBrowser";
import { collections, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all 316 Gift Man products with local photos, pricing, variants, and descriptions.",
};

export default function ProductsPage() {
  return (
    <section className="bg-cream-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-6xl">
            All Products
          </h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Browse the complete Gift Man catalog: 316 Brooklyn gifts, NYC souvenirs, apparel, mugs, books, baby goods,
            and custom-friendly pieces.
          </p>
        </div>
        <Suspense>
          <ProductsBrowser products={products} collections={collections} />
        </Suspense>
      </div>
    </section>
  );
}
