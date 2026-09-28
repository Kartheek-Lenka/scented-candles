import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

import { BRAND, CONTACT, SITE_URL } from "@/lib/constants";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ProductModalProvider } from "@/components/product/ProductModalProvider";
import { products } from "@/data/products";

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const title = `${BRAND.name} — Small-Batch Scented Candles in ${BRAND.city}`;

const description = `Small-batch scented candles made for slow evenings. Discover six moods, six scents and candles made in ${BRAND.city}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${BRAND.name}`,
  },
  description,
  applicationName: BRAND.name,
  keywords: [
    "scented candles",
    "small batch candles",
    `candles ${BRAND.city}`,
    "candle gifting",
    "cozy candles",
    "soy wax candles",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BRAND.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Lifestyle",
};

export const viewport: Viewport = {
  themeColor: "#F6F1E8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${editorial.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-ink-900 focus-visible:px-5 focus-visible:py-3 focus-visible:text-sm focus-visible:text-cream"
          >
            Skip to content
          </a>
          <ProductModalProvider>{children}</ProductModalProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: BRAND.name,
              description,
              url: SITE_URL,
              image: `${SITE_URL}/opengraph-image`,
              address: {
                "@type": "PostalAddress",
                addressLocality: BRAND.city,
                addressCountry: "IN",
              },
              sameAs: [CONTACT.instagramUrl],
              makesOffer: products
                .filter((p) => p.availability === "in-stock")
                .map((p) => ({
                  "@type": "Offer",
                  name: `${p.name} — 50g Mini`,
                  price: p.sizes[0].price,
                  priceCurrency: "INR",
                  url: `${SITE_URL}/#shop`,
                  availability: "https://schema.org/InStock",
                })),
            }),
          }}
        />
      </body>
    </html>
  );
}
