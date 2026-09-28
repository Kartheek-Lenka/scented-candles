"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { createWhatsAppLink, track } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Sticky mobile order bar. Appears once the user is past the hero and steps
 * aside near the footer so it never competes with the closing CTA.
 */
export function StickyWhatsAppBar() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const footer = document.getElementById("site-footer");

    const evaluate = () => {
      const past = window.scrollY > window.innerHeight * 0.75;
      const footerInView = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(past && !footerInView);
    };

    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("resize", evaluate);
    return () => {
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
          initial={{ y: reduceMotion ? 0 : 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduceMotion ? 0 : 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { source: "sticky_bar" })}
            className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-espresso px-6 text-sm font-medium text-cream shadow-[0_16px_40px_-16px_rgba(23,22,20,0.7)] transition-transform active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Order on WhatsApp
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
