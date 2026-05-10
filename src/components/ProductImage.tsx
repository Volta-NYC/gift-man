import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <div className={cn("relative overflow-hidden bg-stone-100", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover transition duration-500", imageClassName)}
      />
    </div>
  );
}
