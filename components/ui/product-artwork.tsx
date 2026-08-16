import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * CSS-rendered product art — a stylised cosmetic bottle with
 * gradient glass, label and cap. No external images required.
 */
export function ProductArtwork({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { art } = product;
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
        style={{ background: `color-mix(in srgb, ${art.accent} 35%, transparent)` }}
      />
      {/* bottle */}
      <div className="relative z-10 mb-[12%] flex flex-col items-center">
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
            <span
              className="text-center font-sans text-[7px] uppercase tracking-[0.18em]"
              style={{ color: `color-mix(in srgb, ${art.accent} 80%, #000)` }}
            >
              Skinpiens
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
