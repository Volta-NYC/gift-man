"use client";

import { useMemo, useState } from "react";
import { Gift, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

type GiftCardSelectorProps = {
  product?: Product;
};

const fallbackDenominations = [10, 25, 50, 100, 200, 250];

export default function GiftCardSelector({ product }: GiftCardSelectorProps) {
  const denominations = useMemo(
    () => product?.variants.map((variant) => variant.price).filter(Boolean) ?? fallbackDenominations,
    [product]
  );
  const [selected, setSelected] = useState(denominations[1] ?? denominations[0]);
  const [added, setAdded] = useState(false);

  return (
    <div className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-coral-100 text-coral-700">
          <Gift size={24} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-stone-500">Gift Man Gift Card</p>
          <p className="text-3xl font-black text-stone-950">{formatMoney(selected)}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {denominations.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setSelected(value);
              setAdded(false);
            }}
            className={`rounded-[8px] border px-4 py-4 text-lg font-black transition ${
              selected === value
                ? "border-coral-700 bg-coral-700 text-white shadow-lg"
                : "border-stone-200 bg-cream-50 text-stone-950 hover:border-coral-300"
            }`}
          >
            {formatMoney(value)}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setAdded(true)}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-stone-800"
      >
        <ShoppingBag size={18} aria-hidden="true" />
        {added ? "Added" : "Add Gift Card"}
      </button>
    </div>
  );
}
