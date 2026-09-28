import { galleryTiles } from "@/data/content";
import { MomentTile } from "@/components/ui/MomentTile";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { BRAND, CONTACT } from "@/lib/constants";

export function InstagramGrid() {
  return (
    <section
      id="instagram"
      className="relative scroll-mt-24 border-y hairline bg-cream py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={CONTACT.instagramHandle}
            title="See what’s burning."
            intro="Wick trims, failed batches, first pours and the occasional 4pm reset."
          />
          <Reveal delay={0.1}>
            <TrackedLink
              href={CONTACT.instagramUrl}
              external
              event="instagram_clicked"
              eventProps={{ source: "instagram_grid" }}
              className="btn btn-primary group shrink-0"
            >
              Follow us on Instagram
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </TrackedLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {galleryTiles.map((tile, i) => (
            <Reveal as="li" key={tile.id} delay={i * 0.04}>
              <TrackedLink
                href={CONTACT.instagramUrl}
                external
                event="instagram_clicked"
                eventProps={{ source: "instagram_tile", tile: tile.id }}
                className="group block rounded-2xl"
                aria-label={`See ${BRAND.name} on Instagram — ${tile.caption}`}
              >
                <MomentTile
                  tone={tile.tone}
                  caption={tile.caption}
                  // the link already carries the accessible name, so the
                  // photo is decorative here
                  image={tile.image}
                  imageAlt=""
                  seed={i + 2}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                />
              </TrackedLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
