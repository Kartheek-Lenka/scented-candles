"use client";

import { useState } from "react";

import type { Product } from "@/data/products";
import { useProductModal } from "@/components/product/ProductModalProvider";
import { Arrow } from "@/components/ui/Arrow";
import { createRestockLink, createWhatsAppOrderLink, track } from "@/lib/whatsapp";
import { DEFAULT_SIZE_GRAMS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Shared order block: optional size chooser, a details trigger and the
 * pre-filled WhatsApp action. Used by the collection, mood stage and finder.
 */
export function ProductOrderCtas({
  product,
  layout = "row",
  showSizes = true,
  className,
}: {
  product: Product;
  layout?: "row" | "stack";
  showSizes?: boolean;
  className?: string;
}) {
  const [grams, setGrams] = useState<number>(DEFAULT_SIZE_GRAMS);
  const { openProduct } = useProductModal();

  const soldOut = product.availability === "sold-out";
  const size =
    product.sizes.find((s) => s.grams === grams) ??
    (product.sizes[0] as Product["sizes"][number]);

  const href = soldOut
    ? createRestockLink(product)
    : createWhatsAppOrderLink(product, size);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {showSizes && !soldOut && (
        <div
          role="radiogroup"
          aria-label={`${product.name} size`}
          className="flex flex-wrap gap-2"
        >
          {product.sizes.map((option) => {
            const active = option.grams === size.grams;
            return (
              <button
                key={option.grams}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setGrams(option.grams)}
                className={cn(
                  "min-h-11 rounded-full border px-4 text-xs transition-colors duration-300",
                  active
                    ? "border-ink-900 bg-ink-900 text-cream"
                    : "hairline text-stone-500 hover:border-stone-300 hover:text-ink-900",
                )}
              >
                <span className="font-medium">{option.grams}g</span>
                <span className={cn("ml-1.5", active ? "text-cream/70" : "text-stone-400")}>
                  {formatPrice(option.price)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row sm:items-center",
          layout === "stack" && "sm:flex-col sm:items-stretch",
        )}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("whatsapp_clicked", {
              product: product.id,
              size: size.grams,
              source: "order_ctas",
            })
          }
          className="btn btn-primary group"
        >
          {soldOut ? "Ask us on WhatsApp" : "Order on WhatsApp"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        <button
          type="button"
          onClick={() => openProduct(product)}
          className="btn btn-ghost"
        >
          View details
        </button>
      </div>

      {soldOut && (
        <p className="-mt-2 text-xs text-stone-400">
          Currently sold out — message us and we&apos;ll tell you when it&apos;s back.
        </p>
      )}
    </div>
  );
}
