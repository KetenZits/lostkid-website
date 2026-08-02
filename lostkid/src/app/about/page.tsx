import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind LOST KID — a streetwear-adjacent bag brand born from a love of cozy, bold design.",
};

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden bg-brand-brown">
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-cream/60 mb-3">
            Our Story
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-bold text-brand-cream leading-none">
            LOST KID
          </h1>
        </div>
      </section>

      {/* Brand Narrative */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="prose prose-brand max-w-none space-y-6 text-brand-brown-light leading-relaxed text-[1.05rem]">
          <p>
            <span className="font-display text-2xl font-bold text-brand-brown block mb-3">
              It started with one bag.
            </span>
            LOST KID was born in a cramped LA apartment, between late nights and
            thrift store runs. The idea was simple: make a tote that felt as
            good to carry as it looked — something sturdy enough for everything
            you throw at it, soft enough to feel like a comfort item.
          </p>

          <p>
            The first prototype was a quilted puffer tote with a circular
            bubble-letter patch sewn on by hand. It went everywhere. People kept
            asking where it was from. So we made more.
          </p>

          <p>
            <span className="font-display text-2xl font-bold text-brand-brown block mb-3">
              Who is the LOST KID?
            </span>
            The name comes from that feeling of wandering through a city without
            a destination — alive and curious and completely in your own world.
            A lost kid carries everything they need for the day, and they look
            good doing it.
          </p>

          <p>
            We&apos;re not a luxury brand. We&apos;re not streetwear in the
            hype-machine sense either. We sit somewhere in between — a place
            where things are crafted carefully, priced fairly, and designed to
            last longer than a trend cycle.
          </p>

          <blockquote className="border-l-4 border-brand-brown pl-6 my-10">
            <p className="font-display text-2xl font-semibold text-brand-brown italic leading-snug">
              &ldquo;We make bags for the ones who need a bag that keeps up.&rdquo;
            </p>
          </blockquote>

          <p>
            <span className="font-display text-2xl font-bold text-brand-brown block mb-3">
              What we believe in
            </span>
          </p>

          <div className="grid sm:grid-cols-3 gap-6 not-prose">
            {[
              {
                title: "Quality > Quantity",
                body: "We&apos;d rather make fewer things made right than flood the market with stuff.",
              },
              {
                title: "Play is serious",
                body: "The bubble-letter patch is a joke that&apos;s also a statement. Both things can be true.",
              },
              {
                title: "Built to be carried",
                body: "Every design decision starts with the question: will this work for someone&apos;s actual life?",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-brand-cream-dark/50 rounded-2xl p-5 border border-brand-sand">
                <h3 className="font-display text-lg font-semibold text-brand-brown mb-2">
                  {title}
                </h3>
                <p
                  className="text-sm text-brand-brown-light leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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
