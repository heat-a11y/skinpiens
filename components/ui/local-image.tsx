/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface LocalImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * BasePath-aware image tag. next/image does not apply the sub-path
 * prefix to unoptimized sources on static exports, so we resolve the
 * full URL here — works on GitHub Pages (/skinpiens) and locally.
 */
export function LocalImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
}: LocalImageProps) {
  return (
    <img
      src={`${BASE_PATH}${src}`}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      draggable={false}
      className={cn(
        fill && "absolute inset-0 h-full w-full object-cover",
        className,
      )}
    />
  );
}
