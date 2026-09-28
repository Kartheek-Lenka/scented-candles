import { socialTiles } from "@/data/content";
import { MomentTile } from "@/components/ui/MomentTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function SocialProof() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Community"
          title="Currently lighting up Bengaluru."
          intro="No fake five-star quotes here. Just the people already burning them."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {socialTiles.map((tile, i) => (
            <Reveal
              as="li"
              key={tile.id}
              delay={i * 0.05}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : undefined}
            >
              <MomentTile
                tone={tile.tone}
                caption={tile.caption}
                image={tile.image}
                imageAlt={tile.imageAlt}
                seed={i}
                priority={i < 2}
                className="size-full"
                sizes={
                  i === 0
                    ? "(min-width: 640px) 66vw, 100vw"
                    : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                }
              />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-prose text-sm leading-relaxed text-stone-400">
            Customer photos and reviews land here once they exist — we&apos;d
            rather show you an honest grid than an invented testimonial.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
