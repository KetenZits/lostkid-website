"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Heart, Star, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { useApp } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? "fill-brand-brown text-brand-brown" : "text-brand-sand"}`}
        />
      ))}
    </div>
  );
}

export default function ProductPageClient({ product, relatedProducts }: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeVariant = product.variants[activeVariantIdx];
  const activeImage = activeVariant.images[activeImageIdx];
  const isWish = isWishlisted(product.id, activeVariant.id);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0;

  const handleSelectVariant = (idx: number) => {
    setActiveVariantIdx(idx);
    setActiveImageIdx(0);
  };

  const handleAddToCart = () => {
    addToCart(product, activeVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: product.reviews.filter((rev) => rev.rating === r).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-brand-brown-light mb-8">
        <Link href="/" className="hover:text-brand-brown transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-brown transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-brown font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
        {/* ── IMAGE GALLERY ─────────────────────────────────────────────── */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-sand">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeVariantIdx}-${activeImageIdx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  priority
                  placeholder={activeImage.blurDataURL ? "blur" : "empty"}
                  blurDataURL={activeImage.blurDataURL}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id, activeVariant.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-brand-cream transition-colors"
              aria-label={isWish ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart
                className={`w-5 h-5 ${isWish ? "fill-brand-brown text-brand-brown" : "text-brand-brown"}`}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {activeVariant.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {activeVariant.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden transition-all ${
                    i === activeImageIdx
                      ? "ring-2 ring-brand-brown ring-offset-1"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── PRODUCT INFO ──────────────────────────────────────────────── */}
        <div>
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {product.isNew && (
              <span className="bg-brand-brown text-brand-cream text-xs font-semibold rounded-full px-3 py-1">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-accent-pink text-brand-brown text-xs font-semibold rounded-full px-3 py-1">
                Best Seller
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-2">
            {product.name}
          </h1>

          {/* Reviews summary */}
          {product.reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-brand-brown-light">
                {avgRating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>
          )}

          <p className="text-3xl font-semibold text-brand-brown mb-6">
            ${(product.price + activeVariant.priceDelta).toFixed(2)}
          </p>

          <p className="text-brand-brown-light leading-relaxed mb-8">
            {product.shortDescription}
          </p>

          {/* Color Selector */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-brand-brown">Color:</span>
              <span className="text-sm text-brand-brown-light">{activeVariant.color}</span>
            </div>
            <div className="flex gap-3">
              {product.variants.map((variant, i) => (
                <button
                  key={variant.id}
                  onClick={() => handleSelectVariant(i)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    i === activeVariantIdx
                      ? "border-brand-brown ring-2 ring-brand-brown ring-offset-2"
                      : "border-brand-sand hover:border-brand-brown-light"
                  }`}
                  style={{ backgroundColor: variant.colorHex }}
                  aria-label={`Select ${variant.color}`}
                  aria-pressed={i === activeVariantIdx}
                />
              ))}
            </div>
          </div>

          {/* Stock status */}
          {typeof activeVariant.stock === "number" && activeVariant.stock <= 5 && (
            <p className="text-sm font-medium text-accent-pink-dark mb-4">
              Only {activeVariant.stock} left in stock
            </p>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex gap-3 mb-8">
            <div className="flex items-center border border-brand-sand rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-brand-cream-dark transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-semibold min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-brand-cream-dark transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex-1 rounded-full py-3 font-semibold text-sm transition-colors ${
                added
                  ? "bg-accent-sage text-brand-cream"
                  : "bg-brand-brown text-brand-cream hover:bg-brand-brown-dark"
              }`}
            >
              {added ? "Added to bag ✓" : "Add to Bag"}
            </motion.button>
          </div>

          {/* Accordion: Product Details */}
          <Accordion.Root type="multiple" className="border-t border-brand-sand">
            {[
              {
                id: "description",
                label: "Description",
                content: product.longDescription,
              },
              {
                id: "materials",
                label: "Materials & Dimensions",
                content: `${product.materials}\n\n${product.dimensions}\n\n${product.careInstructions}`,
              },
              {
                id: "shipping",
                label: "Shipping & Returns",
                content: product.shippingInfo + "\n\nReturns accepted within 30 days of delivery for unworn items in original condition.",
              },
            ].map(({ id, label, content }) => (
              <Accordion.Item
                key={id}
                value={id}
                className="border-b border-brand-sand"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-sm font-semibold text-brand-brown group">
                    {label}
                    <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease] data-[state=closed]:animate-[accordion-up_0.2s_ease]">
                  <div className="pb-5 text-sm text-brand-brown-light leading-relaxed whitespace-pre-line">
                    {content}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      {product.reviews.length > 0 && (
        <section className="mt-20" aria-labelledby="reviews-heading">
          <h2
            id="reviews-heading"
            className="font-display text-3xl font-bold text-brand-brown mb-8"
          >
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Rating summary */}
            <div className="md:col-span-1">
              <div className="bg-brand-cream-dark/50 rounded-2xl p-6 text-center">
                <p className="font-display text-6xl font-bold text-brand-brown">
                  {avgRating.toFixed(1)}
                </p>
                <StarRating rating={Math.round(avgRating)} />
                <p className="text-sm text-brand-brown-light mt-2">
                  {product.reviews.length} reviews
                </p>

                <div className="mt-6 space-y-2">
                  {ratingCounts.map(({ rating, count }) => (
                    <div key={rating} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-right text-brand-brown-light">{rating}</span>
                      <Star className="w-3 h-3 fill-brand-brown text-brand-brown" />
                      <div className="flex-1 h-1.5 rounded-full bg-brand-sand overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-brown"
                          style={{
                            width:
                              product.reviews.length > 0
                                ? `${(count / product.reviews.length) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                      <span className="w-4 text-brand-brown-light">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual reviews */}
            <div className="md:col-span-2 space-y-6">
              {product.reviews.map((review) => (
                <article
                  key={review.id}
                  className="border-b border-brand-sand pb-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-9 h-9 rounded-full bg-brand-sand flex items-center justify-center text-xs font-bold text-brand-brown shrink-0">
                      {review.initials}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-brand-brown">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span className="text-xs text-accent-sage font-medium">
                            ✓ Verified
                          </span>
                        )}
                        <span className="text-xs text-brand-brown-light">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-brand-brown text-sm mb-1">
                    {review.title}
                  </h3>
                  <p className="text-sm text-brand-brown-light leading-relaxed">
                    {review.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold text-brand-brown mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
