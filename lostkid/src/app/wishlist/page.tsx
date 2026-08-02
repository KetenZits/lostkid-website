"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getAllProducts } from "@/data/products";
import { useMemo } from "react";

export default function WishlistPage() {
  const { state, toggleWishlist, addToCart } = useApp();
  const allProducts = useMemo(() => getAllProducts(), []);

  const wishlistItems = state.wishlist
    .map(({ productId, variantId }) => {
      const product = allProducts.find((p) => p.id === productId);
      const variant = product?.variants.find((v) => v.id === variantId);
      if (!product || !variant) return null;
      return { product, variant };
    })
    .filter(Boolean) as { product: (typeof allProducts)[0]; variant: (typeof allProducts)[0]["variants"][0] }[];

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-sand flex items-center justify-center mb-6">
          <Heart className="w-9 h-9 text-brand-brown-light" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-3xl font-bold text-brand-brown mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-brand-brown-light mb-8">
          Heart a product to save it here for later.
        </p>
        <Link
          href="/shop"
          className="bg-brand-brown text-brand-cream rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-brand-brown-dark transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-5xl font-bold text-brand-brown mb-2">
        Wishlist
      </h1>
      <p className="text-brand-brown-light mb-10">
        {wishlistItems.length} saved item{wishlistItems.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlistItems.map(({ product, variant }) => (
          <article key={`${product.id}-${variant.id}`} className="group">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-sand mb-3">
              <Image
                src={variant.images[0].src}
                alt={variant.images[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {/* Remove from wishlist */}
              <button
                onClick={() => toggleWishlist(product.id, variant.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brand-cream/80 backdrop-blur-sm flex items-center justify-center hover:bg-brand-cream transition-colors"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-4 h-4 fill-brand-brown text-brand-brown" strokeWidth={1.5} />
              </button>
            </div>

            <Link href={`/products/${product.slug}`} className="block mb-1 hover:underline underline-offset-2">
              <h2 className="font-medium text-brand-brown text-sm leading-snug">{product.name}</h2>
            </Link>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-3 h-3 rounded-full border border-brand-sand" style={{ backgroundColor: variant.colorHex }} />
              <span className="text-xs text-brand-brown-light">{variant.color}</span>
            </div>
            <p className="text-sm font-semibold text-brand-brown mb-3">
              ${(product.price + variant.priceDelta).toFixed(2)}
            </p>

            <button
              onClick={() => addToCart(product, variant, 1)}
              className="w-full flex items-center justify-center gap-2 border border-brand-brown text-brand-brown rounded-full py-2 text-xs font-semibold hover:bg-brand-brown hover:text-brand-cream transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
