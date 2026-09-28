import Image from "next/image";

import { BRAND } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BengaluruNight } from "@/components/sections/BengaluruNight";

export function BangaloreStory() {
  return (
    <section id="story" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        {/* Scene: real photograph of a wet walkway, with the illustrated
            evening layered over it for warmth */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink-800 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/lifestyle/bengaluru-rain.jpg"
              alt="A wet walkway lined with tropical plants after the rain"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <span
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(36,27,22,0.78),rgba(36,27,22,0.12)_60%)]"
              aria-hidden="true"
            />
            <BengaluruNight className="absolute inset-0 size-full opacity-70" />
            <p className="pointer-events-none absolute bottom-4 left-5 rounded-full bg-ink-900/80 px-3 py-1.5 text-[0.6875rem] tracking-[0.18em] text-cream/90 uppercase backdrop-blur-sm">
              {BRAND.city} · 8:42pm
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading eyebrow="Our story" title="Made for Bengaluru evenings." />

          <Reveal delay={0.08}>
            <blockquote className="flex flex-col gap-1 border-l-2 border-espresso/25 pl-6 font-display text-[clamp(1.6rem,4vw,2.35rem)] leading-[1.22] text-ink-900">
              <span>Rain outside.</span>
              <span>Music playing.</span>
              <span>Lights low.</span>
              <span className="italic text-espresso">One candle on.</span>
            </blockquote>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="max-w-prose text-base leading-relaxed text-stone-500">
              {BRAND.name} started in a {BRAND.city} apartment with a borrowed
              pouring pot and a lot of failed vanilla batches. We kept the ones
              that made the room feel different, and we made those properly.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-prose font-display text-2xl leading-snug text-ink-900">
              Born in {BRAND.city}, made for wherever you call home.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
