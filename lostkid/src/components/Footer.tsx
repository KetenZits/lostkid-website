"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Puffer Totes", href: "/shop?category=bags" },
    { label: "Accessories", href: "/shop?category=accessories" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
  ],
  Help: [
    { label: "Shipping & Returns", href: "/contact" },
    { label: "Size Guide", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/contact" },
  ],
  Brand: [
    { label: "About LOST KID", href: "/about" },
    { label: "Our Story", href: "/about" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <footer className="bg-brand-brown text-brand-cream mt-auto">
      {/* Top strip: Newsletter */}
      <div className="border-b border-brand-brown-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-display text-2xl md:text-3xl font-semibold mb-1">
                Stay in the loop.
              </p>
              <p className="text-brand-cream/60 text-sm">
                New drops, restocks, and cozy vibes — straight to your inbox.
              </p>
            </div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-accent-sage font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-accent-sage/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-accent-sage" />
                </span>
                You&apos;re on the list!
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 w-full md:w-auto"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 md:w-64 bg-brand-brown-light/30 text-brand-cream placeholder:text-brand-cream/40 border border-brand-brown-light/40 rounded-full px-4 py-2.5 text-sm outline-none focus-visible:border-brand-cream/60 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-cream text-brand-brown rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-brand-sand transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-3xl font-bold mb-3">LOST KID</p>
            <p className="text-brand-cream/60 text-sm leading-relaxed mb-5">
              Original quilted puffer bags & accessories. Made for the ones who
              carry their whole world with them.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-brand-brown-light/40 flex items-center justify-center hover:border-brand-cream/60 transition-colors"
                aria-label="LOST KID on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-cream/40 mb-4">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-brand-cream/70 hover:text-brand-cream transition-colors group flex items-center gap-1"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-brown-light/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/40">
            © {new Date().getFullYear()} LOST KID. All rights reserved.
          </p>
          <p className="text-xs text-brand-cream/40">
            Portfolio demo project — Develop By Thanapont.
          </p>
        </div>
      </div>
    </footer>
  );
}
