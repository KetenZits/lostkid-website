import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { getFeaturedProducts, getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HomeHero from "@/components/HomeHero";
import Marquee from "@/components/Marquee";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "LOST KID — Puffer Bags & Accessories",
  description:
    "Shop the original LOST KID quilted puffer tote bags. Cozy streetwear for the playfully bold.",
};

// Marquee content config
const BRAND_MARQUEE = [
  { text: "ORIGINAL PUFFER SERIES" },
  { text: "FREE SHIPPING OVER $100" },
  { text: "HANDCRAFTED DETAILS" },
  { text: "EST. LOS ANGELES" },
  { text: "NEW COLLECTION OUT NOW", icon: "✦" },
];

const PROMO_MARQUEE = [
  { text: "USE CODE LOST10 FOR 10% OFF" },
  { text: "FREE RETURNS WITHIN 30 DAYS" },
  { text: "SHIPS WORLDWIDE" },
  { text: "LIMITED STOCK — SHOP NOW", icon: "🔥" },
  { text: "QUILTED. BOLD. UNMISSABLE." },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const allProducts = getAllProducts();

  return (
    <>
      {/* ── HERO SLIDER ────────────────────────────────────────────────────── */}
      <HomeHero />

      {/* ── MARQUEE STRIP (brand) ───────────────────────────────────────────── */}
      <Marquee
        items={BRAND_MARQUEE}
        speed={28}
        className="bg-brand-brown text-brand-cream"
        itemClassName="text-sm font-semibold tracking-widest uppercase"
        dotClassName="bg-brand-cream/40"
      />

      {/* ── PROMO MARQUEE (reversed / cream) ──────────────────────────────── */}
      <Marquee
        items={PROMO_MARQUEE}
        speed={22}
        reverse
        className="bg-brand-cream-dark/70 text-brand-brown-light border-y border-brand-sand"
        itemClassName="text-xs font-medium tracking-widest uppercase"
        dotClassName="bg-brand-brown/30"
      />

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-2">
              Favorites
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-brown">
              New &amp; Beloved
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-brown-light hover:text-brand-brown transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.08}>
              <ProductCard product={product} priority={i < 2} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-8 sm:hidden text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-brown underline underline-offset-4"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </section>

      {/* Stitched seam — reads as the sewn line between two quilted panels */}
      <div className="stitch-divider text-brand-sand max-w-7xl mx-auto" />

      {/* ── BRAND STORY TEASER ───────────────────────────────────────────────── */}
      <section className="relative bg-brand-brown text-brand-cream py-24 overflow-hidden">
        {/* Faint quilting texture grounds the section in the actual product material */}
        <div className="quilt-texture absolute inset-0 opacity-[0.04] text-brand-cream" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text column */}
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-cream/50 mb-4">
                Who We Are
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-none mb-6">
                Born from the
                <br />streets.
                <br />Built to last.
              </h2>
              <p className="text-brand-cream/70 leading-relaxed mb-8 max-w-md">
                LOST KID started with one bag and a bubble-letter patch. We make
                things for the ones who want to carry their whole world with them
                — without looking like they&apos;re trying too hard.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-brand-cream/30 text-brand-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-brand-cream/10 transition-colors"
              >
                Read our story <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>

            {/* Image column — fixed mobile overflow */}
            <AnimatedSection direction="right">
              <div className="relative aspect-square max-w-sm mx-auto">
                <Image
                  src="/images/products/tote-detail.png"
                  alt="Close-up of LOST KID signature bubble-letter patch"
                  fill
                  className="object-cover rounded-3xl"
                  sizes="(max-width: 768px) 80vw, 400px"
                />
                {/* Patch: pinned inside image boundary on mobile, overhangs on desktop */}
                <div
                  className="
                    absolute circular-patch w-24 h-24 md:w-32 md:h-32
                    bottom-3 right-3
                    md:-bottom-8 md:-right-8
                    animate-spin-slow
                  "
                >
                  <div className="circular-patch-inner text-[8px] md:text-[9px] font-bold tracking-widest text-center leading-relaxed uppercase">
                    HANDMADE<br />· ORIGINAL ·<br />SINCE 2024
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ─────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-2">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-brown">
            Shop by Category
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Totes",
              sublabel: "The originals",
              href: "/shop?category=bags",
              img: "/images/products/tote-navy.png",
              alt: "LOST KID puffer tote bags",
            },
            {
              label: "Micro Bags",
              sublabel: "Mini, mighty",
              href: "/shop?category=bags",
              img: "/images/products/tote-pink.png",
              alt: "LOST KID micro puffer bags",
            },
            {
              label: "Accessories",
              sublabel: "Hats & sleeves",
              href: "/shop?category=accessories",
              img: "/images/products/tote-brown.png",
              alt: "LOST KID accessories",
            },
          ].map(({ label, sublabel, href, img, alt }, i) => (
            <AnimatedSection key={label} delay={i * 0.1}>
              <Link
                href={href}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden group block"
              >
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/70 via-brand-brown/20 to-transparent" />
                {/* Quilting texture surfaces on hover — same idea as the product's own stitching */}
                <div className="quilt-texture absolute inset-0 text-brand-cream opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-display text-3xl font-bold text-brand-cream">
                    {label}
                  </p>
                  <p className="text-brand-cream/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {sublabel}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── MARQUEE STRIP (testimonial tag) ───────────────────────────────── */}
      <Marquee
        items={[
          { text: "AS SEEN ON THE STREETS" },
          { text: "⭐⭐⭐⭐⭐ 4.9 AVERAGE RATING" },
          { text: "200+ HAPPY CUSTOMERS" },
          { text: "COZY IS A LIFESTYLE" },
          { text: "BUILT TO CARRY EVERYTHING" },
        ]}
        speed={20}
        className="bg-brand-sand text-brand-brown-light"
        itemClassName="text-xs font-bold tracking-widest uppercase"
        dotClassName="bg-brand-brown/25"
      />

      {/* ── SOCIAL PROOF STRIP ───────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-cream-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-brand-brown text-brand-brown" />
              ))}
            </div>
            <p className="font-display text-2xl font-semibold text-brand-brown">
              4.9 out of 5
            </p>
            <p className="text-sm text-brand-brown-light mt-1">
              Based on {allProducts.reduce((s, p) => s + p.reviews.length, 0)} verified reviews
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {allProducts
              .flatMap((p) => p.reviews)
              .filter((r) => r.rating === 5)
              .slice(0, 3)
              .map((review, i) => (
                <AnimatedSection key={review.id} delay={i * 0.1}>
                  <blockquote className="relative bg-brand-cream rounded-2xl p-6 border border-brand-sand h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    {/* Quote glyph — a quiet nod to the display face, not just a stock icon */}
                    <span
                      aria-hidden="true"
                      className="quote-mark absolute top-3 right-5 text-5xl text-brand-brown/10 select-none"
                    >
                      &rdquo;
                    </span>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-brand-brown text-brand-brown" />
                      ))}
                    </div>
                    <p className="relative text-sm text-brand-brown leading-relaxed mb-4">
                      &ldquo;{review.body}&rdquo;
                    </p>
                    <footer className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-brand-sand flex items-center justify-center text-xs font-bold text-brand-brown">
                        {review.initials}
                      </span>
                      <span className="text-xs font-medium text-brand-brown-light">
                        {review.author}
                        {review.verified && (
                          <span className="ml-1 text-accent-sage">✓ Verified</span>
                        )}
                      </span>
                    </footer>
                  </blockquote>
                </AnimatedSection>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}