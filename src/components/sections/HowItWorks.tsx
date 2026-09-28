import { howItWorks } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative scroll-mt-24 border-y hairline bg-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="How it works"
          title="No checkout. No account. No fuss."
          intro="Three steps and a candle is on its way."
        />

        <ol className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
          {howItWorks.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.1}
              className="flex flex-col gap-4 border-t hairline pt-6"
            >
              <span className="font-display text-5xl leading-none text-stone-350 transition-colors duration-500 hover:text-espresso sm:text-6xl">
                {item.step}
              </span>
              <h3 className="font-display text-2xl text-ink-900">{item.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-stone-500">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
