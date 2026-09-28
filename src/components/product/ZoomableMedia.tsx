"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

const MAX_SCALE = 3.2;
const MIN_SCALE = 1;

/**
 * Tap, double-tap, pinch and keyboard zoom for product imagery.
 * Works on both real photography and the SVG product composition.
 */
export function ZoomableMedia({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);

  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<{ distance: number; scale: number; origin: Point } | null>(
    null,
  );
  const panStart = useRef<{ pointer: Point; offset: Point } | null>(null);

  const reset = useCallback(() => {
    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed, reset]);

  const distance = (a: Point, b: Point) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      panStart.current = {
        pointer: { x: e.clientX, y: e.clientY },
        offset,
      };
    }

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { distance: distance(a, b), scale, origin: { x: 0, y: 0 } };
      panStart.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && gesture.current) {
      const [a, b] = [...pointers.current.values()];
      const next = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, (gesture.current.scale * distance(a, b)) / gesture.current.distance),
      );
      setScale(next);
      setZoomed(next > 1.05);
      return;
    }

    if (pointers.current.size === 1 && scale > 1 && panStart.current) {
      const dx = e.clientX - panStart.current.pointer.x;
      const dy = e.clientY - panStart.current.pointer.y;
      const limit = 140 * (scale - 1);
      setOffset({
        x: Math.max(-limit, Math.min(limit, panStart.current.offset.x + dx)),
        y: Math.max(-limit, Math.min(limit, panStart.current.offset.y + dy)),
      });
    }
  };

  const endPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  };

  const toggleZoom = () => {
    setZoomed((prev) => {
      const next = !prev;
      setScale(next ? 2 : MIN_SCALE);
      if (!next) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale - e.deltaY * 0.006));
    setScale(next);
    setZoomed(next > 1.05);
  };

  return (
    <div
      className={cn(
        "group/zoom relative size-full touch-pan-y select-none",
        zoomed ? "cursor-grabbing" : "cursor-zoom-in",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label={`${label}. Activate to zoom, use arrow keys to pan, Escape to reset.`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onDoubleClick={toggleZoom}
      onWheel={onWheel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleZoom();
          return;
        }
        if (!zoomed) return;
        const step = 28;
        if (e.key === "ArrowRight") setOffset((o) => ({ ...o, x: o.x - step }));
        if (e.key === "ArrowLeft") setOffset((o) => ({ ...o, x: o.x + step }));
        if (e.key === "ArrowUp") setOffset((o) => ({ ...o, y: o.y - step }));
        if (e.key === "ArrowDown") setOffset((o) => ({ ...o, y: o.y + step }));
        if (e.key === "Escape") reset();
      }}
    >
      <m.div
        className="size-full will-change-transform"
        animate={{ scale, x: offset.x, y: offset.y }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 30, mass: 0.6 }
        }
      >
        {children}
      </m.div>

      <span
        className={cn(
          "pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink-900/70 px-3 py-1.5 text-[0.6875rem] tracking-wide text-cream backdrop-blur-sm transition-opacity duration-300",
          zoomed ? "opacity-0" : "opacity-0 group-hover/zoom:opacity-100",
        )}
      >
        {zoomed ? "" : "Tap to zoom"}
      </span>
    </div>
  );
}
