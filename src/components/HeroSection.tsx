import Link from "next/link";
import { ArrowRight, Scissors, ShieldCheck, Store, Truck } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import type { Product } from "@/lib/types";

type HeroSectionProps = {
  products: Product[];
};

export default function HeroSection({ products }: HeroSectionProps) {
  const [primary, second, third] = products;

  return (
    <section className="relative isolate overflow-hidden bg-cream-50">
      <div className="absolute inset-x-0 top-10 -z-10 hidden h-px bg-ink-900/10 lg:block" />
      <div className="section-shell grid min-h-[calc(82svh-108px)] items-center gap-10 py-10 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
        <div className="scroll-reveal scroll-soft max-w-2xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.92] text-ink-900 sm:text-8xl lg:text-9xl">
            Gift Man
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-stone-700 sm:text-xl">
            Brooklyn gifts, souvenirs, apparel, and in-house embroidery from a Park Slope shop that has been part of
            the neighborhood since 1982.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-[8px] bg-coral-700 px-6 py-3 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coral-800"
            >
              Shop the catalog <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="focus-ring inline-flex items-center justify-center rounded-[8px] border border-ink-900/15 bg-white px-6 py-3 text-sm font-black text-ink-900 shadow-sm transition hover:-translate-y-0.5 hover:border-coral-300"
            >
              Our story
            </Link>
          </div>
          <div className="scroll-reveal reveal-grid mt-10 grid max-w-2xl grid-cols-2 border-y border-ink-900/12 sm:grid-cols-4" data-delay="2">
            {[
              { icon: Store, label: "Est. 1982" },
              { icon: ShieldCheck, label: "Family owned" },
              { icon: Truck, label: "Free shipping $150+" },
              { icon: Scissors, label: "Embroidery on-site" },
            ].map((item) => (
              <div key={item.label} className="border-ink-900/12 py-4 pr-4 sm:border-r sm:last:border-r-0">
                <item.icon size={20} className="mb-3 text-coral-700" aria-hidden="true" />
                <p className="text-sm font-black leading-tight text-ink-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-reveal scroll-right relative min-h-[420px] sm:min-h-[500px]" data-delay="1">
          <div className="scroll-depth absolute left-0 top-6 h-[78%] w-[72%] rounded-[8px] border border-ink-900/12 bg-white p-3 shadow-lift">
            {primary ? (
              <ProductImage
                src={primary.featuredImage}
                alt={primary.title}
                priority
                className="h-full rounded-[6px] bg-cream-100"
                imageClassName="object-contain p-6"
                sizes="(min-width: 1024px) 46vw, 80vw"
              />
            ) : null}
          </div>
          {second ? (
            <div className="absolute right-0 top-0 w-[42%] rounded-[8px] border border-ink-900/12 bg-skywash-100 p-3 shadow-soft">
              <ProductImage
                src={second.featuredImage}
                alt={second.title}
                priority
                className="aspect-[4/5] rounded-[6px] bg-white/75"
                imageClassName="object-contain p-4"
                sizes="(min-width: 1024px) 22vw, 42vw"
              />
            </div>
          ) : null}
          {third ? (
            <div className="absolute bottom-2 right-4 w-[50%] rounded-[8px] border border-ink-900/12 bg-ink-900 p-3 shadow-lift sm:right-8">
              <ProductImage
                src={third.featuredImage}
                alt={third.title}
                priority
                className="aspect-[5/4] rounded-[6px] bg-cream-50"
                imageClassName="object-contain p-4"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <p className="px-1 pt-3 text-sm font-black text-white">Fresh from the shelves</p>
            </div>
          ) : null}
          <div className="absolute bottom-10 left-5 hidden rounded-[8px] border border-ink-900/12 bg-white px-5 py-4 shadow-soft sm:block">
            <p className="text-sm font-black text-coral-700">176 Fifth Avenue</p>
            <p className="mt-1 text-sm font-semibold text-stone-600">Park Slope, Brooklyn</p>
          </div>
        </div>
      </div>
    </section>
  );
}
