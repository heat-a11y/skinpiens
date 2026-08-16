import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Product artwork — renders the product photograph on a themed gradient
 * with ambient glow and a soft vignette. Falls back to a CSS bottle when
 * no photograph is available.
 */
export function ProductArtwork({
  product,
  className,
  showBrand = true,
  priority = false,
}: {
  product: Product;
  className?: string;
  showBrand?: boolean;
  priority?: boolean;
}) {
  const { art, image, name } = product;

  return (
    <div
      className={cn(
        "relative flex items-end justify-center overflow-hidden rounded-[inherit]",
        className,
      )}
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, ${art.from}, ${art.to})`,
      }}
    >
      {/* ambient light */}
      <div
        className="absolute left-1/2 top-[-15%] h-1/2 w-2/3 -translate-x-1/2 rounded-full blur-2xl"
        style={{ background: `color-mix(in srgb, ${art.accent} 40%, transparent)` }}
      />

      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 z-10 flex items-end justify-center">
          <div className="relative mb-[12%] flex flex-col items-center">
            <div
              className="h-[7%] w-[38%] rounded-t-sm"
              style={{ background: art.accent, opacity: 0.9 }}
            />
            <div
              className="relative w-[54%] rounded-t-xl border-x-2 border-t-2"
              style={{
                background: `linear-gradient(100deg, ${art.to}, rgba(255,255,255,0.85) 45%, ${art.from})`,
                borderColor: `color-mix(in srgb, ${art.accent} 45%, transparent)`,
              }}
            >
              <div className="flex aspect-[10/15] w-full flex-col items-center justify-center gap-1 px-2">
                <span
                  className="font-heading text-lg font-semibold tracking-wide"
                  style={{ color: art.accent }}
                >
                  {art.label}
                </span>
                <span className="h-px w-6" style={{ background: art.accent, opacity: 0.5 }} />
                {showBrand && (
                  <span
                    className="text-center font-sans text-[7px] uppercase tracking-[0.18em]"
                    style={{ color: `color-mix(in srgb, ${art.accent} 80%, #000)` }}
                  >
                    Skinpiens
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* soft vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, color-mix(in srgb, var(--foreground) 14%, transparent))",
        }}
      />
      {/* brand chip */}
      {image && showBrand && (
        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: art.accent }}
          />
          <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/80">
            Skinpiens
          </span>
        </div>
      )}
    </div>
  );
}
