"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const PROMO_CODES: Record<string, { type: "percent" | "shipping"; value: number; label: string }> = {
  LOST10: { type: "percent", value: 10, label: "10% off" },
  COZY: { type: "shipping", value: 0, label: "Free shipping" },
};

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, cartTotal } = useApp();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const promoData = appliedPromo ? PROMO_CODES[appliedPromo] : null;
  const discount =
    promoData?.type === "percent" ? (cartTotal * promoData.value) / 100 : 0;
  const shipping = promoData?.type === "shipping" || cartTotal >= 100 ? 0 : 8;
  const total = cartTotal - discount + shipping;

  const handlePromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code. Try LOST10 or COZY.");
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-brand-sand flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-brand-brown-light" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-3xl font-bold text-brand-brown mb-2">
          Your bag is empty
        </h1>
        <p className="text-brand-brown-light mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="bg-brand-brown text-brand-cream rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-brand-brown-dark transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-5xl font-bold text-brand-brown mb-10">
        Your Bag
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {state.cart.map((item) => (
              <motion.div
                key={`${item.productId}-${item.variantId}`}
                layout
                exit={{ opacity: 0, x: -40 }}
                className="flex gap-5 bg-brand-cream border border-brand-sand rounded-2xl p-4"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-brand-sand shrink-0">
                  <Image
                    src={item.snapshot.image.src}
                    alt={item.snapshot.image.alt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.productId}`}
                        className="font-semibold text-brand-brown hover:underline underline-offset-2"
                      >
                        {item.snapshot.name}
                      </Link>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-3 h-3 rounded-full border border-brand-sand"
                          style={{ backgroundColor: item.snapshot.colorHex }}
                        />
                        <span className="text-xs text-brand-brown-light">
                          {item.snapshot.color}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-brand-brown shrink-0">
                      ${(item.snapshot.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-brand-sand rounded-full px-2 py-1 gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:text-brand-brown-dark"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:text-brand-brown-dark"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-brand-brown-light hover:text-brand-brown transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-brand-cream border border-brand-sand rounded-2xl p-6 sticky top-24">
            <h2 className="font-display text-xl font-semibold text-brand-brown mb-6">
              Order Summary
            </h2>

            {/* Promo code */}
            <div className="mb-6">
              <label htmlFor="promo" className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light block mb-2">
                Promo Code
              </label>
              {appliedPromo ? (
                <div className="flex items-center gap-2 bg-accent-sage/10 border border-accent-sage/30 rounded-xl px-3 py-2">
                  <Tag className="w-4 h-4 text-accent-sage" />
                  <span className="text-sm font-medium text-brand-brown flex-1">
                    {appliedPromo} — {promoData?.label}
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-xs text-brand-brown-light hover:text-brand-brown"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                    placeholder="Enter code"
                    className="flex-1 border border-brand-sand rounded-xl px-3 py-2 text-sm outline-none focus-visible:border-brand-brown bg-transparent"
                  />
                  <button
                    onClick={handlePromo}
                    className="bg-brand-brown text-brand-cream rounded-xl px-4 py-2 text-sm font-semibold hover:bg-brand-brown-dark transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-xs text-red-500 mt-1.5">{promoError}</p>
              )}
              {!appliedPromo && !promoError && (
                <p className="text-xs text-brand-brown-light mt-1.5">
                  Try <kbd className="bg-brand-sand px-1 rounded">LOST10</kbd> or <kbd className="bg-brand-sand px-1 rounded">COZY</kbd>
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2.5 text-sm border-t border-brand-sand pt-4 mb-4">
              <div className="flex justify-between">
                <span className="text-brand-brown-light">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-accent-sage">
                  <span>Discount ({promoData?.value}%)</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-brown-light">Shipping</span>
                <span className={shipping === 0 ? "text-accent-sage font-medium" : "font-medium"}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg text-brand-brown border-t border-brand-sand pt-4 mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-brand-brown text-brand-cream rounded-full py-3.5 font-semibold text-sm text-center hover:bg-brand-brown-dark transition-colors"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-brand-brown-light text-center mt-3">
              Free returns within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
