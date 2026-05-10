"use client";

import { useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";
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
  const { addItem } = useCart();
  const defaultOptions = Object.fromEntries(product.options.map((option) => [option.name, option.values[0] ?? ""]));
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultOptions);
  const [added, setAdded] = useState(false);
  const activeVariant = useMemo(() => findVariant(product, selectedOptions), [product, selectedOptions]);
  const canAddToCart = Boolean(product.available && activeVariant?.available);

  function updateOption(name: string, value: string) {
    setSelectedOptions((current) => ({ ...current, [name]: value }));
    setAdded(false);
  }

  function addToCart() {
    if (!activeVariant || !canAddToCart) return;
    addItem({
      productId: product.id,
      productHandle: product.handle,
      variantId: activeVariant.id,
      title: product.title,
      variantTitle: activeVariant.title,
      image: product.featuredImage,
      price: activeVariant.price,
      options: activeVariant.options,
      sku: activeVariant.sku,
    });
    setAdded(true);
  }

  return (
    <div className="rounded-[8px] border border-ink-900/10 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-black text-ink-900">
            {activeVariant ? formatMoney(activeVariant.price) : product.price.display}
          </p>
          {product.price.min !== product.price.max ? (
            <p className="mt-1 text-sm font-semibold text-stone-500">Range: {product.price.display}</p>
          ) : null}
        </div>
        <span
          className={`rounded-[6px] px-3 py-1 text-xs font-black uppercase ${
            canAddToCart ? "bg-sage-100 text-sage-900" : "bg-stone-100 text-stone-500"
          }`}
        >
          {canAddToCart ? "In stock" : "Unavailable"}
        </span>
      </div>

      {product.options.length ? (
        <div className="mt-6 space-y-4">
          {product.options.map((option) => (
            <div key={option.name}>
              <label className="mb-2 block text-xs font-black uppercase text-stone-500">
                {option.name}
              </label>
              <select
                value={selectedOptions[option.name] ?? option.values[0]}
                onChange={(event) => updateOption(option.name, event.target.value)}
                className="focus-ring h-12 w-full rounded-[8px] border border-ink-900/10 bg-cream-50 px-3 text-sm font-bold text-ink-900"
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
        disabled={!canAddToCart}
        onClick={addToCart}
        className="focus-ring mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[8px] bg-coral-700 px-6 py-4 text-sm font-black uppercase text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coral-800 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {added ? <Check size={18} aria-hidden="true" /> : <ShoppingBag size={18} aria-hidden="true" />}
        {added ? "Added" : "Add to Cart"}
      </button>

      {activeVariant?.sku ? (
        <p className="mt-3 text-center text-xs font-semibold uppercase text-stone-400">
          SKU {activeVariant.sku}
        </p>
      ) : null}
    </div>
  );
}
