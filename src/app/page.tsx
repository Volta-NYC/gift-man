import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/Newsletter";
import ProductImage from "@/components/ProductImage";
import { collections, getFeaturedProducts, getHeroProducts, products } from "@/lib/products";

export default function HomePage() {
  const heroProducts = getHeroProducts();
  const featuredProducts = getFeaturedProducts(12);
  const photoGrid = products
    .filter((product) => product.images.length > 1 || /tote|shirt|mug|cap|bridge/i.test(product.title))
    .slice(0, 8);

  return (
    <>
      <HeroSection products={heroProducts} />
      <CategoryGrid collections={collections} />
      <FeaturedCarousel products={featuredProducts} />

      <section className="bg-stone-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-coral-700 text-white">
              <Scissors size={28} aria-hidden="true" />
            </div>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
              Custom embroidery, stitched right in Park Slope.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-stone-300">
              Gift Man runs an on-site 15-needle embroidery machine for apparel, hats, tote bags, towels, banners, baby
              onesies, sweatshirts, and custom neighborhood gifts.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-stone-950 transition hover:bg-coral-100"
            >
              Start a custom order <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductImage
                key={product.handle}
                src={product.featuredImage}
                alt={product.title}
                className={`aspect-[4/5] rounded-[8px] shadow-2xl ${index % 2 ? "translate-y-8" : ""}`}
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            {photoGrid.slice(4, 8).map((product, index) => (
              <ProductImage
                key={product.handle}
                src={product.featuredImage}
                alt={product.title}
                className={`aspect-square rounded-[8px] shadow-soft ${index === 1 ? "mt-10" : ""}`}
                sizes="(min-width: 1024px) 24vw, 50vw"
              />
            ))}
          </div>
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-stone-950 sm:text-5xl">
              A Brooklyn shop with a long memory.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              Founded in 1982 and owned by Jack Russo, Gift Man started as a small shop selling chairs to restaurants
              before growing into a beloved Park Slope destination for gifts, souvenirs, and custom work.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Est. 1982", "Park Slope", "Family Owned"].map((item) => (
                <div key={item} className="rounded-[8px] border border-stone-200 bg-cream-50 p-4">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-coral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-stone-950 sm:text-5xl">
                From the shelves
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
                An Instagram-style look at product photos pulled from the real catalog.
              </p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-coral-700">
              Browse all 316 <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {photoGrid.map((product, index) => (
              <Link key={product.handle} href={`/products/${product.handle}`} className="group">
                <ProductImage
                  src={product.featuredImage}
                  alt={product.title}
                  className={`aspect-square rounded-[8px] shadow-sm ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                  imageClassName="group-hover:scale-105"
                  sizes={index === 0 ? "(min-width: 768px) 50vw, 50vw" : "(min-width: 768px) 25vw, 50vw"}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
