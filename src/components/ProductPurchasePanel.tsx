"use client";

import { useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

type ProductPurchasePanelProps = {
  product: Product;
};

function findVariant(product: Product, selected: Record<string, string>): ProductVariant {
  return (
    product.variants.find((variant) =>
      product.options.every((option) => !selected[option.name] || variant.options[option.name] === selected[option.name])
    ) ?? product.variants[0]
  );
}

export default function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const defaultOptions = Object.fromEntries(product.options.map((option) => [option.name, option.values[0] ?? ""]));
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultOptions);
  const [added, setAdded] = useState(false);
  const activeVariant = useMemo(() => findVariant(product, selectedOptions), [product, selectedOptions]);

  function updateOption(name: string, value: string) {
    setSelectedOptions((current) => ({ ...current, [name]: value }));
    setAdded(false);
  }

  return (
    <div className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-black tracking-[-0.02em] text-stone-950">
            {activeVariant ? formatMoney(activeVariant.price) : product.price.display}
          </p>
          {product.price.min !== product.price.max ? (
            <p className="mt-1 text-sm font-semibold text-stone-500">Range: {product.price.display}</p>
          ) : null}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
            product.available ? "bg-sage-100 text-sage-900" : "bg-stone-100 text-stone-500"
          }`}
        >
          {product.available ? "In stock" : "Unavailable"}
        </span>
      </div>

      {product.options.length ? (
        <div className="mt-6 space-y-4">
          {product.options.map((option) => (
            <div key={option.name}>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-stone-500">
                {option.name}
              </label>
              <select
                value={selectedOptions[option.name] ?? option.values[0]}
                onChange={(event) => updateOption(option.name, event.target.value)}
                className="h-12 w-full rounded-[8px] border border-stone-200 bg-cream-50 px-3 text-sm font-bold text-stone-950 outline-none focus:border-coral-600 focus:ring-4 focus:ring-coral-100"
              >
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        disabled={!product.available}
        onClick={() => setAdded(true)}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-coral-700 px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:bg-coral-800 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {added ? <Check size={18} aria-hidden="true" /> : <ShoppingBag size={18} aria-hidden="true" />}
        {added ? "Added" : "Add to Cart"}
      </button>

      {activeVariant?.sku ? (
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-stone-400">
          SKU {activeVariant.sku}
        </p>
      ) : null}
    </div>
  );
}
