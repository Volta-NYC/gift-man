"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type FeaturedCarouselProps = {
  products: Product[];
};

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(direction: number) {
    scroller.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  }

  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <div className="section-shell">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              Neighborhood Favorites
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-700">
              A quick shelf of visually strong staples from the catalog.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="focus-ring flex size-11 items-center justify-center rounded-[8px] border border-ink-900/10 bg-white text-ink-900 shadow-sm transition hover:border-coral-300"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="focus-ring flex size-11 items-center justify-center rounded-[8px] border border-ink-900/10 bg-white text-ink-900 shadow-sm transition hover:border-coral-300"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex snap-x gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => (
            <div key={product.handle} className="w-[78vw] shrink-0 snap-start sm:w-[320px]">
              <ProductCard product={product} eager={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
