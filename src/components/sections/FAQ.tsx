"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { FAQS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title="Before you light up."
            intro="Short answers. Anything else, just ask us on WhatsApp."
          />
        </div>

        <ul className="flex flex-col">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={item.q} delay={Math.min(i * 0.04, 0.2)} className="border-t hairline last:border-b">
                <h3>
                  <button
                    id={`faq-trigger-${i}`}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-xl text-ink-900 transition-colors duration-300 group-hover:text-espresso sm:text-2xl">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "relative flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                        isOpen
                          ? "rotate-45 border-ink-900 bg-ink-900 text-cream"
                          : "hairline text-ink-800",
                      )}
                      aria-hidden="true"
                    >
                      <span className="absolute h-px w-3 bg-current" />
                      <span className="absolute h-3 w-px bg-current" />
                    </span>
                  </button>
                </h3>

                {/* The panel element stays mounted while collapsed so that
                    aria-controls on the trigger always resolves. */}
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-trigger-${i}`}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        key="panel"
                        initial={reduceMotion ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-prose pb-6 pr-10 text-sm leading-relaxed text-stone-500 sm:text-base">
                          {item.a}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
