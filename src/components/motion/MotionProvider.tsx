"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Wraps the app in `LazyMotion` so only the animation features actually used
 * ship to the client — a meaningful bundle saving versus the full feature set.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
