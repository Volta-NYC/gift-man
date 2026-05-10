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
      className="group block h-full overflow-hidden rounded-[8px] border border-ink-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-coral-300 hover:shadow-lift"
    >
      <div className="relative">
        {product.isOnSale ? (
          <span className="absolute left-3 top-3 z-10 rounded-[6px] bg-coral-700 px-2.5 py-1 text-xs font-black text-white">
            Sale
          </span>
        ) : null}
        <ProductImage
          src={product.featuredImage}
          alt={product.title}
          priority={eager}
          className="aspect-[4/5] rounded-none bg-cream-100"
          imageClassName="object-contain p-5 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-[8px] bg-ink-900 px-3 py-2 text-center text-sm font-black text-white opacity-0 shadow-soft transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Details
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-[0.98rem] font-bold leading-snug text-ink-900">
            {product.title}
          </h3>
          <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-[6px] border border-ink-900/10 bg-cream-50 text-ink-900 transition group-hover:border-coral-300 group-hover:text-coral-700">
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-coral-700">{product.price.display}</p>
          <p className="text-xs font-bold text-stone-500">{product.productType || product.collections[0] || "Gift"}</p>
        </div>
      </div>
    </Link>
  );
}
