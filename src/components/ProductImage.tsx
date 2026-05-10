import { cn } from "@/lib/utils";
import { imageSrcSet } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ProductImage({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: ProductImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-cream-100", className)}>
      <img
        src={src}
        alt={alt}
        srcSet={imageSrcSet(src)}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover transition duration-500", imageClassName)}
      />
    </div>
  );
}
