import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import { getProduct, getRelatedProducts, products } from "@/lib/products";

type ProductPageProps = {
  params: {
    handle: string;
  };
};

export function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | Gift Man`,
      description: product.description,
      images: [{ url: product.featuredImage, alt: product.title }],
      type: "website",
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.handle);
  if (!product) notFound();
  const relatedProducts = getRelatedProducts(product, 4);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.variants.find((variant) => variant.sku)?.sku,
    brand: {
      "@type": "Brand",
      name: "Gift Man",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: product.price.min,
      highPrice: product.price.max,
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      offerCount: product.variants.length,
    },
  };

  return (
    <article className="bg-cream-50 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="section-shell">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-stone-500">
          <Link href="/" className="hover:text-coral-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-coral-700">
            Products
          </Link>
          {product.collections[0] ? (
            <>
              <span>/</span>
              <span>{product.collections[0]}</span>
            </>
          ) : null}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
          <div className="scroll-reveal scroll-left">
            <ProductGallery title={product.title} images={product.images} />
          </div>

          <div className="scroll-reveal scroll-right space-y-6 lg:sticky lg:top-32" data-delay="1">
            <div>
              <p className="mb-3 text-sm font-black uppercase text-coral-700">
                {product.productType || product.collections[0] || "Gift Man"}
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-stone-700">{product.description}</p>
            </div>

            <ProductPurchasePanel product={product} />

            <section className="rounded-[8px] border border-ink-900/10 bg-white p-5 shadow-soft">
              <h2 className="text-xl font-black text-ink-900">Product Details</h2>
              <div className="product-richtext mt-4" dangerouslySetInnerHTML={{ __html: product.bodyHtml }} />
              <dl className="mt-6 grid gap-3 border-t border-ink-900/10 pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-stone-500">Vendor</dt>
                  <dd className="font-semibold text-ink-900">{product.vendor || "Gift-Man"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-stone-500">Availability</dt>
                  <dd className="font-semibold text-ink-900">{product.available ? "In stock" : "Unavailable"}</dd>
                </div>
                {product.options.length ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-bold text-stone-500">Options</dt>
                    <dd className="text-right font-semibold text-ink-900">
                      {product.options.map((option) => option.name).join(", ")}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </section>
          </div>
        </div>

        <section className="scroll-reveal scroll-rise mt-16 border-t border-ink-900/10 pt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-semibold text-ink-900">
                You May Also Like
              </h2>
              <p className="mt-2 text-stone-600">Related picks from the same Gift Man collection.</p>
            </div>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      </div>
    </article>
  );
}
