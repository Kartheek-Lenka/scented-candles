import { ImageResponse } from "next/og";

import { BRAND, SITE_URL } from "@/lib/constants";

export const alt = `${BRAND.name} — small-batch scented candles in ${BRAND.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const host = SITE_URL.replace(/^https?:\/\//, "");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #FFF9F0 0%, #F6F1E8 45%, #E9DFD0 100%)",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            color: "#8D8377",
          }}
        >
          {BRAND.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1,
              color: "#171614",
            }}
          >
            {"Light a mood."}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.4,
              color: "#6F655B",
              maxWidth: 780,
            }}
          >
            {`Small-batch scented candles made for slow evenings. Six scents, made in ${BRAND.city}.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#46362D",
          }}
        >
          <div style={{ display: "flex" }}>{host}</div>
          <div style={{ display: "flex", color: "#8D8377" }}>{"From ₹79"}</div>
        </div>
      </div>
    ),
    size,
  );
}
