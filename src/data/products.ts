import { DEFAULT_SIZE_GRAMS, SIZE_TIERS, WAX_DETAILS } from "@/lib/constants";
import type { MoodId } from "@/data/moods";

export type Availability = "in-stock" | "sold-out";

export type ProductSize = {
  grams: number;
  label: string;
  price: number;
  burnTime: string;
};

export type FragrancePyramid = {
  top: string;
  heart: string;
  base: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  /** Fragrance family label, e.g. "Warm Gourmand". */
  fragrance: string;
  mood: MoodId;
  moodLabel: string;
  shortDescription: string;
  description: string;
  notes: string[];
  pyramid: FragrancePyramid;
  bestFor: string[];
  size: string;
  burnTime: string;
  /** Entry price — the "starting from" figure on cards. */
  price: number;
  /**
   * Ingredient photography for this scent. Rendered as an atmospheric
   * backdrop behind the branded candle artwork, not as a product shot:
   * these are raw-scent textures, so the vessel stays the hero.
   */
  image: string | null;
  /** Short alt text for the backdrop image. */
  imageAlt: string;
  accentColor: string;
  availability: Availability;
  featured: boolean;
  tags: string[];
  sizes: ProductSize[];
  waxType: string;
  wick: string;
};

const sizes: ProductSize[] = SIZE_TIERS.map((tier) => ({ ...tier }));

