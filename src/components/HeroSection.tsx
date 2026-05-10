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
    <section className="relative isolate min-h-[76svh] overflow-hidden bg-stone-950 text-white">
      {primary ? (
        <ProductImage
          src={primary.featuredImage}
          alt={primary.title}
          priority
          className="absolute inset-0 -z-20 h-full w-full rounded-none opacity-45"
          imageClassName="object-cover"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(215,71,53,0.34),transparent_34%),linear-gradient(90deg,rgba(22,19,19,0.92),rgba(22,19,19,0.66)_44%,rgba(22,19,19,0.2))]" />

      <div className="mx-auto grid min-h-[76svh] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl pt-4">
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
            Gift Man
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-stone-100 sm:text-xl">
            Brooklyn gifts, souvenirs, apparel, and in-house embroidery from a Park Slope shop that has been part of
            the neighborhood since 1982.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-coral-800"
            >
              Shop the catalog <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-stone-950"
            >
              Our story
            </Link>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Store, label: "Est. 1982" },
              { icon: ShieldCheck, label: "Family owned" },
              { icon: Truck, label: "Free shipping $150+" },
              { icon: Scissors, label: "Embroidery on-site" },
            ].map((item) => (
              <div key={item.label} className="rounded-[8px] border border-white/18 bg-white/10 p-3 backdrop-blur">
                <item.icon size={20} className="mb-3 text-coral-200" aria-hidden="true" />
                <p className="text-sm font-bold leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
          {second ? (
            <ProductImage
              src={second.featuredImage}
              alt={second.title}
              priority
              className="aspect-[4/5] rounded-[8px] shadow-2xl"
              sizes="24vw"
            />
          ) : null}
          {third ? (
            <ProductImage
              src={third.featuredImage}
              alt={third.title}
              priority
              className="mt-16 aspect-[4/5] rounded-[8px] shadow-2xl"
              sizes="24vw"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
