"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { useApp } from "@/context/AppContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggleWishlist, isWishlisted, addToCart } = useApp();
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const activeVariant = product.variants[activeVariantIndex];
  const activeImage = activeVariant.images[0];
  const isWish = isWishlisted(product.id, activeVariant.id);
  const isLowStock = typeof activeVariant.stock === "number" && activeVariant.stock <= 5;

  return (
    <article className="group relative">
      {/* Image container */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-square rounded-2xl overflow-hidden bg-brand-sand"
        aria-label={`View ${product.name} in ${activeVariant.color}`}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority={priority}
          placeholder={activeImage.blurDataURL ? "blur" : "empty"}
          blurDataURL={activeImage.blurDataURL}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="circular-patch w-12 h-12 text-[10px] font-bold leading-tight">
              <span className="circular-patch-inner">NEW</span>
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="circular-patch w-14 h-14 text-[9px] font-bold leading-tight">
              <span className="circular-patch-inner">BEST<br/>SELLER</span>
            </span>
          )}
          {isLowStock && (
            <span className="bg-accent-pink text-brand-brown text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Only {activeVariant.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id, activeVariant.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brand-cream/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-brand-cream"
          aria-label={isWish ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWish ? "fill-brand-brown text-brand-brown" : "text-brand-brown"
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Quick Add overlay on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, activeVariant, 1);
            }}
            className="w-full bg-brand-brown/90 backdrop-blur-sm text-brand-cream rounded-full py-2.5 text-sm font-semibold hover:bg-brand-brown transition-colors"
          >
            Quick Add
          </button>
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="mt-3 px-1">
        {/* Color Swatches */}
        <div className="flex gap-1.5 mb-2">
          {product.variants.map((variant, i) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariantIndex(i)}
              className={`w-5 h-5 rounded-full border-2 transition-all ${
                i === activeVariantIndex
                  ? "border-brand-brown scale-110"
                  : "border-transparent hover:border-brand-brown-light"
              }`}
              style={{ backgroundColor: variant.colorHex }}
              aria-label={`Select ${variant.color}`}
              aria-pressed={i === activeVariantIndex}
            />
          ))}
        </div>

        <Link href={`/products/${product.slug}`} className="group/link">
          <h3 className="font-medium text-brand-brown text-sm leading-snug group-hover/link:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-brand-brown">
            ${product.price.toFixed(2)}
          </span>
          {/* Star rating summary */}
          {product.reviews.length > 0 && (
            <span className="text-xs text-brand-brown-light">
              ★{" "}
              {(
                product.reviews.reduce((s, r) => s + r.rating, 0) /
                product.reviews.length
              ).toFixed(1)}{" "}
              ({product.reviews.length})
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
