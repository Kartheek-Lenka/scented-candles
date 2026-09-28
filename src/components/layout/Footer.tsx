import { BRAND, CONTACT, FOOTER_LINKS } from "@/lib/constants";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="grain relative overflow-hidden bg-cream pt-20 pb-28 sm:pb-16 lg:pt-24"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <p className="font-display text-2xl leading-tight tracking-[0.14em] text-ink-900">
              {BRAND.name}
            </p>
            <p className="max-w-xs font-display text-xl leading-snug text-stone-500">
              {BRAND.tagline}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <TrackedLink
                href={CONTACT.instagramUrl}
                external
                event="instagram_clicked"
                eventProps={{ source: "footer" }}
                className="flex size-11 items-center justify-center rounded-full border hairline text-ink-800 transition-colors hover:bg-stone-100"
                aria-label={`${BRAND.name} on Instagram`}
              >
                <InstagramIcon />
              </TrackedLink>
              <TrackedLink
                href={createWhatsAppLink()}
                external
                event="whatsapp_clicked"
                eventProps={{ source: "footer" }}
                className="flex size-11 items-center justify-center rounded-full border hairline text-ink-800 transition-colors hover:bg-stone-100"
                aria-label={`Message ${BRAND.name} on WhatsApp`}
              >
                <WhatsAppIcon />
              </TrackedLink>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-5 text-stone-400">Explore</h2>
            <ul className="flex flex-col gap-3.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-stone-500 transition-colors hover:text-ink-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 text-stone-400">Say hello</h2>
            <ul className="flex flex-col gap-3.5 text-sm text-stone-500">
              <li>
                <TrackedLink
                  href={CONTACT.instagramUrl}
                  external
                  event="instagram_clicked"
                  eventProps={{ source: "footer_list" }}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-ink-900"
                >
                  {CONTACT.instagramHandle}
                </TrackedLink>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-ink-900"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-2 text-stone-400">
                {BRAND.city}, {BRAND.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-stone-400">
            © {year} {BRAND.name}
          </p>
          <p className="eyebrow text-stone-400">
            {BRAND.city}, {BRAND.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
