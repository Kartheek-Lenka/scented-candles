# SCENT LAB

Scented candle storefront for the Bengaluru market. Single-page marketing site with a mood
selector, scent finder, product collection, gifting section, and WhatsApp-based ordering.

## Stack

- Next.js `16.3.6` (App Router, Turbopack dev)
- React `19.2.8`
- TypeScript (strict)
- Tailwind CSS v4
- `motion@13.4.4` for reveal/gesture animation

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run lint     # eslint
npm run build    # next build
npm start        # serve the production build
```

## Configuration

Brand values live in `src/lib/constants.ts` — name, tagline, contact details, and social
handles. WhatsApp deep links are built in `src/lib/whatsapp.ts`, which also generates the
"ask about a sold-out scent" variant used for Jasmine.

Environment variables (all optional — sensible defaults are compiled in):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `917569067363` | WhatsApp number, international format, digits only |
| `NEXT_PUBLIC_SITE_URL` | `https://scentlab.in` | Canonical URL for metadata and OG tags |
| `NEXT_PUBLIC_BRAND_NAME` | `SCENT LAB` | Wordmark |
| `NEXT_PUBLIC_CITY` | `Bengaluru` | City used in copy |

The order number is the live business number (+91 75690 67363). Formatting is stripped
automatically, and `CONTACT.whatsappDisplay` is derived from the same value so the number
shown in the UI can never drift from the link that is dialled.

> If you override `NEXT_PUBLIC_WHATSAPP_NUMBER`, include the `91` country code —
> `wa.me` links fail without it.

## Structure

- `src/app/` — layout, global styles, metadata, OG image, manifest, page
- `src/components/layout/` — Navbar, Footer, StickyWhatsAppBar, CustomCursor
- `src/components/sections/` — the homepage sections, composed in `src/app/page.tsx`
- `src/components/product/` — CandleArt, ProductVisual, ProductCard, ProductModal, order CTAs
- `src/components/ui/` — shared primitives (MomentTile, SectionHeading, TrackedLink, icons)
- `src/data/` — product catalogue, mood definitions, editorial copy
- `src/lib/` — brand config, WhatsApp links, analytics, colour helpers

## Ordering model

There is no checkout or backend. Every purchase path opens WhatsApp with the product name,
chosen size, and source context pre-filled. Sold-out scents route to a restock enquiry
instead of an order.

## Images

All photography currently in `public/images/` is **placeholder stock** sourced from Pexels
(ingredient and lifestyle shots). It is deliberately treated as atmosphere — blurred,
desaturated, and washed behind the procedural `CandleArt` SVG rather than presented as
product photography.

Before launch, replace these with real candle photography. Per-product paths are set by the
`image` / `imageAlt` fields in `src/data/products.ts`; gallery and lifestyle tiles are mapped
in `src/data/content.ts`. Consider converting the source JPGs to WebP/AVIF for production.

## Conventions

- Keep server components as the default; add `"use client"` only for interactivity and motion.
- Server-rendered links that should report analytics use `TrackedLink`.
- The site is pinned to light mode (`color-scheme: only light` in `globals.css`).
- Respect reduced motion — all reveals must settle to full opacity when motion is disabled.
