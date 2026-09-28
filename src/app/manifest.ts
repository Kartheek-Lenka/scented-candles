import type { MetadataRoute } from "next";

import { BRAND } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — Scented Candles in ${BRAND.city}`,
    short_name: BRAND.name,
    description: "Small-batch scented candles made for slow evenings.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E8",
    theme_color: "#F6F1E8",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
