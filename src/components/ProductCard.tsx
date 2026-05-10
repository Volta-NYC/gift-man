import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  eager?: boolean;
};

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block rounded-[8px] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl"
    >
      <ProductImage
        src={product.featuredImage}
        alt={product.title}
        priority={eager}
        className="aspect-[4/5] rounded-t-[8px]"
        imageClassName="group-hover:scale-105"
      />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-[0.98rem] font-semibold leading-snug text-stone-950">
            {product.title}
          </h3>
          <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-950 text-white opacity-0 transition group-hover:opacity-100">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-coral-700">{product.price.display}</p>
          {product.isOnSale ? (
            <span className="rounded-full bg-coral-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Sale
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
