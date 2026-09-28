"use client";

import { m, useReducedMotion } from "motion/react";

import type { Product } from "@/data/products";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useProductModal } from "@/components/product/ProductModalProvider";
import { Arrow } from "@/components/ui/Arrow";
import { createRestockLink, createWhatsAppOrderLink, track } from "@/lib/whatsapp";
import { DEFAULT_SIZE_GRAMS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  index = 0,
}: {
  product: Product;
  className?: string;
  index?: number;
}) {
  const { openProduct } = useProductModal();
  const reduceMotion = useReducedMotion();
  const soldOut = product.availability === "sold-out";
  const size = product.sizes.find((s) => s.grams === DEFAULT_SIZE_GRAMS) ?? product.sizes[0];

  const orderHref = soldOut
    ? createRestockLink(product)
    : createWhatsAppOrderLink(product, size);

  return (
    <m.article
      className={cn("group/card relative flex flex-col", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.65,
        delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.28),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onClick={() => openProduct(product)}
        className="block w-full text-left"
        aria-label={`View ${product.name} details`}
      >
        <span
          className={cn(
            "relative block overflow-hidden rounded-2xl transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover/card:-translate-y-1 group-hover/card:shadow-[0_28px_60px_-32px_rgba(23,22,20,0.55)]",
            "group-focus-within/card:-translate-y-1",
          )}
          style={{ backgroundColor: `${product.accentColor}12` }}
        >
          <ProductVisual
            product={product}
            ratio="portrait"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw"
            className="[&_svg]:transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:[&_svg]:scale-[1.035] group-focus-within/card:[&_svg]:scale-[1.035]"
          />

          {/* Accent wash that lifts on hover */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            style={{
              background: `radial-gradient(120% 80% at 50% 100%, ${product.accentColor}2E, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {soldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1.5 text-[0.6875rem] tracking-wide text-ink-800 backdrop-blur-sm">
              Currently sold out
            </span>
          )}

          <span
            className="pointer-events-none absolute bottom-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-cream/90 text-[0.625rem] tracking-[0.14em] text-ink-800 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100"
            aria-hidden="true"
          >
            VIEW
          </span>
        </span>

        <span className="mt-5 flex flex-col gap-2">
          <span className="flex items-center gap-2.5">
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: product.accentColor }}
              aria-hidden="true"
            />
            <span className="eyebrow text-stone-400">{product.moodLabel}</span>
          </span>

          <span className="font-display text-[1.75rem] leading-tight text-ink-900">
            {product.name}
          </span>

          {/* Notes stay visible rather than hover-revealed: they are real
              product information, and hiding them behind a pointer hides them
              from keyboard and screen-reader users too. */}
          <span className="flex h-5 items-center text-sm text-stone-500">
            {product.notes.join(" · ")}
          </span>

          <span className="mt-1 flex items-baseline gap-1.5 text-sm text-stone-400">
            <span className="text-base font-medium text-ink-800">
              {formatPrice(product.price)}
            </span>
            <span>· 50g onwards</span>
          </span>
        </span>
      </button>

      <a
        href={orderHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("whatsapp_clicked", {
            product: product.id,
            size: size.grams,
            source: "card",
          })
        }
        className="mt-4 inline-flex min-h-11 items-center gap-2 self-start border-b border-transparent text-sm text-ink-800 transition-colors hover:border-ink-800 focus-visible:border-ink-800"
      >
        {soldOut ? "Ask us about this" : "Order on WhatsApp"}
        <Arrow className="group-hover/card:translate-x-1" />
      </a>
    </m.article>
  );
}
