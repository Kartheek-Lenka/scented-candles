"use client";

import { useEffect } from "react";

import { track } from "@/lib/whatsapp";

/** Fires a single page_view on mount. */
export function PageView() {
  useEffect(() => {
    track("page_view", { path: window.location.pathname });
  }, []);

  return null;
}
