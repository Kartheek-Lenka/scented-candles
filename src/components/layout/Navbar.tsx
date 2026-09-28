"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { BRAND, CONTACT, NAV_LINKS } from "@/lib/constants";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Arrow } from "@/components/ui/Arrow";
import { createWhatsAppLink, track } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;

    // Move focus into the sheet, and keep it there: the panel is a dialog,
    // so Tab should cycle inside it rather than walking the page behind.
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b hairline bg-sand-50/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[4.5rem] items-center justify-between gap-6"
        >
          <a
            href="#top"
            className="flex min-h-11 items-center font-display text-xl leading-none tracking-[0.14em] text-ink-900"
            aria-label={`${BRAND.name} home`}
          >
            {BRAND.name}
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative inline-flex min-h-11 items-center text-sm text-stone-500 transition-colors hover:text-ink-900"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink-900 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram_clicked", { source: "navbar" })}
              className="hidden size-11 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-stone-100 sm:flex"
              aria-label={`${BRAND.name} on Instagram`}
            >
              <InstagramIcon />
            </a>
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "navbar" })}
              className="hidden size-11 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-stone-100 sm:flex"
              aria-label={`Message ${BRAND.name} on WhatsApp`}
            >
              <WhatsAppIcon />
            </a>

            <a href="#shop" className="btn btn-primary hidden lg:inline-flex">
              Shop Candles
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex size-11 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-stone-100 md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
            >
              <span className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 self-end bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[80] md:hidden">
            <m.div
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0.1 }
                  : { type: "spring", stiffness: 320, damping: 34 }
              }
              className="grain absolute inset-x-0 bottom-0 rounded-t-3xl bg-cream px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4"
            >
              <div
                className="mx-auto mb-6 h-1 w-10 rounded-full bg-stone-200"
                aria-hidden="true"
              />
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="border-b hairline">
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-16 items-center justify-between font-display text-3xl text-ink-900"
                    >
                      <span>{link.label}</span>
                      <span className="eyebrow text-stone-400">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setMenuOpen(false);
                    track("whatsapp_clicked", { source: "mobile_menu" });
                  }}
                  className="btn btn-primary flex-1"
                >
                  Order on WhatsApp
                </a>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setMenuOpen(false);
                    track("instagram_clicked", { source: "mobile_menu" });
                  }}
                  className="flex size-12 items-center justify-center rounded-full border hairline text-ink-800"
                  aria-label={`${BRAND.name} on Instagram`}
                >
                  <InstagramIcon />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 text-sm text-stone-400"
              >
                Close <Arrow className="rotate-90" />
              </button>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
