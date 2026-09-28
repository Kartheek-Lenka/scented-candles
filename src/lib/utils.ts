/** Tiny class-name joiner. Avoids pulling in clsx for one helper. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Formats an integer rupee amount: 149 -> "₹149" */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Stable slug generator for any label. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