export const products: Product[] = [
  {
    id: "vanilla-cream",
    name: "Vanilla Cream",
    slug: "vanilla-cream",
    fragrance: "Warm gourmand",
    mood: "cozy",
    moodLabel: "Cozy",
    shortDescription: "Soft, warm and ridiculously cozy.",
    description:
      "The one you light without a reason and leave burning for hours. Vanilla pod and cream notes over a warm sugar base — soft, rounded and never too sweet. It makes a room feel lived in.",
    notes: ["Vanilla", "Cream", "Warm Sugar"],
    pyramid: { top: "Vanilla", heart: "Cream", base: "Warm Sugar" },
    bestFor: ["Slow evenings", "Bedroom", "Reading", "Date nights"],
    size: "50g · 100g · 150g",
    burnTime: "12–40 hours",
    price: 79,
    image: "/images/products/vanilla.jpg",
    imageAlt: "Vanilla pods on a pale surface",
    accentColor: "#C9AE86",
    availability: "in-stock",
    featured: true,
    tags: ["best seller", "cozy", "warm", "winter"],
    sizes: sizes.map((s) => ({ ...s })),
    waxType: WAX_DETAILS.type,
    wick: WAX_DETAILS.wick,
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    slug: "ocean-breeze",
    fragrance: "Clean aquatic",
    mood: "fresh",
    moodLabel: "Fresh",
    shortDescription: "Like opening the windows after the rain.",
    description:
      "Sea salt, wet stone and a clean musk underneath. This is the candle equivalent of a deep breath — it clears a room out without emptying it. Burn it in the morning and the whole day feels lighter.",
    notes: ["Sea Salt", "Fresh Air", "Clean Musk"],
    pyramid: { top: "Sea Salt", heart: "Fresh Air", base: "Clean Musk" },
    bestFor: ["Morning light", "Bathrooms", "Working from home", "After rain"],
    size: "50g · 100g · 150g",
    burnTime: "12–40 hours",
    price: 79,
    image: "/images/products/ocean.jpg",
    imageAlt: "Sea waves on a shoreline",
    accentColor: "#8FA9B4",
    availability: "in-stock",
    featured: true,
    tags: ["fresh", "clean", "morning", "best seller"],
    sizes: sizes.map((s) => ({ ...s })),
    waxType: WAX_DETAILS.type,
    wick: WAX_DETAILS.wick,
  },
  {
    id: "lemongrass",
    name: "Lemongrass",
    slug: "lemongrass",
    fragrance: "Citrus green",
    mood: "energized",
    moodLabel: "Fresh / Energizing",
    shortDescription: "Clean energy in candle form.",
    description:
      "Lemongrass and green notes lifted with a little citrus brightness. It sharpens a stuffy room in about two minutes. Good before you start the day, better when you need a reset at 4pm.",
    notes: ["Lemongrass", "Citrus", "Green Notes"],
    pyramid: { top: "Citrus", heart: "Lemongrass", base: "Green Notes" },
    bestFor: ["Early mornings", "Desk", "Kitchen", "Post-workout"],
    size: "50g · 100g · 150g",
    burnTime: "12–40 hours",
    price: 79,
    image: "/images/products/lemongrass.jpg",
    imageAlt: "Green lemongrass in daylight",
    accentColor: "#A8B584",
    availability: "in-stock",
    featured: true,
    tags: ["fresh", "energizing", "citrus", "morning"],
    sizes: sizes.map((s) => ({ ...s })),
    waxType: WAX_DETAILS.type,
    wick: WAX_DETAILS.wick,
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    slug: "rose-garden",
    fragrance: "Soft floral",
    mood: "romantic",
    moodLabel: "Romantic",
    shortDescription: "Soft, floral and unapologetically romantic.",
    description:
      "Rose and petals over a soft musk, so it reads fresh rather than heavy. It sits in the background of a room until someone walks closer. Save it for the nights that deserve a little effort.",
    notes: ["Rose", "Petals", "Soft Musk"],
    pyramid: { top: "Rose", heart: "Petals", base: "Soft Musk" },
    bestFor: ["Date nights", "Anniversaries", "Dinner parties", "Self-care nights"],
    size: "50g · 100g · 150g",
    burnTime: "12–40 hours",
    price: 79,
    image: "/images/products/rose.jpg",
    imageAlt: "Pink roses on beige textile",
    accentColor: "#D6A0A0",
    availability: "in-stock",
    featured: true,
    tags: ["romantic", "floral", "soft", "gifting"],
    sizes: sizes.map((s) => ({ ...s })),
    waxType: WAX_DETAILS.type,
    wick: WAX_DETAILS.wick,
  },
  {
    id: "strawberry",
    name: "Strawberry",
    slug: "strawberry",
    fragrance: "Fruity sweet",
    mood: "playful",
    moodLabel: "Playful",
    shortDescription: "Sweet, juicy and a little playful.",
    description:
      "Fresh strawberry and berry notes smoothed out with sweet cream so it never turns into a candy shop. The mood of a Saturday morning when nothing is planned yet.",
    notes: ["Strawberry", "Berry", "Sweet Cream"],
    pyramid: { top: "Strawberry", heart: "Berry", base: "Sweet Cream" },
    bestFor: ["Weekend mornings", "Bestie gifting", "Study sessions", "Movie nights"],
    size: "50g · 100g · 150g",
    burnTime: "12–40 hours",
    price: 79,
    image: "/images/products/strawberry.jpg",
    imageAlt: "Strawberries on a pink surface",
    accentColor: "#C8785C",
    availability: "in-stock",
    featured: true,
    tags: ["playful", "sweet", "giftable", "weekend"],
    sizes: sizes.map((s) => ({ ...s })),
    waxType: WAX_DETAILS.type,
    wick: WAX_DETAILS.wick,
  },
  {
    id: "jasmine",
    name: "Jasmine",
    slug: "jasmine",
    fragrance: "White floral",
    mood: "calm",
    moodLabel: "Calm",
    shortDescription: "Slow evenings. Soft lights. Jasmine.",
    description:
      "Jasmine and white flowers resting on a soft musk base. Not a perfume, a pause. Light it when the day is done and let the room do the rest of the work.",
    notes: ["Jasmine", "White Flowers", "Soft Musk"],
    pyramid: { top: "Jasmine", heart: "White Flowers", base: "Soft Musk" },
    bestFor: ["Wind-down rituals", "Bathing", "Late nights", "Reading nook"],
    size: "50g · 100g · 150g",
    burnTime: "12–40 hours",
    price: 79,
    image: "/images/products/jasmine.jpg",
    imageAlt: "White jasmine flowers",
    accentColor: "#AAB29E",
    availability: "sold-out",
    featured: true,
    tags: ["calm", "floral", "soft", "night"],
    sizes: sizes.map((s) => ({ ...s })),
    waxType: WAX_DETAILS.type,
    wick: WAX_DETAILS.wick,
  },
];

export const DEFAULT_SIZE = products[0].sizes.find(
  (s) => s.grams === DEFAULT_SIZE_GRAMS,
) as ProductSize;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductByMood(mood: MoodId): Product | undefined {
  return products.find((p) => p.mood === mood);
}

export function getSize(product: Product, grams: number): ProductSize {
  return (
    product.sizes.find((s) => s.grams === grams) ??
    (product.sizes[0] as ProductSize)
  );
}

/** Lowest price across all sizes — the "starting from" figure. */
export function getStartingPrice(product: Product): number {
  return Math.min(...product.sizes.map((s) => s.price));
}

export const startingPrice = Math.min(...products.map(getStartingPrice));
