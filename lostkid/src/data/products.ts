// ─────────────────────────────────────────────────────────────────────────────
// data/products.ts — Mock product catalog for LOST KID
//
// BACKEND MIGRATION NOTE:
// To connect a real backend, replace the `products` array and helper functions
// below with async API calls (e.g. Shopify Storefront API, custom REST/GraphQL).
// The type shapes remain identical — only the data source changes.
// ─────────────────────────────────────────────────────────────────────────────

import type { Product } from "@/types";

// A simple blur placeholder — in production, generate real per-image blurDataURLs
const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=";

export const products: Product[] = [
  // ── 1. LOST KID Puffer Tote Bag (Hero Product) ──────────────────────────────
  {
    id: "prod_001",
    slug: "puffer-tote-bag",
    name: "LOST KID Puffer Tote",
    shortDescription:
      "The original. A roomy quilted puffer tote with our signature bubble-letter patch.",
    longDescription: `Meet the bag that started it all. The LOST KID Puffer Tote is crafted from our signature diamond-quilted puffer material — lightweight yet structured, soft yet durable. It holds everything you need for a day out without sacrificing an ounce of style.

The circular LOST KID bubble-letter patch sits front-and-center, serving as both a logo and a statement. Double top handles give you flexibility: carry it in hand or drop it over your shoulder. An interior zip pocket keeps your essentials secure, while the magnetic closure snap keeps the bag tidy.

Whether you're running errands, heading to class, or stepping out for coffee, the Puffer Tote brings cozy streetwear energy to every outfit.`,
    category: "bags",
    price: 85.0,
    isNew: false,
    isBestSeller: true,
    materials:
      "Shell: 100% Recycled Polyester (quilted puffer fill). Lining: 100% Polyester. Hardware: Antique brass-toned zinc alloy. Patch: Full-grain leather.",
    dimensions: 'Height: 13" / Width: 14" / Depth: 4.5" / Handle Drop: 8"',
    careInstructions:
      "Spot clean with a damp cloth. Do not machine wash. Store stuffed with tissue paper to maintain shape.",
    shippingInfo:
      "Free standard shipping on orders over $100. Standard (5–7 business days): $8. Express (2–3 business days): $18. All orders ship from Los Angeles, CA.",
    tags: ["tote", "puffer", "bestseller", "bags"],
    createdAt: "2024-01-15T00:00:00Z",
    variants: [
      {
        id: "var_001_navy",
        color: "Navy",
        colorHex: "#1E2D42",
        priceDelta: 0,
        stock: 12,
        images: [
          {
            src: "/images/products/tote-navy.png",
            alt: "LOST KID Puffer Tote in Navy — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-lifestyle.png",
            alt: "LOST KID Puffer Tote styled on model",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble-letter patch",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
      {
        id: "var_001_brown",
        color: "Brown",
        colorHex: "#4A3428",
        priceDelta: 0,
        stock: 8,
        images: [
          {
            src: "/images/products/tote-brown.png",
            alt: "LOST KID Puffer Tote in Chocolate Brown — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-lifestyle.png",
            alt: "LOST KID Puffer Tote styled on model",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble-letter patch",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
      {
        id: "var_001_pink",
        color: "Pink",
        colorHex: "#E8C1C5",
        priceDelta: 0,
        stock: 5,
        images: [
          {
            src: "/images/products/tote-pink.png",
            alt: "LOST KID Puffer Tote in Blush Pink — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-lifestyle.png",
            alt: "LOST KID Puffer Tote styled on model",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble-letter patch",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
    ],
    reviews: [
      {
        id: "rev_001_1",
        author: "Mia K.",
        initials: "MK",
        rating: 5,
        date: "2024-08-10T00:00:00Z",
        title: "Absolutely obsessed!!",
        body: "I bought the navy one and I use it literally every single day. It fits my laptop, water bottle, and all my junk. The quality is so much better than I expected — the puffer material feels premium. The patch is so cute.",
        verified: true,
      },
      {
        id: "rev_001_2",
        author: "Jordan T.",
        initials: "JT",
        rating: 5,
        date: "2024-09-02T00:00:00Z",
        title: "The perfect tote",
        body: "The brown colorway is chef's kiss. Goes with literally everything. I've gotten so many compliments — everyone asks where I got it. Sizing is generous but not overwhelming. Straps are comfortable.",
        verified: true,
      },
      {
        id: "rev_001_3",
        author: "Sophie R.",
        initials: "SR",
        rating: 4,
        date: "2024-09-18T00:00:00Z",
        title: "Love the pink, wish it had more pockets",
        body: "The blush pink is even prettier in person. I do wish there were more internal pockets (there's one zip pocket inside), but for the price and the look, I'm not complaining. Would buy again!",
        verified: true,
      },
    ],
  },

  // ── 2. LOST KID Puffer Micro Bag ────────────────────────────────────────────
  {
    id: "prod_002",
    slug: "puffer-micro-bag",
    name: "LOST KID Micro Bag",
    shortDescription:
      "Baby-sized but mighty. The Micro Bag fits your essentials with maximum personality.",
    longDescription: `All the LOST KID energy, in a compact package. The Micro Bag is our mini crossbody-friendly companion — small enough for just your phone, keys, and cards, but big enough to be a full outfit moment.

Same diamond-quilted puffer construction as our Tote, with the signature circular patch and antique-brass hardware. The adjustable webbing strap converts easily between crossbody and hand-carry, and the zip-top closure keeps everything secure.

Perfect for concerts, markets, errands, or any time you don't want to lug a full tote.`,
    category: "bags",
    price: 65.0,
    isNew: true,
    isBestSeller: false,
    materials:
      "Shell: 100% Recycled Polyester (quilted puffer fill). Lining: 100% Polyester. Hardware: Antique brass-toned zinc alloy. Patch: Full-grain leather.",
    dimensions:
      'Height: 7" / Width: 9" / Depth: 3" / Strap Drop: Adjustable 18"–24"',
    careInstructions:
      "Spot clean with a damp cloth. Do not machine wash. Store stuffed with tissue paper to maintain shape.",
    shippingInfo:
      "Free standard shipping on orders over $100. Standard (5–7 business days): $8. Express (2–3 business days): $18.",
    tags: ["micro", "crossbody", "new", "bags"],
    createdAt: "2024-11-01T00:00:00Z",
    variants: [
      {
        id: "var_002_cream",
        color: "Cream",
        colorHex: "#F7F2EA",
        priceDelta: 0,
        stock: 20,
        images: [
          {
            src: "/images/products/tote-lifestyle.png",
            alt: "LOST KID Micro Bag in Cream — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble-letter patch on Micro Bag",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
      {
        id: "var_002_sage",
        color: "Sage",
        colorHex: "#9AB09E",
        priceDelta: 0,
        stock: 14,
        images: [
          {
            src: "/images/products/tote-navy.png",
            alt: "LOST KID Micro Bag in Sage — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble-letter patch on Micro Bag",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
    ],
    reviews: [
      {
        id: "rev_002_1",
        author: "Aaliyah M.",
        initials: "AM",
        rating: 5,
        date: "2024-11-20T00:00:00Z",
        title: "The cutest little bag!!",
        body: "I got the cream one and I've been wearing it everywhere. It's such a perfect size for going out — just enough room for the essentials. The quality is great, feels really sturdy despite being so small.",
        verified: true,
      },
      {
        id: "rev_002_2",
        author: "Priya V.",
        initials: "PV",
        rating: 4,
        date: "2024-12-05T00:00:00Z",
        title: "Great bag, love the sage color",
        body: "The sage colorway is really beautiful in person, almost like a dusty green. The strap is comfortable and adjustable. My only note is that the zip is a bit stiff at first, but it loosens up after a few uses.",
        verified: false,
      },
    ],
  },

  // ── 3. LOST KID Bubble Logo Cap ─────────────────────────────────────────────
  {
    id: "prod_003",
    slug: "bubble-logo-cap",
    name: "LOST KID Bubble Cap",
    shortDescription:
      "Low-profile 6-panel cap with the iconic LOST KID bubble embroidery.",
    longDescription: `The LOST KID Bubble Cap is a head-to-toe streetwear essential. Low-profile structured 6-panel construction in a washed cotton twill, with our signature bubbly LOST KID wordmark embroidered on the front in tone-on-tone thread.

The pre-curved brim and adjustable metal buckle strap make it a perfect fit for all head sizes. Clean, minimal, and instantly recognizable to anyone who knows the brand.`,
    category: "accessories",
    price: 35.0,
    isNew: false,
    isBestSeller: false,
    materials:
      "Shell: 100% Washed Cotton Twill. Sweatband: 100% Cotton. Closure: Antique brass adjustable buckle strap.",
    dimensions: 'One size fits most. Brim: 2.75". Structured 6-panel.',
    careInstructions:
      "Hand wash cold, reshape and air dry. Do not machine wash or tumble dry.",
    shippingInfo:
      "Free standard shipping on orders over $100. Standard (5–7 business days): $8. Express (2–3 business days): $18.",
    tags: ["cap", "hat", "accessories", "logo"],
    createdAt: "2024-03-20T00:00:00Z",
    variants: [
      {
        id: "var_003_cocoa",
        color: "Cocoa",
        colorHex: "#5C3D2E",
        priceDelta: 0,
        stock: 30,
        images: [
          {
            src: "/images/products/tote-brown.png",
            alt: "LOST KID Bubble Cap in Cocoa — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble embroidery on cap",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
      {
        id: "var_003_navy",
        color: "Navy",
        colorHex: "#1E2D42",
        priceDelta: 0,
        stock: 25,
        images: [
          {
            src: "/images/products/tote-navy.png",
            alt: "LOST KID Bubble Cap in Navy — front view",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID bubble embroidery on cap",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
    ],
    reviews: [
      {
        id: "rev_003_1",
        author: "Eli W.",
        initials: "EW",
        rating: 5,
        date: "2024-05-12T00:00:00Z",
        title: "Best cap I own",
        body: "The cocoa color is really nice, works with my whole wardrobe. The fit is perfect and the embroidery is super clean. I've been wearing it almost every day.",
        verified: true,
      },
    ],
  },

  // ── 4. LOST KID Puffer Laptop Sleeve ────────────────────────────────────────
  {
    id: "prod_004",
    slug: "puffer-laptop-sleeve",
    name: "LOST KID Laptop Sleeve",
    shortDescription:
      'Padded quilted sleeve for 13"–15" laptops. Carry your tech in LOST KID style.',
    longDescription: `Protect your laptop without sacrificing style. The LOST KID Puffer Laptop Sleeve wraps your computer in the same diamond-quilted puffer material as our bags, with extra internal padding for real drop protection.

The full-length zip closure makes it easy to slide your laptop in and out, and the flat form factor means it slips neatly into any tote or backpack — including our Puffer Tote. Or carry it solo with the webbing loop handle for a clean, minimal look.`,
    category: "accessories",
    price: 45.0,
    isNew: true,
    isBestSeller: false,
    materials:
      "Shell: 100% Recycled Polyester (quilted puffer fill). Lining: Padded fleece-lined interior. Hardware: YKK zipper.",
    dimensions: 'Fits laptops up to 15". Sleeve: 15" × 11" × 0.75"',
    careInstructions:
      "Spot clean with a damp cloth. Do not machine wash. Air dry flat.",
    shippingInfo:
      "Free standard shipping on orders over $100. Standard (5–7 business days): $8. Express (2–3 business days): $18.",
    tags: ["laptop", "tech", "accessories", "new"],
    createdAt: "2024-11-15T00:00:00Z",
    variants: [
      {
        id: "var_004_navy",
        color: "Navy",
        colorHex: "#1E2D42",
        priceDelta: 0,
        stock: 18,
        images: [
          {
            src: "/images/products/tote-navy.png",
            alt: "LOST KID Laptop Sleeve in Navy",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID patch on Laptop Sleeve",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
      {
        id: "var_004_cream",
        color: "Cream",
        colorHex: "#F7F2EA",
        priceDelta: 0,
        stock: 10,
        images: [
          {
            src: "/images/products/tote-lifestyle.png",
            alt: "LOST KID Laptop Sleeve in Cream",
            blurDataURL: BLUR_PLACEHOLDER,
          },
          {
            src: "/images/products/tote-detail.png",
            alt: "Close-up of LOST KID patch on Laptop Sleeve",
            blurDataURL: BLUR_PLACEHOLDER,
          },
        ],
      },
    ],
    reviews: [
      {
        id: "rev_004_1",
        author: "Dev P.",
        initials: "DP",
        rating: 5,
        date: "2024-12-01T00:00:00Z",
        title: "Fits my MacBook Pro perfectly",
        body: "Ordered the navy sleeve for my 14\" MacBook Pro. It fits snugly with just enough room for a charger cable alongside it. The quilted look is unique — way cooler than a generic neoprene sleeve.",
        verified: true,
      },
    ],
  },
];

// ── Data Access Helpers ──────────────────────────────────────────────────────
// These are the functions that a real backend would implement as API calls.

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);
}

export function getRelatedProducts(
  currentProductId: string,
  limit = 4
): Product[] {
  return products.filter((p) => p.id !== currentProductId).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
