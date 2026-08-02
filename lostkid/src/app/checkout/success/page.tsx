"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order") ?? "LK-DEMO";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const launch = async () => {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#4A3428", "#E8C1C5", "#1E2D42", "#F7F2EA", "#9AB09E"],
      });
    };
    launch();
  }, []);

  // Estimated delivery: 5–7 days from now
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 7);
  const deliveryStr = delivery.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center py-20">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Circular patch badge */}
      <div className="circular-patch w-28 h-28 mb-8">
        <div className="circular-patch-inner">
          <span className="font-display text-3xl">✓</span>
        </div>
      </div>

      <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-brown mb-3">
        Order confirmed!
      </h1>
      <p className="text-brand-brown-light text-lg mb-2">
        You&apos;re going to love it.
      </p>

      <div className="bg-brand-cream-dark/60 border border-brand-sand rounded-2xl px-8 py-5 my-8 space-y-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light">
          Order ID
        </p>
        <p className="font-display text-2xl font-bold text-brand-brown">{orderId}</p>
        <p className="text-sm text-brand-brown-light">
          Estimated delivery by{" "}
          <span className="font-semibold text-brand-brown">{deliveryStr}</span>
        </p>
      </div>

      <p className="text-sm text-brand-brown-light max-w-md mb-8">
        We&apos;ll send a shipping confirmation with tracking info to your email
        shortly. Thank you for shopping with LOST KID 🖤
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="bg-brand-brown text-brand-cream rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-brand-brown-dark transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border border-brand-brown text-brand-brown rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-brand-cream-dark transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
