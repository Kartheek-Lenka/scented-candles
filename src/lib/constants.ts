/**
 * Global brand + business configuration.
 *
 * Every value the business can change lives here (or in environment
 * variables) so the temporary brand name can be swapped globally without
 * touching a single component. No component should hardcode "SCENT LAB".
 */

/**
 * Reads an env var, treating blank/whitespace-only values as absent.
 *
 * `??` is not enough here: a variable declared in a hosting dashboard can
 * exist but be empty, and `"" ?? fallback` yields `""`. That reached
 * `new URL("")` in layout metadata and failed the whole production build.
 */
function env(name: string, fallback: string): string {
  const v = process.env[name];
  return v !== undefined && v.trim() !== "" ? v.trim() : fallback;
}

const rawNumber = env("NEXT_PUBLIC_WHATSAPP_NUMBER", "917569067363");

/** Strips formatting so wa.me always receives digits only. */
export const WHATSAPP_NUMBER = rawNumber.replace(/\D/g, "");

/** Pretty-printed form of the same number, derived so the two cannot drift. */
const WHATSAPP_DISPLAY = (() => {
  const national = WHATSAPP_NUMBER.length === 12 && WHATSAPP_NUMBER.startsWith("91")
    ? WHATSAPP_NUMBER.slice(2)
    : WHATSAPP_NUMBER;
  return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
})();

const rawUrl = env("NEXT_PUBLIC_SITE_URL", "https://scentlab.in");

export const SITE_URL = rawUrl.replace(/\/$/, "");

export const BRAND = {
  /** Short wordmark. Swap this to rebrand globally. */
  name: env("NEXT_PUBLIC_BRAND_NAME", "SCENT LAB"),
  /** Optional descriptor shown under the wordmark. */
  descriptor: "CANDLE STUDIO",
  tagline: "Made for slow evenings.",
  city: env("NEXT_PUBLIC_CITY", "Bengaluru"),
  country: "India",
  founded: "2026",
  /** Used for the footer copyright line. */
  copyrightYear: 2026,
} as const;

export const CONTACT = {
  whatsappDisplay: WHATSAPP_DISPLAY,
  instagramHandle: "@scentlab",
  instagramUrl: "https://instagram.com/scentlab",
  email: "hello@scentlab.in",
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: CONTACT.instagramUrl, event: "instagram_clicked" as const },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    event: "whatsapp_clicked" as const,
  },
] as const;

/** Primary in-page navigation. Kept intentionally short. */
export const NAV_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Scents", href: "#scents" },
  { label: "Our Story", href: "#story" },
  { label: "Gifting", href: "#gifting" },
] as const;

export const FOOTER_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Scents", href: "#scents" },
  { label: "Gifting", href: "#gifting" },
  { label: "Our Story", href: "#story" },
] as const;

/** Canonical sizes + pricing for every fragrance. */
export const SIZE_TIERS = [
  { grams: 50, label: "Mini", price: 79, burnTime: "Up to 12 hours" },
  { grams: 100, label: "Everyday", price: 149, burnTime: "Up to 25 hours" },
  { grams: 150, label: "Gift", price: 199, burnTime: "Up to 40 hours" },
] as const;

export type SizeTier = (typeof SIZE_TIERS)[number];

/** The size used as the headline "Everyday" price on cards. */
export const DEFAULT_SIZE_GRAMS = 100;

export const WAX_DETAILS = {
  type: "Coconut–soy wax blend",
  wick: "Lead-free cotton wick",
  note: "Clean burn, no black smoke.",
} as const;

export const FAQS = [
  {
    q: "How long does one candle burn?",
    a: "The Mini (50g) burns around 12 hours, the Everyday (100g) about 25, and the Gift (150g) up to 40. First burn should reach the wax edge.",
  },
  {
    q: "What wax do you use?",
    a: "A coconut–soy blend with a lead-free cotton wick. It pours an even pool, burns clean and throws scent without smoke.",
  },
  {
    q: "How strong are the fragrances?",
    a: "Balanced by default. You'll notice them at 2–3 metres, never shouty. If you want something louder, message us and we'll point you there.",
  },
  {
    q: "Do you deliver in Bengaluru?",
    a: "Yes. Same-day delivery across the city for orders placed before 4pm, and we ship across India.",
  },
  {
    q: "Can I order gifts?",
    a: "Yes. Message us with the scents and quantity and we'll put together a set, wrap it and add a handwritten note.",
  },
  {
    q: "Can I customize an order?",
    a: "Scent combinations, labels and gift wrapping are all possible. Tell us the occasion and we'll suggest something that fits.",
  },
  {
    q: "Can I pick up locally?",
    a: "You can. Message us and we'll share the pickup point in Indiranagar. No minimum order.",
  },
] as const;
