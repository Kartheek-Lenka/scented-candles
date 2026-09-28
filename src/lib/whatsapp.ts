import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Product, ProductSize } from "@/data/products";

const WA_BASE = "https://wa.me";

export function buildWhatsAppLink(message: string): string {
  return `${WA_BASE}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Generic "say hello" link. */
export function createWhatsAppLink(): string {
  return buildWhatsAppLink(
    "Hi! I'd like to know more about your scented candles.",
  );
}

/** Pre-filled single-product order message. */
export function createWhatsAppOrderLink(
  product: Product,
  size: ProductSize,
): string {
  const message = [
    "Hi! I'd like to order:",
    "",
    `Product: ${product.name}`,
    `Size: ${size.grams}g (${size.label})`,
    `Price: ₹${size.price}`,
    "",
    "Please share the availability and delivery details.",
  ].join("\n");

  return buildWhatsAppLink(message);
}

/** Message for the gifting section — reusable for every gift CTA. */
export function createGiftLink(setName?: string): string {
  const message = setName
    ? `Hi! I'm interested in the ${setName}. Please share pricing and delivery details.`
    : "Hi! I'm interested in a candle gift set.";

  return buildWhatsAppLink(message);
}

/** Message for asking about a sold-out scent. */
export function createRestockLink(product: Product): string {
  return buildWhatsAppLink(
    `Hi! Is ${product.name} back in stock? I'd like to order one.`,
  );
}

export type WhatsAppIntent =
  | "order"
  | "restock"
  | "gift"
  | "general";

export interface TrackProps {
  [key: string]: string | number | boolean | undefined | null;
}

export type AnalyticsEvent =
  | "page_view"
  | "product_view"
  | "mood_selected"
  | "scent_finder_completed"
  | "whatsapp_clicked"
  | "instagram_clicked"
  | "gift_clicked";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Analytics abstraction. Nothing is loaded by default — events are only
 * forwarded when `NEXT_PUBLIC_ANALYTICS_ENABLED` is set, so the MVP never
 * ships a tracker it doesn't use.
 */
export function track(event: AnalyticsEvent, props: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") return;

  const payload = { event, ...props };

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
    window.gtag?.("event", event, props);
  } catch {
    // Analytics must never break the user journey.
  }
}
