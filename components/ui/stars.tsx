import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarsProps {
  rating: number;
  reviews?: number;
  size?: number;
  className?: string;
}

export function Stars({ rating, reviews, size = 14, className }: StarsProps) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4 && rating - full < 0.9;
  const rounded = rating - full >= 0.9;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 text-star">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full || (i === full && rounded)) {
            return (
              <Star key={i} size={size} className="fill-current" aria-hidden />
            );
          }
          if (i === full && half) {
            return (
              <div key={i} className="relative">
                <Star size={size} className="text-muted-foreground/30" aria-hidden />
                <StarHalf
                  size={size}
                  className="absolute inset-0 fill-current"
                  aria-hidden
                />
              </div>
            );
          }
          return <Star key={i} size={size} className="text-muted-foreground/30" aria-hidden />;
        })}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {rating.toFixed(1)}
        {reviews !== undefined && (
          <span className="ml-1 text-muted-foreground/70">({reviews.toLocaleString()})</span>
        )}
      </span>
    </div>
  );
}
