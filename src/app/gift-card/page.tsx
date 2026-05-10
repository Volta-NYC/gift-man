import type { Metadata } from "next";
import GiftCardSelector from "@/components/GiftCardSelector";
import ProductImage from "@/components/ProductImage";
import { getGiftCardProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Gift Card",
  description: "Choose a Gift Man gift card denomination from $10 to $250.",
};

export default function GiftCardPage() {
  const giftCard = getGiftCardProduct();

  return (
    <section className="bg-cream-50 py-12 sm:py-16">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="scroll-reveal scroll-left">
          <p className="mb-3 text-sm font-black uppercase text-coral-700">Gift Card</p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-ink-900 sm:text-7xl">
            Let them choose the Brooklyn gift.
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Gift Man gift cards are available in $10, $25, $50, $100, $200, and $250 denominations for souvenirs,
            apparel, baby gifts, mugs, books, and custom embroidery.
          </p>
          <div className="mt-8 max-w-xl">
            <GiftCardSelector product={giftCard} />
          </div>
        </div>

        {giftCard ? (
          <ProductImage
            src={giftCard.featuredImage}
            alt={giftCard.title}
            priority
            className="scroll-reveal scroll-right aspect-[4/3] rounded-[8px] border border-ink-900/10 bg-white shadow-soft"
            imageClassName="object-contain p-8"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        ) : (
          <div className="scroll-reveal scroll-right rounded-[8px] border border-ink-900/10 bg-white p-8 shadow-soft">
            <div className="aspect-[4/3] rounded-[8px] bg-[linear-gradient(135deg,#161313,#3a312d)] p-8 text-white">
              <p className="font-display text-5xl font-semibold">Gift Man</p>
              <p className="mt-3 text-sm font-black uppercase text-coral-200">Brooklyn Gifts</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
