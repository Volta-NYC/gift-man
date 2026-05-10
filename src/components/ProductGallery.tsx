"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { imageSrcSet } from "@/lib/utils";

type ProductGalleryProps = {
  title: string;
  images: string[];
};

export default function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];
  const showThumbnails = images.length > 1;

  return (
    <div className={showThumbnails ? "grid gap-4 lg:grid-cols-[92px_1fr]" : ""}>
      {showThumbnails ? (
        <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`focus-ring relative aspect-square w-20 shrink-0 overflow-hidden rounded-[8px] border bg-white transition ${
                index === activeIndex ? "border-coral-700 ring-4 ring-coral-100" : "border-ink-900/10"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                srcSet={imageSrcSet(image)}
                sizes="80px"
                alt={`${title} thumbnail ${index + 1}`}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setZoomed(true)}
        className={`focus-ring group relative block w-full overflow-hidden rounded-[8px] border border-ink-900/10 bg-white shadow-soft ${
          showThumbnails ? "order-1 lg:order-2" : ""
        }`}
        aria-label="Zoom product image"
      >
        <ProductImage
          src={activeImage}
          alt={title}
          priority
          className="aspect-square rounded-none"
          sizes="(min-width: 1024px) 50vw, 100vw"
          imageClassName="object-contain p-4 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-[8px] bg-ink-900 px-4 py-2 text-sm font-black text-white shadow-lg">
          <ZoomIn size={16} aria-hidden="true" /> Zoom
        </span>
      </button>

      {zoomed ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900/88 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-[8px] bg-white px-4 py-2 text-sm font-black text-ink-900"
            onClick={() => setZoomed(false)}
          >
            Close
          </button>
          <div className="relative h-[82vh] w-full max-w-5xl overflow-hidden rounded-[8px] bg-white">
            <ProductImage
              src={activeImage}
              alt={title}
              className="absolute inset-0 rounded-none"
              imageClassName="object-contain p-6"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
