"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import type { Collection, Product } from "@/lib/types";

const PAGE_SIZE = 24;

function getSearchIndexText(product: Product) {
  return [
    product.title,
    product.description,
    product.productType,
    product.markdownType,
    product.tags.join(" "),
    product.collections.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

type ProductsBrowserProps = {
  products: Product[];
  collections: Collection[];
  initialCollection?: string;
  initialQuery?: string;
};

export default function ProductsBrowser({
  products,
  collections,
  initialCollection = "all",
  initialQuery = "",
}: ProductsBrowserProps) {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? initialQuery;
  const maxPrice = Math.ceil(Math.max(...products.map((product) => product.price.max)));
  const [query, setQuery] = useState(queryFromUrl);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch = normalizedQuery ? getSearchIndexText(product).includes(normalizedQuery) : true;
      const matchesCollection =
        selectedCollection === "all" ? true : product.collections.includes(selectedCollection);
      const matchesPrice = product.price.min <= selectedMaxPrice;
      return matchesSearch && matchesCollection && matchesPrice;
    });

    return filtered.sort((a, b) => {
      if (sort === "price-asc") return a.price.min - b.price.min;
      if (sort === "price-desc") return b.price.max - a.price.max;
      if (sort === "name-asc") return a.title.localeCompare(b.title);
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [products, query, selectedCollection, selectedMaxPrice, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function resetPage<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[286px_1fr]">
      <FilterSidebar
        collections={collections}
        selectedCollection={selectedCollection}
        onCollectionChange={(value) => resetPage(setSelectedCollection, value)}
        maxPrice={maxPrice}
        selectedMaxPrice={selectedMaxPrice}
        onPriceChange={(value) => resetPage(setSelectedMaxPrice, value)}
        sort={sort}
        onSortChange={(value) => resetPage(setSort, value)}
      />

      <div className="min-w-0">
        <div className="mb-6 rounded-[8px] border border-ink-900/10 bg-white/92 p-3 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-coral-700"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => resetPage(setQuery, event.target.value)}
                placeholder="Search by product name, description, or tag"
                className="focus-ring h-12 w-full rounded-[8px] border border-ink-900/10 bg-cream-50 pl-10 pr-4 text-sm font-semibold text-ink-900 transition placeholder:text-stone-400"
              />
            </div>
            <div className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink-900 px-4 text-sm font-black text-white">
              <SlidersHorizontal size={16} aria-hidden="true" />
              {filteredProducts.length} items
            </div>
          </div>
        </div>

        {visibleProducts.length ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <div className="rounded-[8px] border border-dashed border-ink-900/20 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-ink-900">No products found</h2>
            <p className="mt-2 text-stone-600">Try a broader search or a higher price range.</p>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ink-900/10 pt-6 sm:flex-row">
          <p className="text-sm font-bold text-stone-600">
            Page {safePage} of {pageCount}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={safePage === 1}
              className="focus-ring rounded-[8px] border border-ink-900/10 bg-white px-4 py-2 text-sm font-black text-ink-900 shadow-sm transition hover:border-coral-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              disabled={safePage === pageCount}
              className="focus-ring rounded-[8px] border border-ink-900/10 bg-white px-4 py-2 text-sm font-black text-ink-900 shadow-sm transition hover:border-coral-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
