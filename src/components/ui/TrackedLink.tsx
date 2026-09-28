"use client";

import type { AnalyticsEvent, TrackProps } from "@/lib/whatsapp";
import { track } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Anchor that fires an analytics event on click.
 * Lets server-rendered sections keep tracking without becoming client
 * components themselves.
 */
export function TrackedLink({
  href,
  children,
  className,
  event,
  eventProps,
  external = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  event?: AnalyticsEvent;
  eventProps?: TrackProps;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a
      href={href}
      className={cn(className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        if (event) track(event, eventProps);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
