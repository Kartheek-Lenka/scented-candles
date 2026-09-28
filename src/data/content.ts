/**
 * Static marketing content. Kept out of components so copy can be edited
 * without touching layout or logic.
 */

export const valueProps = [
  {
    id: "small-batch",
    label: "Small batch",
    body: "Made in small batches so every candle gets attention.",
  },
  {
    id: "good-scents",
    label: "Good scents",
    body: "Fragrances chosen to make your room feel different.",
  },
  {
    id: "no-overthinking",
    label: "No overthinking",
    body: "Beautiful candles without the luxury-brand price tag.",
  },
  {
    id: "made-for-gifting",
    label: "Made for gifting",
    body: "Easy to gift. Even easier to keep.",
  },
] as const;

export const howItWorks = [
  { id: "pick", step: "01", title: "Pick your scent", body: "Match the mood, or let the scent finder choose for you." },
  { id: "message", step: "02", title: "Message us", body: "One tap on WhatsApp. The order is already written out for you." },
  { id: "deliver", step: "03", title: "We deliver", body: "Poured, wrapped and dropped at your door across Bengaluru." },
] as const;

/** Gifting options. `messageKey` maps to the WhatsApp message in whatsapp.ts. */
export const giftOptions = [
  {
    id: "mini",
    name: "The Mini",
    detail: "One 50g candle",
    price: "₹79",
    note: "Small enough to fit in a bag. Big enough to mean something.",
  },
  {
    id: "trio",
    name: "The Trio",
    detail: "Three 50g candles",
    price: "₹219",
    note: "Three moods, one box. Our most-gifted set.",
  },
  {
    id: "gift",
    name: "The Gift",
    detail: "One 150g candle",
    price: "₹199",
    note: "Wrapped, with a handwritten note. Ready to hand over.",
  },
] as const;

export const socialTiles = [
  {
    id: "t1",
    caption: "Wick trimmed. Music on.",
    tone: "terracotta" as const,
    image: "/images/hero/hero-candle.jpg",
    imageAlt: "A lit candle resting on a stack of books",
  },
  {
    id: "t2",
    caption: "Rain, balcony, Jasmine.",
    tone: "sage" as const,
    image: "/images/products/jasmine.jpg",
    imageAlt: "White jasmine flowers in bloom",
  },
  {
    id: "t3",
    caption: "Poured this morning.",
    tone: "taupe" as const,
    image: "/images/products/vanilla.jpg",
    imageAlt: "Vanilla pods on a pale surface",
  },
  {
    id: "t4",
    caption: "Three, in a row.",
    tone: "rose" as const,
    image: "/images/products/rose.jpg",
    imageAlt: "Pink roses resting on beige textile",
  },
  {
    id: "t5",
    caption: "4pm reset.",
    tone: "espresso" as const,
    image: "/images/lifestyle/flame.jpg",
    imageAlt: "A single candle flame burning in low light",
  },
  {
    id: "t6",
    caption: "Reading corner.",
    tone: "charcoal" as const,
    image: "/images/products/strawberry.jpg",
    imageAlt: "Fresh strawberries on a pink surface",
  },
] as const;

export const galleryTiles = [
  {
    id: "g1",
    caption: "A quiet corner",
    tone: "espresso" as const,
    image: "/images/hero/hero-candle.jpg",
    imageAlt: "A candle-lit corner in the evening",
  },
  {
    id: "g2",
    caption: "Rain on the balcony",
    tone: "sage" as const,
    image: "/images/lifestyle/bengaluru-rain.jpg",
    imageAlt: "A wet walkway lined with tropical plants after rain",
  },
  {
    id: "g3",
    caption: "First pour",
    tone: "taupe" as const,
    image: "/images/products/vanilla.jpg",
    imageAlt: "Vanilla pods arranged on a light surface",
  },
  {
    id: "g4",
    caption: "Lit at last",
    tone: "terracotta" as const,
    image: "/images/hero/hero-candle.jpg",
    imageAlt: "A lit candle on a stack of books",
  },
  {
    id: "g5",
    caption: "Paper, grain, warmth",
    tone: "rose" as const,
    image: "/images/gifting/gift-boxes.jpg",
    imageAlt: "Elegant candle gift boxes",
  },
  {
    id: "g6",
    caption: "Made here",
    tone: "charcoal" as const,
    image: "/images/products/lemongrass.jpg",
    imageAlt: "Lemongrass growing in daylight",
  },
] as const;

export type Tone = (typeof socialTiles)[number]["tone"];
