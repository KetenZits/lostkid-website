"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=";

const SLIDES = [
  {
    id: "hero",
    badge: "Original Puffer Series",
    headline: "Carry it\nall.",
    sub: "Quilted puffer bags for the ones who need a bag that keeps up. Cozy, bold, and unmistakably LOST KID.",
    cta: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "Our Story", href: "/about" },
    img: "/images/products/tote-lifestyle.png",
    imgAlt: "Model carrying LOST KID puffer tote bag on city street",
    dark: false,
    bgClass: "bg-brand-cream",
    overlayClass: "bg-gradient-to-r from-brand-cream via-brand-cream/80 to-transparent",
  },
  {
    id: "new-collection",
    badge: "New Collection",
    headline: "Fresh\nDrops.",
    sub: "The Brown Puffer Tote and Micro Bag are here. Warm tones, cozy quilting, same signature patch.",
    cta: { label: "Explore Collection", href: "/shop?sort=newest" },
    ctaSecondary: { label: "View All", href: "/shop" },
    img: "/images/products/tote-brown.png",
    imgAlt: "LOST KID Brown Puffer Tote — new collection",
    dark: true,
    bgClass: "bg-accent-navy",
    overlayClass: "bg-gradient-to-r from-accent-navy via-accent-navy/80 to-transparent",
  },
  {
    id: "promo",
    badge: "🎉 Limited Offer",
    headline: "Free\nShipping.",
    sub: "Orders over $100 ship free. Use code COZY at checkout for free shipping on any order — today only.",
    cta: { label: "Shop & Save", href: "/shop" },
    ctaSecondary: { label: "See the Code", href: "/cart" },
    img: "/images/products/tote-pink.png",
    imgAlt: "LOST KID Pink Puffer Tote — free shipping promotion",
    dark: false,
    bgClass: "bg-accent-pink/30",
    overlayClass: "bg-gradient-to-r from-accent-pink/80 via-accent-pink/40 to-transparent",
  },
];

// 5.5s gives people enough time to actually read the headline before it cross-fades
const INTERVAL_MS = 5500;

const textVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
};

export default function HomeHero() {
  const [[page, dir], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const idx = ((page % SLIDES.length) + SLIDES.length) % SLIDES.length;
  const slide = SLIDES[idx];

  // Auto-advance — pauses while the visitor is actually reading (hovering)
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setPage(([p]) => [p + 1, 1]);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [isPaused]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative min-h-[92vh] flex items-center overflow-hidden transition-colors duration-700 ${slide.bgClass}`}
    >
      {/* Background image — cross-fades between slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${idx}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={slide.img}
            alt={slide.imgAlt}
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR}
            className={`object-cover object-center ${slide.dark ? "opacity-20" : "opacity-25"}`}
            sizes="100vw"
          />
          <div className={`absolute inset-0 ${slide.overlayClass}`} />
          {/* Faint diamond quilting texture ties the backdrop back to the actual product stitching */}
          <div
            className={`quilt-texture absolute inset-0 opacity-[0.05] ${slide.dark ? "text-white" : "text-brand-brown"
              }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-xl">

          {/* Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${idx}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 shadow-sm text-xs font-semibold tracking-widest uppercase ${slide.dark
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-brand-cream border border-brand-sand text-brand-brown-light"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${slide.dark ? "bg-white/50" : "bg-brand-brown"}`} />
              {slide.badge}
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.h1
              key={`h1-${idx}`}
              custom={dir}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6 whitespace-pre-line ${slide.dark ? "text-white" : "text-brand-brown"
                }`}
            >
              {slide.headline}
            </motion.h1>
          </AnimatePresence>

          {/* Sub */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${idx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className={`text-lg leading-relaxed mb-10 max-w-md ${slide.dark ? "text-white/70" : "text-brand-brown-light"
                }`}
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={slide.cta.href}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-sm transition-colors ${slide.dark
                    ? "bg-white text-accent-navy hover:bg-white/90"
                    : "bg-brand-brown text-brand-cream hover:bg-brand-brown-dark"
                  }`}
              >
                {slide.cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={slide.ctaSecondary.href}
                className={`inline-flex items-center justify-center gap-2 border rounded-full px-8 py-4 font-semibold text-sm transition-colors ${slide.dark
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-brand-brown text-brand-brown hover:bg-brand-cream-dark"
                  }`}
              >
                {slide.ctaSecondary.label}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating circular patch decoration — now ringed with a dashed "stitch" to read as sewn-on */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block">
        <div
          className={`absolute -inset-3 rounded-full border-2 border-dashed animate-spin-slow ${slide.dark ? "border-white/25" : "border-brand-brown/25"
            }`}
        />
        <div className="animate-float">
          <div className={`circular-patch w-40 h-40 ${slide.dark ? "border-white/30 bg-white/10" : ""}`}>
            <div className="circular-patch-inner">
              <span
                className={`font-display text-2xl font-bold text-center leading-none ${slide.dark ? "text-white" : ""
                  }`}
              >
                LOST<br />KID
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots + a quiet 01/03-style index — real sequence info, not decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <span
          className={`text-[11px] font-semibold tracking-widest tabular-nums ${slide.dark ? "text-white/50" : "text-brand-brown/40"
            }`}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setPage([i, i > idx ? 1 : -1])}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx
                  ? slide.dark ? "w-6 bg-white" : "w-6 bg-brand-brown"
                  : slide.dark ? "w-1.5 bg-white/30" : "w-1.5 bg-brand-brown/30"
                }`}
            />
          ))}
        </div>
        <span
          className={`text-[11px] font-semibold tracking-widest tabular-nums ${slide.dark ? "text-white/30" : "text-brand-brown/25"
            }`}
        >
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10">
        <motion.div
          key={`progress-${idx}`}
          className={`h-full ${slide.dark ? "bg-white/50" : "bg-brand-brown/40"}`}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? undefined : "100%" }}
          transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}