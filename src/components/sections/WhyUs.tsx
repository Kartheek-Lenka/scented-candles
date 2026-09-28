import { valueProps } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const icons: Record<string, React.ReactNode> = {
  "small-batch": (
    <>
      <path d="M8 22h16M12 22V11l4-3 4 3v11" />
      <path d="M16 8V4M13.5 5.5 16 3l2.5 2.5" />
    </>
  ),
  "good-scents": (
    <>
      <path d="M16 6c3 2 3 6 0 8-3 2-3 6 0 8" />
      <path d="M10 9c2 1.4 2 4.6 0 6-2 1.4-2 4.6 0 6" />
      <circle cx="19" cy="17" r="1.4" />
    </>
  ),
  "no-overthinking": (
    <>
      <path d="M7 9h18l-2 13H9L7 9Z" />
      <path d="M7 9 9 4h14l2 5" />
      <path d="M14 14h4" />
    </>
  ),
  "made-for-gifting": (
    <>
      <path d="M5 14h22v11H5z" />
      <path d="M5 14 16 5l11 9" />
      <path d="M16 14v11" />
      <path d="M16 5c-3 0-5 1.5-5 3.2S13 11.4 16 11.4 21 9.9 21 8.2 19 5 16 5Z" />
    </>
  ),
};

export function WhyUs() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Why our candles"
          title="Made small. Made intentionally."
          intro="No factory runs, no mystery sourcing. Just four things we refuse to compromise on."
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border hairline bg-stone-200 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, i) => (
            <Reveal
              as="li"
              key={prop.id}
              delay={i * 0.06}
              className="group flex flex-col gap-5 bg-sand-50 p-7 transition-colors duration-500 hover:bg-cream sm:p-8"
            >
              <span
                className="flex size-12 items-center justify-center rounded-full border hairline text-espresso transition-transform duration-500 group-hover:-translate-y-1"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 32 32"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[prop.id]}
                </svg>
              </span>

              <h3 className="eyebrow text-ink-900">{prop.label}</h3>
              <p className="text-sm leading-relaxed text-stone-500">
                {prop.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
