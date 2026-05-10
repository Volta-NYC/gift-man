"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import ProductImage from "@/components/ProductImage";

type ProductGalleryProps = {
  title: string;
  images: string[];
};

export default function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[92px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-[8px] border bg-white transition ${
              index === activeIndex ? "border-coral-700 ring-4 ring-coral-100" : "border-stone-200"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <ProductImage src={image} alt={`${title} thumbnail ${index + 1}`} className="absolute inset-0 rounded-none" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="group relative order-1 overflow-hidden rounded-[8px] border border-stone-200 bg-white shadow-sm lg:order-2"
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
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white shadow-lg">
          <ZoomIn size={16} aria-hidden="true" /> Zoom
        </span>
      </button>

      {zoomed ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-950/88 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-950"
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
