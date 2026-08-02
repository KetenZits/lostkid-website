// ─────────────────────────────────────────────────────────────────────────────
// types/index.ts — Core type definitions for LOST KID e-commerce
// Structured so swapping in a real backend later requires minimal changes:
// just replace the mock data functions with real API calls that return the same shapes.
// ─────────────────────────────────────────────────────────────────────────────

export type Category = "bags" | "accessories" | "apparel";

export type ColorName =
  | "Navy"
  | "Brown"
  | "Pink"
  | "Cream"
  | "Sage"
  | "Cocoa"
  | "Forest";

export interface ProductImage {
  src: string;
  alt: string;
  /** Optional blur placeholder data URL for next/image */
  blurDataURL?: string;
}

export interface ProductVariant {
  id: string;
  color: ColorName;
  /** Hex value for swatch display */
  colorHex: string;
  images: ProductImage[];
  /** null means in stock with no limit tracked */
  stock: number | null;
  /** Variant-level price delta (0 for same price as product) */
  priceDelta: number;
}

export interface Review {
  id: string;
  author: string;
  /** Avatar initials, shown as a fallback */
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO string
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: Category;
  price: number; // in USD, base price
  isNew: boolean;
  isBestSeller: boolean;
  materials: string;
  dimensions: string;
  careInstructions: string;
  shippingInfo: string;
  variants: ProductVariant[];
  reviews: Review[];
  tags: string[];
  /** Date product was added (for sorting by newest) */
  createdAt: string; // ISO string
}

// ── Cart & Wishlist ──────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  /** Snapshot data (so cart is correct even if product data changes) */
  snapshot: {
    name: string;
    price: number;
    color: ColorName;
    colorHex: string;
    image: ProductImage;
  };
}

export type WishlistItem = {
  productId: string;
  variantId: string;
};

// ── Order / Checkout ─────────────────────────────────────────────────────────

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  promoCode?: string;
  createdAt: string;
  estimatedDelivery: string;
}
