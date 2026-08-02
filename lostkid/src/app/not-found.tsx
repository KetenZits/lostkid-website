import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center py-20">
      {/* Circular patch badge as 404 */}
      <div className="circular-patch w-40 h-40 mb-10">
        <div className="circular-patch-inner">
          <span className="font-display text-5xl font-bold text-brand-brown">404</span>
        </div>
      </div>

      <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-brown mb-3">
        Lost in the streets?
      </h1>
      <p className="text-brand-brown-light text-lg mb-2 max-w-md">
        Even the most seasoned LOST KID wanders off sometimes. The page you&apos;re
        looking for doesn&apos;t exist.
      </p>
      <p className="text-sm text-brand-brown-light mb-10">
        Error 404 — Page not found
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-brown text-brand-cream rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-brand-brown-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 border border-brand-brown text-brand-brown rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-brand-cream-dark transition-colors"
        >
          Browse the Shop
        </Link>
      </div>
    </div>
  );
}
