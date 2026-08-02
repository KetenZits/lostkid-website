// lib/jsonld.ts — JSON-LD structured data helpers for SEO
import type { Product } from "@/types";

const BASE_URL = "https://lostkid.co";

export function productJsonLd(product: Product): object {
  const variant = product.variants[0];
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: variant.images.map((img) => `${BASE_URL}${img.src}`),
    brand: {
      "@type": "Brand",
      name: "LOST KID",
    },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability:
        variant.stock === null || (typeof variant.stock === "number" && variant.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${BASE_URL}/products/${product.slug}`,
    },
    ...(avgRating !== null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: product.reviews.length,
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; href: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.href}`,
    })),
  };
}
