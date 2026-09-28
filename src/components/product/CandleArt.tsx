import { useId } from "react";

import { BRAND } from "@/lib/constants";
import { hexToRgba, lighten } from "@/lib/color";
import { cn } from "@/lib/utils";

export type CandleArtProps = {
  /** Accent colour, sourced from the product record. */
  accentColor: string;
  /** Scent name, printed on the vessel label. */
  label: string;
  /** Optional subtitle, e.g. mood. */
  sublabel?: string;
  /** Vessel proportion varies with the product size. */
  sizeGrams?: number;
  /** Lit candles glow; unlit ones read flatter and quieter. */
  lit?: boolean;
  className?: string;
};

const PROPORTIONS: Record<number, { sx: number; sy: number }> = {
  50: { sx: 1.04, sy: 0.84 },
  100: { sx: 1, sy: 1 },
  150: { sx: 0.97, sy: 1.12 },
};

/**
 * Placeholder product composition built entirely in SVG.
 *
 * This is deliberate: the launch shoot does not exist yet, and generic stock
 * candles would drag the whole design down. Drop a real `product.image` into
 * the data file and `<ProductVisual>` will render it with `next/image`
 * instead — nothing else has to change.
 */
export function CandleArt({
  accentColor,
  label,
  sublabel,
  sizeGrams = 100,
  lit = true,
  className,
}: CandleArtProps) {
  const uid = useId().replace(/:/g, "");
  const { sx, sy } = PROPORTIONS[sizeGrams] ?? PROPORTIONS[100];

  const glass = `glass-${uid}`;
  const wax = `wax-${uid}`;
  const flame = `flame-${uid}`;
  const glow = `glow-${uid}`;
  const shadow = `shadow-${uid}`;
  const blur = `blur-${uid}`;
  const clip = `clip-${uid}`;

  const waxTop = lighten(accentColor, 0.42);
  const waxBottom = lighten(accentColor, 0.12);
  const labelText = label.length > 16 ? `${label.slice(0, 15)}…` : label;

  return (
    <svg
      viewBox="0 0 320 420"
      className={cn("h-full w-full", className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0.7">
          <stop offset="0%" stopColor={lighten(accentColor, 0.82)} />
          <stop offset="26%" stopColor={lighten(accentColor, 0.6)} />
          <stop offset="62%" stopColor={lighten(accentColor, 0.34)} />
          <stop offset="100%" stopColor={lighten(accentColor, 0.2)} />
        </linearGradient>

        <linearGradient id={wax} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={waxTop} />
          <stop offset="100%" stopColor={waxBottom} />
        </linearGradient>

        <linearGradient id={flame} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FFF3D0" />
          <stop offset="45%" stopColor={lit ? "#F7B267" : "#E8D9BE"} />
          <stop offset="100%" stopColor={lit ? "#D2703A" : "#CBBBA0"} />
        </linearGradient>

        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFC98A" stopOpacity={lit ? 0.55 : 0.16} />
          <stop offset="55%" stopColor="#FFC98A" stopOpacity={lit ? 0.14 : 0.05} />
          <stop offset="100%" stopColor="#FFC98A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={shadow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#46362D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#46362D" stopOpacity="0" />
        </radialGradient>

        <filter id={blur} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>

        <clipPath id={clip}>
          <path d="M78 152 L78 366 Q78 388 100 388 L220 388 Q242 388 242 366 L242 152 Z" />
        </clipPath>
      </defs>

      {/* Warm ambient light thrown by the flame */}
      <ellipse cx="160" cy="238" rx="150" ry="176" fill={`url(#${glow})`} />

      {/* Contact shadow */}
      <ellipse
        cx="160"
        cy="392"
        rx="104"
        ry="17"
        fill={`url(#${shadow})`}
        filter={`url(#${blur})`}
      />

      <g
        style={{ transform: `translate(160px, 388px) scale(${sx}, ${sy}) translate(-160px, -388px)` }}
      >
        {/* Vessel */}
        <path
          d="M78 152 L78 366 Q78 388 100 388 L220 388 Q242 388 242 366 L242 152 Z"
          fill={`url(#${glass})`}
        />

        {/* Wax pool, clipped inside the glass */}
        <g clipPath={`url(#${clip})`}>
          <path
            d="M80 168 L80 370 Q80 388 100 388 L220 388 Q240 388 240 370 L240 168 Z"
            fill={`url(#${wax})`}
          />
          {/* Wax melt line */}
          <path d="M80 190 L240 190 L240 214 L80 214 Z" fill={hexToRgba("#46362D", 0.05)} />
          {/* Inner shadow on the right wall */}
          <rect x="196" y="150" width="50" height="240" fill={hexToRgba("#46362D", 0.1)} />
        </g>

        {/* Wax surface */}
        <ellipse cx="160" cy="168" rx="78" ry="17" fill={waxTop} />
        <ellipse
          cx="160"
          cy="168"
          rx="78"
          ry="17"
          fill="none"
          stroke={hexToRgba("#46362D", 0.12)}
          strokeWidth="1"
        />

        {/* Wick */}
        <rect x="158" y="150" width="4" height="18" rx="2" fill="#46362D" />

        {/* Flame */}
        {lit && (
          <g>
            <ellipse cx="160" cy="132" rx="34" ry="42" fill={`url(#${glow})`} filter={`url(#${blur})`} />
            <path
              d="M160 92 C176 114 184 126 184 138 C184 152 173 163 160 163 C147 163 136 152 136 138 C136 126 144 114 160 92 Z"
              fill={`url(#${flame})`}
            />
            <path
              d="M160 116 C168 130 172 137 172 144 C172 152 167 158 160 158 C153 158 148 152 148 144 C148 137 152 130 160 116 Z"
              fill="#FFF6DF"
              opacity="0.92"
            />
          </g>
        )}

        {/* Specular highlight */}
        <path
          d="M94 178 L94 340 Q94 356 106 360"
          stroke="#FFFDF8"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          opacity="0.42"
        />
        <path
          d="M226 186 L226 320"
          stroke="#FFFDF8"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
        />

        {/* Vessel rim */}
        <ellipse
          cx="160"
          cy="152"
          rx="82"
          ry="18"
          fill="none"
          stroke={lighten(accentColor, 0.86)}
          strokeWidth="2.5"
          opacity="0.9"
        />

        {/* Label */}
        <g>
          <rect
            x="98"
            y="248"
            width="124"
            height="82"
            rx="4"
            fill="#FFF9F0"
            opacity="0.94"
          />
          <rect
            x="98"
            y="248"
            width="124"
            height="82"
            rx="4"
            fill="none"
            stroke={hexToRgba("#46362D", 0.14)}
            strokeWidth="1"
          />
          <text
            x="160"
            y="272"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="3.2"
            fill={hexToRgba("#46362D", 0.62)}
            fontFamily="var(--font-sans), sans-serif"
            fontWeight="500"
          >
            {BRAND.name}
          </text>
          <line
            x1="116"
            y1="282"
            x2="204"
            y2="282"
            stroke={hexToRgba("#46362D", 0.2)}
            strokeWidth="1"
          />
          <text
            x="160"
            y="304"
            textAnchor="middle"
            fontSize="15"
            fill="#46362D"
            fontFamily="var(--font-display), serif"
          >
            {labelText}
          </text>
          {sublabel && (
            <text
              x="160"
              y="321"
              textAnchor="middle"
              fontSize="8.5"
              letterSpacing="2"
              fill={hexToRgba("#46362D", 0.5)}
              fontFamily="var(--font-sans), sans-serif"
            >
              {sublabel.toUpperCase()}
            </text>
          )}
        </g>
      </g>
    </svg>
  );
}
