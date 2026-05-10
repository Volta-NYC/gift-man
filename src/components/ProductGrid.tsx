import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type ProductGridProps = {
  products: Product[];
  eagerCount?: number;
};

export default function ProductGrid({ products, eagerCount = 4 }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.handle} product={product} eager={index < eagerCount} />
      ))}
    </div>
  );
}
