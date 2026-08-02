import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Smile, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind LOST KID — a streetwear-adjacent bag brand born from a love of cozy, bold design.",
};

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=";

const VALUES = [
  {
    title: "Quality > Quantity",
    body: "We'd rather make fewer things made right than flood the market with stuff.",
    icon: Sparkles,
    rotate: "-rotate-2",
  },
  {
    title: "Play is serious",
    body: "The bubble-letter patch is a joke that's also a statement. Both things can be true.",
    icon: Smile,
    rotate: "rotate-1",
  },
  {
    title: "Built to be carried",
    body: "Every design decision starts with the question: will this work for someone's actual life?",
    icon: ShoppingBag,
    rotate: "-rotate-1",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[52vh] min-h-[380px] flex items-end overflow-hidden bg-brand-brown">
        <Image
          src="/images/products/tote-lifestyle.png"
          alt="LOST KID lifestyle - model with puffer tote bag"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown to-transparent" />
        {/* Faint quilting texture — same accent used on the Home hero */}
        <div className="quilt-texture absolute inset-0 opacity-[0.05] text-brand-cream" />

        {/* Corner stamp — the signature patch, pinned on like it would be on the real bag */}
        <div className="absolute top-8 right-6 md:right-12 rotate-[-10deg] hidden sm:block">
          <div className="circular-patch w-20 h-20 md:w-24 md:h-24 animate-spin-slow border-brand-cream bg-brand-cream/10 text-brand-cream">
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-center leading-relaxed uppercase">
              EST.<br />2024
            </span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-cream/60 mb-3">
            Our Story
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-bold text-brand-cream leading-none mb-4">
            LOST KID
          </h1>
          <p className="text-brand-cream/70 text-base max-w-md">
            Quilted bags, hand-sewn patches, zero pretension.
          </p>
        </div>
      </section>

      {/* Stitched seam between the hero and the narrative */}
      <div className="stitch-divider text-brand-sand max-w-3xl mx-auto" />

      {/* Brand Narrative */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="prose prose-brand max-w-none text-brand-brown-light leading-relaxed text-[1.05rem]">

          {/* Chapter 01 */}
          <div className="not-prose flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-dashed border-brand-brown/40 text-[11px] font-bold text-brand-brown-light shrink-0">
              01
            </span>
            <span className="font-display text-2xl font-bold text-brand-brown">
              It started with one bag.
            </span>
          </div>
          <p className="mb-6">
            LOST KID was born in a cramped LA apartment, between late nights and
            thrift store runs. The idea was simple: make a tote that felt as
            good to carry as it looked — something sturdy enough for everything
            you throw at it, soft enough to feel like a comfort item.
          </p>
          <p className="mb-10">
            The first prototype was a quilted puffer tote with a circular
            bubble-letter patch sewn on by hand. It went everywhere. People kept
            asking where it was from. So we made more.
          </p>

          {/* Chapter 02 */}
          <div className="not-prose flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-dashed border-brand-brown/40 text-[11px] font-bold text-brand-brown-light shrink-0">
              02
            </span>
            <span className="font-display text-2xl font-bold text-brand-brown">
              Who is the LOST KID?
            </span>
          </div>
          <p className="mb-6">
            The name comes from that feeling of wandering through a city without
            a destination — alive and curious and completely in your own world.
            A lost kid carries everything they need for the day, and they look
            good doing it.
          </p>
          <p className="mb-10">
            We&apos;re not a luxury brand. We&apos;re not streetwear in the
            hype-machine sense either. We sit somewhere in between — a place
            where things are crafted carefully, priced fairly, and designed to
            last longer than a trend cycle.
          </p>

          {/* Pull-quote — reuses the patch component (same class as the hero/home badges)
              as a rectangular stamp instead of a plain blockquote, so it reads as
              part of the same visual family rather than generic prose styling. */}
          <div className="not-prose flex justify-center py-4 mb-10">
            <blockquote className="circular-patch relative block max-w-md rounded-2xl px-8 py-10 -rotate-1">
              <span
                aria-hidden="true"
                className="quote-mark absolute -top-3 left-6 text-6xl text-brand-brown/15 select-none"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-xl md:text-2xl font-semibold leading-snug not-italic">
                We make bags for the ones who need a bag that keeps up.
              </p>
            </blockquote>
          </div>

          {/* Chapter 03 */}
          <div className="not-prose flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-dashed border-brand-brown/40 text-[11px] font-bold text-brand-brown-light shrink-0">
              03
            </span>
            <span className="font-display text-2xl font-bold text-brand-brown">
              What we believe in
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 not-prose pt-2">
            {VALUES.map(({ title, body, icon: Icon, rotate }) => (
              <div
                key={title}
                className={`group relative overflow-hidden bg-brand-cream border-2 border-dashed border-brand-brown/30 rounded-2xl p-5 ${rotate} hover:rotate-0 hover:-translate-y-1 hover:shadow-md transition-all duration-300`}
              >
                {/* Quilting texture surfaces on hover — same move as the Home category cards */}
                <div className="quilt-texture absolute inset-0 text-brand-brown opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500" />
                <Icon className="relative w-5 h-5 text-brand-brown-light mb-3" strokeWidth={1.75} />
                <h3 className="relative font-display text-lg font-semibold text-brand-brown mb-2">
                  {title}
                </h3>
                <p className="relative text-sm text-brand-brown-light leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stitched seam before the Patch feature */}
      <div className="stitch-divider text-brand-sand max-w-7xl mx-auto" />

      {/* Image + Patch */}
      <section className="bg-brand-cream-dark/40 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image
              src="/images/products/tote-detail.png"
              alt="Close-up detail of the LOST KID bubble-letter patch"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* The section is literally about this patch — so show the real thing on the image */}
            <div className="absolute circular-patch w-24 h-24 md:w-28 md:h-28 bottom-4 right-4 animate-spin-slow">
              <div className="circular-patch-inner text-[8px] md:text-[9px] font-bold tracking-widest text-center leading-relaxed uppercase">
                FULL-GRAIN<br />· DEBOSSED ·<br />SIGNATURE
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-4">
              The Signature
            </p>
            <h2 className="font-display text-4xl font-bold text-brand-brown mb-4">
              The Patch
            </h2>
            <p className="text-brand-brown-light leading-relaxed mb-6">
              The circular bubble-letter patch is our signature. It&apos;s
              inspired by old school varsity details and iron-on culture, but
              made from full-grain leather with debossed lettering. It&apos;s
              small enough to be subtle if you want it to be — loud enough to be
              undeniable if you do.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-brown text-brand-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-brand-brown-dark transition-colors"
            >
              Shop the Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}