import Image from "next/image";

import { giftOptions } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { createGiftLink } from "@/lib/whatsapp";

export function Gifting() {
  return (
    <section
      id="gifting"
      className="grain relative scroll-mt-24 overflow-hidden bg-espresso py-20 text-cream sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 50% at 15% 0%, rgba(214,160,160,0.2), transparent 60%), radial-gradient(60% 60% at 95% 100%, rgba(200,120,92,0.22), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-cream/10">
              <Image
                src="/images/gifting/gift-boxes.jpg"
                alt="Elegant candle gift boxes, ready to hand over"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <span
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(36,27,22,0.6),transparent_55%)]"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Gifting"
              title="Small gift. Big mood."
              intro="Birthdays, housewarmings, thank-yous. Tell us the occasion and we'll build it."
            />
            <Reveal delay={0.1}>
              <TrackedLink
                href={createGiftLink()}
                external
                event="gift_clicked"
                eventProps={{ source: "gifting_header" }}
                className="btn btn-light group shrink-0"
              >
                Build a gift
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </TrackedLink>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:mt-16 lg:grid-cols-3">
          {giftOptions.map((gift, i) => (
            <Reveal
              as="li"
              key={gift.id}
              delay={i * 0.08}
              className="group flex flex-col gap-5 bg-espresso p-7 transition-colors duration-500 hover:bg-[#523f34] sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl text-cream">{gift.name}</h3>
                <span className="text-sm text-cream/70">{gift.price}</span>
              </div>
              <p className="eyebrow text-cream/70">{gift.detail}</p>
              <p className="text-sm leading-relaxed text-cream/75">
                {gift.note}
              </p>
              <TrackedLink
                href={createGiftLink(gift.name)}
                external
                event="gift_clicked"
                eventProps={{ source: "gifting_card", set: gift.id }}
                className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm text-cream/85 transition-colors hover:text-cream"
              >
                Ask about {gift.name.replace("The ", "")}
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </TrackedLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
