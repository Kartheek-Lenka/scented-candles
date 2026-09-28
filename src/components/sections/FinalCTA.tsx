import { BRAND } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-24 text-cream sm:py-32 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 110%, rgba(200,120,92,0.35), transparent 65%), radial-gradient(60% 50% at 15% -10%, rgba(214,160,160,0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* A single ember, centred beneath the type */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{ backgroundColor: "#C8785C", opacity: 0.22 }}
        aria-hidden="true"
      />

      <div className="shell relative flex flex-col items-center gap-10 text-center">
        <Reveal>
          <p className="eyebrow text-cream/70">
            {BRAND.city} · {BRAND.founded}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display-lg max-w-[14ch] text-cream text-balance">
            Your room called. It wants better lighting.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#scents" className="btn btn-light group">
              Explore the scents
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <TrackedLink
              href={createWhatsAppLink()}
              external
              event="whatsapp_clicked"
              eventProps={{ source: "final_cta" }}
              className="btn btn-outline-light"
            >
              Order on WhatsApp
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
