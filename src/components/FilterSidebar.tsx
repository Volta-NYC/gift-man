import type { Collection } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

type FilterSidebarProps = {
  collections: Collection[];
  selectedCollection: string;
  onCollectionChange: (value: string) => void;
  maxPrice: number;
  selectedMaxPrice: number;
  onPriceChange: (value: number) => void;
  sort: string;
  onSortChange: (value: string) => void;
};

export default function FilterSidebar({
  collections,
  selectedCollection,
  onCollectionChange,
  maxPrice,
  selectedMaxPrice,
  onPriceChange,
  sort,
  onSortChange,
}: FilterSidebarProps) {
  return (
    <aside className="scroll-reveal scroll-left rounded-[8px] border border-ink-900/10 bg-white/92 p-4 shadow-soft lg:sticky lg:top-32">
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-xs font-black uppercase text-stone-500" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={selectedCollection}
            onChange={(event) => onCollectionChange(event.target.value)}
            className="focus-ring h-11 w-full rounded-[8px] border border-ink-900/10 bg-cream-50 px-3 text-sm font-semibold text-ink-900"
          >
            <option value="all">All categories</option>
            {collections
              .filter((collection) => collection.count > 0)
              .map((collection) => (
                <option key={collection.slug} value={collection.name}>
                  {collection.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-black uppercase text-stone-500" htmlFor="price">
              Price
            </label>
            <span className="text-sm font-black text-ink-900">Up to {formatMoney(selectedMaxPrice)}</span>
          </div>
          <input
            id="price"
            type="range"
            min={0}
            max={Math.ceil(maxPrice)}
            value={selectedMaxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            className="w-full accent-coral-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-black uppercase text-stone-500" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="focus-ring h-11 w-full rounded-[8px] border border-ink-900/10 bg-cream-50 px-3 text-sm font-semibold text-ink-900"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price low-high</option>
            <option value="price-desc">Price high-low</option>
            <option value="name-asc">Name A-Z</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
