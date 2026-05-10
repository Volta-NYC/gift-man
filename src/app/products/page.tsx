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
      <div className="section-shell">
        <div className="mb-8 grid gap-6 border-b border-ink-900/10 pb-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-semibold text-ink-900 sm:text-6xl">
              All Products
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              Browse the complete Gift Man catalog: 316 Brooklyn gifts, NYC souvenirs, apparel, mugs, books, baby goods,
              and custom-friendly pieces.
            </p>
          </div>
          <div className="rounded-[8px] border border-ink-900/10 bg-white p-4 shadow-sm">
            <p className="text-sm font-black text-coral-700">316 products</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-stone-600">
              Local images, real variants, and static pages for every item.
            </p>
          </div>
        </div>
        <Suspense>
          <ProductsBrowser products={products} collections={collections} />
        </Suspense>
      </div>
    </section>
  );
}
