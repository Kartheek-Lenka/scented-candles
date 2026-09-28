"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** True only for devices with an accurate pointing device (mouse/trackpad). */
function useFinePointer(): boolean {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia("(pointer: fine)");
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

/**
 * Desktop-only custom cursor with contextual labels.
 * Opts out on touch devices and whenever reduced motion is requested.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 480, damping: 38, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 480, damping: 38, mass: 0.35 });

  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.style.cursor = "none";

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        setVisible(true);
      });

      const target = e.target as HTMLElement | null;
      setLabel(target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null);
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.style.cursor = "";
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center"
          style={{ x: springX, y: springY }}
          initial={false}
        >
          <m.div
            className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900 text-cream"
            animate={{
              width: label ? 74 : 10,
              height: label ? 74 : 10,
              opacity: label ? 0.95 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          >
            <AnimatePresence>
              {label && (
                <m.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.16 }}
                  className="text-[0.625rem] tracking-[0.16em]"
                >
                  {label}
                </m.span>
              )}
            </AnimatePresence>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
