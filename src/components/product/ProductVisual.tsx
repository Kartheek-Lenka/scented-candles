"use client";

import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/data/products";
import { CandleArt } from "@/components/product/CandleArt";
import { hexToRgba } from "@/lib/color";
import { cn } from "@/lib/utils";

export type ProductVisualProps = {
  product: Product;
  sizeGrams?: number;
  /** Aspect ratio of the frame. */
  ratio?: "portrait" | "square" | "tall";
  priority?: boolean;
  sizes?: string;
  className?: string;
  lit?: boolean;
};

const RATIO: Record<NonNullable<ProductVisualProps["ratio"]>, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
};

/**
 * Renders the branded candle vessel, sat over the scent's ingredient
 * photography when `product.image` is set. The photo is treated as atmosphere
 * (blurred, washed toward the accent, scrimmed) so the vessel always stays the
 * subject — these are raw-ingredient textures, not product shots.
 *
 * A broken or missing image simply drops the backdrop; the artwork underneath
 * is the permanent base, so the layout can never tear.
 */
export function ProductVisual({
  product,
  sizeGrams = 100,
  ratio = "portrait",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
  lit = true,
}: ProductVisualProps) {
  const [failed, setFailed] = useState(false);
  const showBackdrop = Boolean(product.image) && !failed;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        RATIO[ratio],
        className,
      )}
      style={{ backgroundColor: `${product.accentColor}1A` }}
    >
      {showBackdrop && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image
            src={product.image as string}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
            className="scale-110 object-cover blur-[2px] saturate-[0.85]"
          />
          {/* Wash the photo toward the scent's accent so all six read as one set */}
          <span
            className="absolute inset-0"
            style={{ backgroundColor: hexToRgba(product.accentColor, 0.32) }}
          />
          <span className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_38%,transparent_18%,rgba(251,247,240,0.55)_78%,rgba(251,247,240,0.8)_100%)]" />
        </div>
      )}

      <div className="absolute inset-0">
        <CandleArt
          accentColor={product.accentColor}
          label={product.name}
          sublabel={product.moodLabel}
          sizeGrams={sizeGrams}
          lit={lit}
        />
      </div>
    </div>
  );
}
