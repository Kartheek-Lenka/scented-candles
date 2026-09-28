"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import type { MoodId } from "@/data/moods";
import { moods } from "@/data/moods";
import { getProductByMood, DEFAULT_SIZE } from "@/data/products";
import { CandleArt } from "@/components/product/CandleArt";
import { useProductModal } from "@/components/product/ProductModalProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";
import { createRestockLink, createWhatsAppOrderLink, track } from "@/lib/whatsapp";
import { hexToRgba } from "@/lib/color";
import { formatPrice } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MoodSelector() {
  const [activeMood, setActiveMood] = useState<MoodId | null>(null);
  const reduceMotion = useReducedMotion();
  const { openProduct } = useProductModal();

  const mood = moods.find((m) => m.id === activeMood) ?? null;
  const product = activeMood ? getProductByMood(activeMood) : undefined;
  const soldOut = product?.availability === "sold-out";

  return (
    <section
      id="moods"
      className="grain relative scroll-mt-24 overflow-hidden bg-espresso py-20 text-cream sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-70"
        style={{
          background:
            "radial-gradient(90% 60% at 20% 0%, rgba(200,120,92,0.22), transparent 60%), radial-gradient(70% 50% at 90% 100%, rgba(170,178,158,0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            tone="dark"
            eyebrow="Mood selector"
            title="What mood are you in?"
            intro="Pick one. We'll tell you which candle to light tonight."
          />

          <div
            role="group"
            aria-label="Choose a mood"
            className="flex flex-wrap gap-2.5"
          >
            {moods.map((item) => {
              const isActive = item.id === activeMood;
              return (
                <m.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveMood(item.id);
                    track("mood_selected", { mood: item.id });
                  }}
                  aria-pressed={isActive}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  className={[
                    "min-h-12 rounded-full border px-5 text-xs tracking-[0.16em] uppercase transition-colors duration-300",
                    isActive
                      ? "border-cream bg-cream text-ink-900"
                      : "border-cream/25 text-cream/70 hover:border-cream/60 hover:text-cream",
                  ].join(" ")}
                >
                  {item.label}
                </m.button>
              );
            })}
          </div>
        </div>

        {/* Stage */}
        <div className="relative">
          <div
            className="relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.04] p-8 sm:min-h-[28rem]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {product && mood ? (
                <m.div
                  key={product.id}
                  className="flex w-full flex-col items-center gap-6 text-center"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 22, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="relative h-52 w-full sm:h-60">
                    {/* Scent's ingredient photography, softly lit behind the vessel */}
                    {product.image && (
                      <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="scale-110 object-cover opacity-45 blur-[3px]"
                        />
                        <span
                          className="absolute inset-0"
                          style={{ backgroundColor: hexToRgba(product.accentColor, 0.35) }}
                        />
                        <span className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_40%,transparent_20%,rgba(70,54,45,0.75)_95%)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-auto">
                        <CandleArt
                          accentColor={product.accentColor}
                          label={product.name}
                          sublabel={product.moodLabel}
                          lit
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="eyebrow text-cream/75">
                      Your candle tonight
                    </p>
                    <h3 className="display-md text-cream">{product.name}</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-cream/75">
                      {mood.line}
                    </p>
                    <p className="text-sm text-cream/70">
                      {product.notes.join(" · ")} —{" "}
                      <span className="text-cream/75">
                        from {formatPrice(product.price)}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="btn btn-light group"
                    >
                      See the notes
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <a
                      href={
                        soldOut
                          ? createRestockLink(product)
                          : createWhatsAppOrderLink(product, DEFAULT_SIZE)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("whatsapp_clicked", {
                          product: product.id,
                          source: "mood_selector",
                          intent: soldOut ? "restock" : "order",
                        })
                      }
                      className="btn btn-outline-light"
                    >
                      {soldOut
                        ? `Ask about ${product.name}`
                        : `Order ${product.name}`}
                    </a>
                  </div>

                  {soldOut && (
                    <p className="text-xs text-cream/75">
                      Currently sold out — ask us and we&apos;ll tell you when
                      it&apos;s back.
                    </p>
                  )}
                </m.div>
              ) : (
                <m.p
                  key="empty"
                  className="max-w-[22ch] text-center font-display text-2xl leading-snug text-cream/70 sm:text-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Six moods. One candle fits each.
                </m.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
