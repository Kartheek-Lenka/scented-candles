"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

import { BRAND } from "@/lib/constants";
import { products } from "@/data/products";
import { startingPrice } from "@/data/products";
import { CandleArt } from "@/components/product/CandleArt";
import { useProductModal } from "@/components/product/ProductModalProvider";
import { Arrow } from "@/components/ui/Arrow";
import { createWhatsAppLink, track } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const hero = products[0];
  const { openProduct } = useProductModal();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const candleY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* --- Atmosphere ------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#FFF9F0_0%,#F6F1E8_45%,#EDE5D8_100%)]" />
        {/* Real photography, pushed far back and washed out so it reads as
            depth rather than as a competing subject */}
        <Image
          src="/images/hero/hero-candle.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-center opacity-[0.16] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[radial-gradient(105%_75%_at_58%_45%,rgba(251,247,240,0.72)_0%,rgba(251,247,240,0.9)_58%,#F6F1E8_100%)]" />
        <m.div
          className="absolute left-1/2 top-[42%] -z-10 size-[min(115vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
          style={{
            scale: reduceMotion ? 1 : glowScale,
            background: `radial-gradient(circle, ${hero.accentColor}3D 0%, transparent 62%)`,
          }}
        />
        <div className="absolute -left-24 top-1/3 size-[28rem] rounded-full bg-rose/12 blur-[90px]" />
        <div className="absolute -right-20 bottom-0 size-[26rem] rounded-full bg-sage/14 blur-[90px]" />
      </div>

      <div className="shell grid w-full flex-1 grid-rows-[auto_1fr_auto] items-center gap-5 pt-24 pb-8 sm:gap-6 sm:pt-32 sm:pb-10 lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-[auto_1fr] lg:items-center lg:gap-14 lg:pb-16">
        {/* --- Type ----------------------------------------------------- */}
        <m.div
          className="order-1 flex flex-col gap-5 lg:col-start-1 lg:row-start-1 lg:self-end lg:gap-7"
          style={{ y: reduceMotion ? 0 : textY }}
        >
          <m.p
            className="eyebrow flex items-center gap-3 text-stone-400"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: hero.accentColor }}
              aria-hidden="true"
            />
            Small batch · {BRAND.city}
          </m.p>

          <h1 className="display-xl">
            <span className="block overflow-hidden">
              <m.span
                className="block"
                initial={reduceMotion ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.12, ease: EASE }}
              >
                Light a
              </m.span>
            </span>
            <span className="block overflow-hidden">
              <m.span
                className="block italic text-espresso"
                initial={reduceMotion ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.24, ease: EASE }}
              >
                mood.
              </m.span>
            </span>
          </h1>
        </m.div>

        {/* --- Product -------------------------------------------------- */}
        <m.div
          className="order-2 relative flex min-h-0 items-center justify-center self-stretch lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-stretch"
          style={{ y: reduceMotion ? 0 : candleY }}
          data-cursor="VIEW"
        >
          <m.button
            type="button"
            onClick={() => {
              openProduct(hero);
              track("product_view", { product: hero.id, source: "hero" });
            }}
            aria-label={`View ${hero.name} details`}
            className="group/candle relative aspect-[3/4] h-full max-h-[38svh] w-auto max-w-full cursor-pointer rounded-2xl sm:max-h-[44svh] lg:max-h-[82svh] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-800"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
          >
            {/* Very slow float */}
            <m.div
              className="size-full"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <CandleArt
                accentColor={hero.accentColor}
                label={hero.name}
                sublabel={hero.moodLabel}
                lit
              />
            </m.div>

            {/* Soft contact shadow that breathes with the float */}
            <m.div
              className="pointer-events-none absolute inset-x-[18%] bottom-0 h-6 rounded-[50%] blur-xl"
              animate={reduceMotion ? undefined : { scaleX: [1, 0.94, 1], opacity: [0.32, 0.26, 0.32] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundColor: "#46362D" }}
              aria-hidden="true"
            />

            {/* Almost imperceptible smoke */}
            {!reduceMotion && (
              <div
                className="pointer-events-none absolute left-1/2 top-[6%] h-32 w-16 -translate-x-1/2"
                aria-hidden="true"
              >
                <m.span
                  className="absolute inset-0 rounded-[50%] bg-white/25 blur-xl"
                  animate={{ y: [10, -46, -80], opacity: [0.16, 0.1, 0], scale: [0.7, 1.25, 1.7] }}
                  transition={{ duration: 11, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
            )}

            {/* Fragrance notes drifting around the product */}
            {hero.notes.map((note, i) => (
              <m.span
                key={note}
                className="pointer-events-none absolute hidden rounded-full border hairline bg-cream/70 px-3.5 py-1.5 text-[0.6875rem] tracking-[0.14em] text-stone-500 uppercase backdrop-blur-sm sm:block"
                initial={{ opacity: 0, y: 8 }}
                animate={
                  reduceMotion
                    ? { opacity: 0.9 }
                    : {
                        opacity: [0.55, 0.95, 0.55],
                        y: [0, -7, 0],
                      }
                }
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : 1 + i * 0.14,
                  ease: EASE,
                  repeat: reduceMotion ? 0 : Infinity,
                  repeatDelay: 2.4 + i,
                }}
                style={
                  i === 0
                    ? { top: "18%", left: "-4%" }
                    : i === 1
                      ? { top: "52%", right: "-6%" }
                      : { bottom: "16%", left: "-2%" }
                }
              >
                {note}
              </m.span>
            ))}

            {/* Visible affordance — the custom cursor is desktop-only, so touch
                and keyboard users need a real on-canvas cue. */}
            <span
              className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-[0.625rem] tracking-[0.16em] text-ink-800 uppercase opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/candle:translate-y-0 group-hover/candle:opacity-100 group-focus-visible/candle:translate-y-0 group-focus-visible/candle:opacity-100"
              aria-hidden="true"
            >
              View {hero.name}
            </span>
          </m.button>
        </m.div>

        {/* --- Support -------------------------------------------------- */}
        <m.div
          className="order-3 flex flex-col gap-5 sm:gap-6 lg:col-start-1 lg:row-start-2 lg:self-start lg:gap-7"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: EASE }}
        >
          <p className="max-w-md text-base leading-relaxed text-stone-500 sm:text-lg">
            Small-batch scented candles made for slow evenings, good
            conversations and tiny moments that deserve better lighting.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#scents" className="btn btn-primary group" data-cursor="OPEN">
              Explore the scents
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "hero" })}
              className="btn btn-ghost"
            >
              Order on WhatsApp
            </a>
          </div>

          <p className="eyebrow text-stone-400">
            Six scents · From {formatPrice(startingPrice)} · Made in{" "}
            {BRAND.city}
          </p>
        </m.div>
      </div>
    </section>
  );
}
