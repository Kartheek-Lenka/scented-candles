"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import type { FinderAnswers } from "@/data/moods";
import { buildMatchReason, finderSteps, recommendProduct } from "@/data/moods";
import { CandleArt } from "@/components/product/CandleArt";
import { useProductModal } from "@/components/product/ProductModalProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";
import { createRestockLink, createWhatsAppOrderLink, track } from "@/lib/whatsapp";
import { DEFAULT_SIZE_GRAMS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ScentFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>(
    finderSteps.map(() => null),
  );
  const reduceMotion = useReducedMotion();
  const { openProduct } = useProductModal();

  const done = step >= finderSteps.length;
  const match = done ? recommendProduct(answers) : null;
  const reason = done ? buildMatchReason(answers) : "";
  const current = finderSteps[step];

  const answer = (optionId: string) => {
    const next = answers.map((a, i) => (i === step ? (optionId as never) : a));
    setAnswers(next);
    setStep((s) => s + 1);
    if (step + 1 >= finderSteps.length) {
      const finalAnswers = answers.map((a, i) =>
        i === step ? (optionId as never) : a,
      );
      track("scent_finder_completed", {
        result: recommendProduct(finalAnswers).id,
      });
    }
  };

  const reset = () => {
    setAnswers(finderSteps.map(() => null));
    setStep(0);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const matchSize =
    match?.sizes.find((s) => s.grams === DEFAULT_SIZE_GRAMS) ?? match?.sizes[0];
  const matchSoldOut = match?.availability === "sold-out";

  return (
    <section
      id="scents"
      className="relative scroll-mt-24 border-y hairline bg-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Scent discovery"
          title="Don’t know what you like yet?"
          intro="Tell us the vibe. We’ll pick the scent."
        />

        <div className="mt-12 overflow-hidden rounded-3xl border hairline bg-sand-50 sm:mt-16">
          {/* Progress */}
          <div className="flex items-center justify-between gap-4 border-b hairline px-5 py-4 sm:px-8">
            <ol className="flex items-center gap-2.5" aria-label="Progress">
              {[0, 1, 2].map((i) => {
                const state = done ? "done" : i < step ? "done" : i === step ? "current" : "todo";
                return (
                  <li key={i} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full text-[0.625rem] transition-colors duration-300",
                        state === "done" && "bg-ink-900 text-cream",
                        state === "current" && "bg-ink-900/10 text-ink-900",
                        state === "todo" && "bg-stone-100 text-stone-400",
                      )}
                      aria-current={state === "current" ? "step" : undefined}
                    >
                      {state === "done" ? (
                        <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden="true">
                          <path
                            d="m5 12.5 4.5 4.5L19 7"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    {i < 2 && (
                      <span className="h-px w-6 bg-stone-200 sm:w-10" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>

            <p className="eyebrow text-stone-400" aria-live="polite">
              {done ? "Your match" : `Step ${step + 1} of ${finderSteps.length}`}
            </p>
          </div>

          {/* Body */}
          <div className="relative min-h-[22rem] p-5 sm:min-h-[26rem] sm:p-10 lg:p-14">
            <AnimatePresence mode="wait" initial={false}>
              {!done && current ? (
                <m.div
                  key={`step-${step}`}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h3 className="display-md max-w-[18ch] text-ink-900">
                    {current.question}
                  </h3>

                  <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {current.options.map((option) => (
                      <m.button
                        key={option.id}
                        type="button"
                        onClick={() => answer(option.id)}
                        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                        className="group flex min-h-16 items-center justify-between gap-3 rounded-2xl border hairline bg-cream px-5 py-4 text-left transition-colors duration-300 hover:border-ink-900 focus-visible:border-ink-900"
                      >
                        <span className="text-base text-ink-800">{option.label}</span>
                        <Arrow className="shrink-0 text-stone-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink-900" />
                      </m.button>
                    ))}
                  </div>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-stone-400 transition-colors hover:text-ink-900"
                    >
                      <Arrow className="rotate-180" />
                      Back
                    </button>
                  )}
                </m.div>
              ) : match && matchSize ? (
                <m.div
                  key="result"
                  className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <div className="mx-auto h-64 w-auto sm:h-72">
                    <CandleArt
                      accentColor={match.accentColor}
                      label={match.name}
                      sublabel={match.moodLabel}
                      lit
                    />
                  </div>

                  <div className="flex flex-col gap-5 text-center lg:text-left">
                    <p className="eyebrow text-stone-400">Your match</p>
                    <h3 className="display-md text-ink-900">{match.name}</h3>
                    <p className="max-w-prose text-base leading-relaxed text-stone-500 lg:mx-0">
                      {reason}
                    </p>
                    <p className="text-sm text-stone-400">
                      {match.notes.join(" · ")}
                    </p>

                    <div className="flex flex-col items-stretch gap-3 sm:flex-row lg:justify-start">
                      <a
                        href={
                          matchSoldOut
                            ? createRestockLink(match)
                            : createWhatsAppOrderLink(match, matchSize)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("whatsapp_clicked", {
                            product: match.id,
                            source: "scent_finder",
                            intent: matchSoldOut ? "restock" : "order",
                          })
                        }
                        className="btn btn-primary group"
                      >
                        {matchSoldOut ? `Ask about ${match.name}` : "Order my candle"}
                        <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                      <button
                        type="button"
                        onClick={() => openProduct(match)}
                        className="btn btn-ghost"
                      >
                        Smell this
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex min-h-12 items-center justify-center px-2 text-sm text-stone-400 underline-offset-4 transition-colors hover:text-ink-900 hover:underline"
                      >
                        Start over
                      </button>
                    </div>

                    <p className="text-sm text-stone-400">
                      {matchSize.label} · {matchSize.grams}g ·{" "}
                      {formatPrice(matchSize.price)}
                    </p>

                    {matchSoldOut && (
                      <p className="text-sm text-stone-500">
                        Currently sold out — the link above asks us to tell you
                        when it&apos;s back.
                      </p>
                    )}
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
