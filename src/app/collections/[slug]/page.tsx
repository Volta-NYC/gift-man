import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductsBrowser from "@/components/ProductsBrowser";
import ProductImage from "@/components/ProductImage";
import { collections, getCollection, getCollectionProducts } from "@/lib/products";

type CollectionPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const collection = getCollection(params.slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} | Gift Man`,
      description: collection.description,
      images: [{ url: collection.image, alt: collection.name }],
    },
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const collectionProducts = getCollectionProducts(collection);

  return (
    <section className="bg-cream-50 py-10 sm:py-14">
      <div className="section-shell">
        <div className="scroll-reveal scroll-soft mb-8 grid gap-8 overflow-hidden rounded-[8px] border border-ink-900/10 bg-white p-5 shadow-soft lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase text-coral-700">Collection</p>
            <h1 className="font-display text-5xl font-semibold text-ink-900 sm:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-700">{collection.description}</p>
            <p className="mt-4 text-sm font-black text-stone-500">{collection.count} products</p>
          </div>
          <ProductImage
            src={collection.image}
            alt={collection.name}
            priority
            className="aspect-[4/3] rounded-[8px] bg-cream-100"
            imageClassName="object-contain p-5"
            sizes="(min-width: 1024px) 28vw, 100vw"
          />
        </div>
        <Suspense>
          <ProductsBrowser products={collectionProducts} collections={collections} initialCollection={collection.name} />
        </Suspense>
      </div>
    </section>
  );
}
