"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close mobile menu on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setMenuOpen(false);
    setPrevPathname(pathname);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-cream/95 backdrop-blur-md shadow-[0_1px_0_rgba(74,52,40,0.1)]"
            : "bg-brand-cream"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl font-bold text-brand-brown tracking-tight hover:opacity-80 transition-opacity"
              aria-label="LOST KID — Home"
            >
              LOST KID
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium tracking-wide transition-colors relative group ${
                    pathname === href
                      ? "text-brand-brown"
                      : "text-brand-brown-light hover:text-brand-brown"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-brand-brown transition-all duration-200 ${
                      pathname === href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Icon Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-brand-cream-dark transition-colors"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 rounded-full hover:bg-brand-cream-dark transition-colors"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-full hover:bg-brand-cream-dark transition-colors"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-brown text-brand-cream text-[10px] font-semibold flex items-center justify-center"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-brand-cream-dark transition-colors"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-brand-sand"
            >
              <nav className="flex flex-col px-4 py-6 gap-4" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-lg font-medium py-2 transition-colors ${
                      pathname === href
                        ? "text-brand-brown"
                        : "text-brand-brown-light"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  className="text-lg font-medium py-2 text-brand-brown-light"
                >
                  Wishlist
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-brown/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 left-0 right-0 bg-brand-cream p-4 shadow-xl"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="max-w-2xl mx-auto flex items-center gap-3"
              >
                <Search className="w-5 h-5 text-brand-brown-light shrink-0" />
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search bags, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-lg font-medium text-brand-brown placeholder:text-brand-brown-light/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-full hover:bg-brand-cream-dark transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
