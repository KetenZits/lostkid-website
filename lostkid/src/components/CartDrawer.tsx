"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function CartDrawer() {
  const { state, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useApp();
  const isOpen = state.isCartOpen;

  const FREE_SHIPPING_THRESHOLD = 100;
  const shippingProgress = Math.min(
    (cartTotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );
  const amountToFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - cartTotal,
    0
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[70] bg-brand-brown/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              {/* Drawer */}
              <Dialog.Content asChild aria-describedby="cart-description">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-brand-cream flex flex-col shadow-2xl"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-brand-sand">
                    <Dialog.Title className="font-display text-xl font-semibold text-brand-brown">
                      Your Bag
                      {cartCount > 0 && (
                        <span className="ml-2 font-sans text-sm font-normal text-brand-brown-light">
                          ({cartCount} {cartCount === 1 ? "item" : "items"})
                        </span>
                      )}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="p-2 rounded-full hover:bg-brand-cream-dark transition-colors"
                        aria-label="Close cart"
                      >
                        <X className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <p id="cart-description" className="sr-only">
                    Shopping cart drawer with {cartCount} items
                  </p>

                  {/* Free Shipping Progress */}
                  {cartTotal > 0 && (
                    <div className="px-6 py-3 bg-brand-cream-dark/50">
                      {amountToFreeShipping > 0 ? (
                        <p className="text-xs text-brand-brown-light mb-1.5">
                          Add{" "}
                          <span className="font-semibold text-brand-brown">
                            ${amountToFreeShipping.toFixed(2)}
                          </span>{" "}
                          more for free shipping!
                        </p>
                      ) : (
                        <p className="text-xs font-semibold text-brand-brown mb-1.5">
                          🎉 You&apos;ve unlocked free shipping!
                        </p>
                      )}
                      <div className="w-full h-1.5 rounded-full bg-brand-sand overflow-hidden">
                        <motion.div
                          className="h-full bg-brand-brown rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${shippingProgress}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {state.cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                        <div className="w-20 h-20 rounded-full bg-brand-sand flex items-center justify-center">
                          <ShoppingBag
                            className="w-9 h-9 text-brand-brown-light"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div>
                          <p className="font-display text-lg font-semibold text-brand-brown mb-1">
                            Your bag is empty
                          </p>
                          <p className="text-sm text-brand-brown-light">
                            Add something cozy to get started.
                          </p>
                        </div>
                        <Dialog.Close asChild>
                          <Link
                            href="/shop"
                            className="mt-2 bg-brand-brown text-brand-cream rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-brand-brown-dark transition-colors"
                          >
                            Shop New Arrivals
                          </Link>
                        </Dialog.Close>
                      </div>
                    ) : (
                      <ul className="space-y-5">
                        {state.cart.map((item) => (
                          <li
                            key={`${item.productId}-${item.variantId}`}
                            className="flex gap-4"
                          >
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-sand shrink-0">
                              <Image
                                src={item.snapshot.image.src}
                                alt={item.snapshot.image.alt}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-brand-brown text-sm leading-tight mb-0.5 truncate">
                                {item.snapshot.name}
                              </p>
                              <div className="flex items-center gap-1.5 mb-3">
                                <span
                                  className="w-3 h-3 rounded-full border border-brand-sand"
                                  style={{
                                    backgroundColor: item.snapshot.colorHex,
                                  }}
                                />
                                <span className="text-xs text-brand-brown-light">
                                  {item.snapshot.color}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                {/* Quantity */}
                                <div className="flex items-center gap-2 border border-brand-sand rounded-full px-2 py-1">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.productId,
                                        item.variantId,
                                        item.quantity - 1
                                      )
                                    }
                                    className="w-5 h-5 flex items-center justify-center hover:text-brand-brown-dark transition-colors"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm font-medium w-4 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.productId,
                                        item.variantId,
                                        item.quantity + 1
                                      )
                                    }
                                    className="w-5 h-5 flex items-center justify-center hover:text-brand-brown-dark transition-colors"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-semibold text-brand-brown">
                                    $
                                    {(
                                      item.snapshot.price * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                  <button
                                    onClick={() =>
                                      removeFromCart(
                                        item.productId,
                                        item.variantId
                                      )
                                    }
                                    className="text-brand-brown-light hover:text-brand-brown transition-colors"
                                    aria-label="Remove item"
                                  >
                                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Footer: Subtotal + CTA */}
                  {state.cart.length > 0 && (
                    <div className="border-t border-brand-sand px-6 py-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-brand-brown-light">Subtotal</span>
                        <span className="font-semibold text-brand-brown">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-brand-brown-light text-center">
                        Taxes and shipping calculated at checkout.
                      </p>
                      <Dialog.Close asChild>
                        <Link
                          href="/checkout"
                          className="block w-full bg-brand-brown text-brand-cream rounded-full py-3.5 text-sm font-semibold text-center hover:bg-brand-brown-dark transition-colors"
                        >
                          Checkout — ${cartTotal.toFixed(2)}
                        </Link>
                      </Dialog.Close>
                      <Dialog.Close asChild>
                        <Link
                          href="/cart"
                          className="block w-full text-center text-sm text-brand-brown-light hover:text-brand-brown transition-colors underline underline-offset-4"
                        >
                          View full cart
                        </Link>
                      </Dialog.Close>
                    </div>
                  )}
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
