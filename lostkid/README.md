# LOST KID — E-commerce Portfolio Project

A fully front-end, production-grade e-commerce website for **LOST KID**, a streetwear-adjacent bag & accessories brand. Built as a portfolio demo project — no real backend or payment processing.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, TypeScript strict mode) |
| Styling | Tailwind CSS v4 with custom `@theme` design tokens |
| Animations | Framer Motion (page transitions, cart drawer, micro-interactions) |
| Accessible Primitives | Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-accordion`) |
| Icons | Lucide React |
| Fonts | Google Fonts: Outfit (body/UI) + Fredoka (display/logo) |
| Images | `next/image` with blur placeholders |
| State | React Context + Reducer (localStorage persistent) |
| Order Confetti | `canvas-confetti` |
| Deploy Target | Vercel |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind v4 @theme + base styles
│   ├── not-found.tsx       # Custom 404 page
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   ├── robots.ts           # robots.txt
│   ├── shop/page.tsx       # Shop grid with filters & sorting
│   ├── products/[slug]/    # Dynamic product detail pages
│   ├── cart/page.tsx       # Full cart page
│   ├── checkout/           # Checkout flow (multi-step form + success)
│   ├── wishlist/page.tsx   # Saved items page
│   ├── about/page.tsx      # Brand story page
│   ├── contact/page.tsx    # Contact form
│   └── search/page.tsx     # Search results
├── components/             # Reusable UI components
│   ├── Header.tsx          # Sticky nav with cart icon
│   ├── Footer.tsx          # Footer with newsletter signup
│   ├── CartDrawer.tsx      # Slide-out cart (Radix Dialog)
│   ├── ProductCard.tsx     # Product listing card
│   └── ClientProviders.tsx # Client boundary wrapping context
├── context/
│   └── AppContext.tsx      # Global cart + wishlist state (localStorage)
├── data/
│   └── products.ts         # Mock product catalog + helper functions
├── types/
│   └── index.ts            # TypeScript interfaces
└── lib/
    └── jsonld.ts           # JSON-LD structured data helpers (SEO)
```

## Mock Data Architecture

The product catalog lives in `src/data/products.ts` as a typed array of `Product` objects with the following design:

- **Variant-level images** — each color variant has its own image set, enabling gallery switching on the PDP
- **Structured reviews** — attached to each product with author, rating, date, and verified status  
- **Helper functions** (`getAllProducts`, `getProductBySlug`, `searchProducts`, etc.) act as the data access layer

### Connecting a Real Backend

To swap in a real backend (e.g. Shopify Storefront API, custom REST/GraphQL), you only need to:

1. **Replace the helper functions** in `src/data/products.ts` with `async` API calls that return the same `Product` type shapes
2. **Mark route functions as `async`** where needed (product pages already are)
3. **Add auth/checkout API** — replace the mock `handlePlaceOrder` in `checkout/page.tsx` with a real payment provider call (Stripe, etc.)
4. **Remove localStorage state** in `AppContext.tsx` once server-side cart sessions are available

The type definitions in `src/types/index.ts` are designed to be stable across this migration.

## Design System

### Colors (Tailwind v4 tokens in `globals.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `brand-cream` | `#F7F2EA` | Background |
| `brand-brown` | `#4A3428` | Primary text, CTA buttons |
| `brand-brown-light` | `#6E5343` | Secondary text, borders |
| `accent-navy` | `#1E2D42` | Navy variant accent |
| `accent-pink` | `#E8C1C5` | Pink variant accent, badges |
| `accent-sage` | `#9AB09E` | Success states |

### Typography

- **Outfit** — body text, UI labels, descriptions
- **Fredoka** — logo, headings, price displays, brand-facing text

### Signature Design Motif

The **circular patch badge** (`.circular-patch`) is the brand's signature UI element — reused as:
- New/Bestseller badges on product cards
- Section dividers on the home page
- 404 page visual
- Order confirmation badge
- Spinning decorative element on the brand story

## Local Development

```bash
cd lostkid
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build    # Production build verification
npm start        # Start production server
```

Deploy to Vercel: connect the repo and set the root directory to `lostkid/`.

## Mock Promo Codes

| Code | Discount |
|------|----------|
| `LOST10` | 10% off subtotal |
| `COZY` | Free shipping |

## Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured products, brand story, categories, reviews |
| `/shop` | All products with filter sidebar and sort |
| `/products/[slug]` | Product detail — gallery, swatches, add-to-cart, reviews, related |
| `/cart` | Full cart page with promo code input |
| `/checkout` | Multi-step checkout (Shipping → Payment → Review) |
| `/checkout/success` | Order confirmation with confetti |
| `/wishlist` | Saved items (localStorage persisted) |
| `/about` | Brand story and values |
| `/contact` | Contact form with validation |
| `/search` | Search results with empty state |
| `/sitemap.xml` | Auto-generated SEO sitemap |
| `/robots.txt` | Auto-generated robots file |
