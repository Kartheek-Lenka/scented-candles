import Image from "next/image";

import { cn } from "@/lib/utils";

type TileTone =
  | "terracotta"
  | "sage"
  | "taupe"
  | "rose"
  | "espresso"
  | "charcoal";

const TONES: Record<TileTone, { from: string; to: string; glow: string }> = {
  terracotta: { from: "#E7B99E", to: "#8C4A34", glow: "#FFE0C2" },
  sage: { from: "#CBD2C0", to: "#5C6857", glow: "#F2F6E8" },
  taupe: { from: "#E5DACA", to: "#8B7B69", glow: "#FFF6E8" },
  rose: { from: "#EBD2D2", to: "#9A6464", glow: "#FFF0F0" },
  espresso: { from: "#7A5F4E", to: "#241B16", glow: "#F0C48E" },
  charcoal: { from: "#5C5854", to: "#131211", glow: "#D9CFC2" },
};

export type MomentTileProps = {
  tone: TileTone;
  caption?: string;
  className?: string;
  /** 0–1 position of the light source, keeps the grid from feeling tiled. */
  seed?: number;
  /**
   * Optional photograph. When present it replaces the gradient as the tile
   * content; the gradient is still painted underneath as the loading colour
   * and as the permanent fallback if the image fails.
   */
  image?: string;
  /** Alt text. Defaults to a generic description when omitted. */
  imageAlt?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A social-grid tile. Uses real photography when `image` is provided and falls
 * back to a hand-built gradient composition otherwise, so the grid still reads
 * as a deliberate art direction rather than a broken layout.
 */
export function MomentTile({
  tone,
  caption,
  className,
  seed = 0,
  image,
  imageAlt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw",
  priority = false,
}: MomentTileProps) {
  const t = TONES[tone];
  const lightX = 30 + ((seed * 37) % 55);
  const lightY = 22 + ((seed * 23) % 40);

  return (
    <figure
      className={cn(
        "grain relative isolate aspect-square overflow-hidden rounded-2xl",
        className,
      )}
      style={{ backgroundColor: t.to }}
    >
      {/* Gradient base: loading colour, and fallback if the photo 404s */}
      <span
        className="absolute inset-0"
        style={{
          backgroundColor: t.to,
          backgroundImage: `radial-gradient(120% 100% at ${lightX}% ${lightY}%, ${t.from} 0%, ${t.to} 78%)`,
        }}
        aria-hidden="true"
      />

      {image && (
        <Image
          src={image}
          alt={imageAlt ?? caption ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}

      <span
        className="absolute -right-6 -bottom-10 size-40 rounded-full blur-2xl"
        style={{ backgroundColor: t.glow, opacity: image ? 0.12 : 0.22 }}
        aria-hidden="true"
      />
      {/* Scrim under the caption keeps the text legible over any photo */}
      <span
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, rgba(23,22,20,0.72) 0%, rgba(23,22,20,0.28) 55%, transparent)",
        }}
        aria-hidden="true"
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 text-[0.6875rem] tracking-wide text-cream">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
