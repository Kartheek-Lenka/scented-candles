"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import type { Product, ProductSize } from "@/data/products";
import { useProductModal } from "@/components/product/ProductModalProvider";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ZoomableMedia } from "@/components/product/ZoomableMedia";
import { Arrow } from "@/components/ui/Arrow";
import { createRestockLink, createWhatsAppOrderLink, track } from "@/lib/whatsapp";
import { cn, formatPrice } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const DEFAULT_GRAMS = 100;

export function ProductModal() {
  const { activeProduct, closeProduct } = useProductModal();

  return (
    <AnimatePresence>
      {activeProduct && (
        <ProductModalPanel product={activeProduct} onClose={closeProduct} />
      )}
    </AnimatePresence>
  );
}

function ProductModalPanel({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [selectedGrams, setSelectedGrams] = useState<number>(DEFAULT_GRAMS);

  const soldOut = product.availability === "sold-out";
  const selected: ProductSize =
    product.sizes.find((s) => s.grams === selectedGrams) ??
    (product.sizes[0] as ProductSize);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    triggerRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    track("product_view", { product: product.id, source: "modal_open" });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      window.clearTimeout(focusTimer);
      triggerRef.current?.focus?.();
    };
  }, [product, onClose]);

  const href = soldOut
    ? createRestockLink(product)
    : createWhatsAppOrderLink(product, selected);

  return (
    <div className="fixed inset-0 z-[90]">
      <m.div
        className="absolute inset-0 bg-ink-900/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.28 }}
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-end justify-center sm:items-center sm:p-6 lg:p-10">
        <m.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }}
          transition={
            reduceMotion
              ? { duration: 0.1 }
              : { type: "spring", stiffness: 240, damping: 30 }
          }
          className={cn(
            "grain relative flex max-h-[94svh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl bg-cream sm:max-h-[90svh] sm:rounded-3xl",
            "shadow-[0_-8px_80px_-20px_rgba(23,22,20,0.5)] sm:shadow-[0_40px_120px_-30px_rgba(23,22,20,0.55)]",
          )}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-30 flex size-11 items-center justify-center rounded-full bg-cream/85 text-ink-800 backdrop-blur-md transition hover:bg-cream sm:right-5 sm:top-5"
            aria-label="Close product details"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] overflow-y-auto overscroll-contain lg:grid-cols-[1.05fr_1fr] lg:grid-rows-1 lg:overflow-hidden">
            {/* Visual */}
            <div
              className="relative h-[38svh] shrink-0 sm:h-[46svh] lg:h-full"
              style={{ backgroundColor: `${product.accentColor}14` }}
            >
              <ZoomableMedia label={`${product.name} candle`}>
                <ProductVisual
                  product={product}
                  sizeGrams={selected.grams}
                  ratio="square"
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="size-full"
                />
              </ZoomableMedia>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-7 px-5 pb-8 pt-1 sm:px-8 sm:pb-10 lg:overflow-y-auto lg:px-12 lg:py-12">
              {/* Plain div, not <header>: this sits inside a dialog, and a
                  nested banner landmark would be announced oddly. */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: product.accentColor }}
                    aria-hidden="true"
                  />
                  <span className="eyebrow text-stone-400">{product.moodLabel}</span>
                </div>
                <h2 id="product-modal-title" className="display-md text-balance">
                  {product.name}
                </h2>
                <p className="max-w-prose text-base leading-relaxed text-stone-500">
                  {product.shortDescription}
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                {product.notes.map((note) => (
                  <li
                    key={note}
                    className="rounded-full border hairline px-3 py-1.5 text-xs tracking-wide text-stone-500"
                  >
                    {note}
                  </li>
                ))}
              </ul>

              <p className="max-w-prose text-sm leading-relaxed text-stone-500">
                {product.description}
              </p>

              <section aria-label={`${product.name} fragrance pyramid`}>
                <h3 className="eyebrow mb-4 text-stone-400">How it smells</h3>
                <ol className="grid gap-2.5">
                  {(
                    [
                      ["Top", product.pyramid.top],
                      ["Heart", product.pyramid.heart],
                      ["Base", product.pyramid.base],
                    ] as const
                  ).map(([tier, note], index) => (
                    <li
                      key={tier}
                      className="flex items-center gap-4 border-t hairline pt-2.5"
                    >
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: product.accentColor,
                          opacity: 1 - index * 0.28,
                        }}
                        aria-hidden="true"
                      />
                      <span className="eyebrow w-14 shrink-0 text-stone-400">
                        {tier}
                      </span>
                      <span className="text-sm text-ink-800">{note}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-label={`${product.name} best suited to`}>
                <h3 className="eyebrow mb-4 text-stone-400">Best for</h3>
                <ul className="flex flex-wrap gap-2">
                  {product.bestFor.map((use) => (
                    <li
                      key={use}
                      className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-600"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </section>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-y hairline py-5 text-sm sm:grid-cols-3">
                <div>
                  <dt className="eyebrow mb-1.5 text-stone-400">Wax</dt>
                  <dd className="text-ink-800">{product.waxType}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5 text-stone-400">Wick</dt>
                  <dd className="text-ink-800">{product.wick}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-1.5 text-stone-400">Burn time</dt>
                  <dd className="text-ink-800">{product.burnTime}</dd>
                </div>
              </dl>

              <section aria-label="Choose a size">
                <h3 className="eyebrow mb-4 text-stone-400">Available sizes</h3>
                <div
                  role="radiogroup"
                  aria-label={`${product.name} size`}
                  className="grid gap-2 sm:grid-cols-3"
                >
                  {product.sizes.map((size) => {
                    const active = size.grams === selected.grams;
                    return (
                      <button
                        key={size.grams}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        disabled={soldOut}
                        onClick={() => {
                          setSelectedGrams(size.grams);
                          track("product_view", {
                            product: product.id,
                            size: size.grams,
                            source: "modal_size",
                          });
                        }}
                        className={cn(
                          "flex min-h-[4.5rem] flex-col items-start justify-center gap-1 rounded-xl border px-4 py-3 text-left transition",
                          active
                            ? "border-ink-900 bg-ink-900 text-cream"
                            : "hairline hover:border-stone-300",
                          soldOut && "cursor-not-allowed opacity-45",
                        )}
                      >
                        <span className="text-sm font-medium">
                          {size.grams}g · {size.label}
                        </span>
                        <span
                          className={cn(
                            "text-xs",
                            active ? "text-cream/70" : "text-stone-400",
                          )}
                        >
                          {formatPrice(size.price)} · {size.burnTime}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="mt-auto flex flex-col gap-3 pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl text-ink-900">
                    {formatPrice(selected.price)}
                  </span>
                  <span className="text-sm text-stone-400">
                    {selected.grams}g · {selected.label}
                  </span>
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("whatsapp_clicked", {
                      product: product.id,
                      size: selected.grams,
                      source: soldOut ? "modal_restock" : "modal",
                    })
                  }
                  className="btn btn-primary w-full"
                >
                  {soldOut ? "Ask us on WhatsApp" : "Order on WhatsApp"}
                  <Arrow />
                </a>
                {soldOut && (
                  <p className="text-center text-xs text-stone-400">
                    Currently sold out — we usually restock within a week.
                  </p>
                )}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}
