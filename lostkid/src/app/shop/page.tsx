"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

const ALL_COLORS = ["Navy", "Brown", "Pink", "Cream", "Sage", "Cocoa"];
const COLOR_HEX: Record<string, string> = {
  Navy: "#1E2D42",
  Brown: "#4A3428",
  Pink: "#E8C1C5",
  Cream: "#F7F2EA",
  Sage: "#9AB09E",
  Cocoa: "#5C3D2E",
};
// Swatches light enough that a white checkmark won't read well on them
const LIGHT_COLORS = new Set(["Cream", "Pink"]);

const PRICE_MIN = 20;
const PRICE_MAX = 200;

type SortOption = "newest" | "price-asc" | "price-desc" | "bestselling";

interface FilterPanelProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedColors: string[];
  toggleColor: (color: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const FilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  selectedColors,
  toggleColor,
  maxPrice,
  setMaxPrice,
  hasActiveFilters,
  clearFilters,
}: FilterPanelProps) => {
  const pricePercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-3">
          Category
        </p>
        <div className="space-y-0.5">
          {[
            { value: "all", label: "All Products" },
            { value: "bags", label: "Bags & Totes" },
            { value: "accessories", label: "Accessories" },
          ].map(({ value, label }) => {
            const active = selectedCategory === value;
            return (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                aria-pressed={active}
                className={`flex w-full items-center text-left text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${active
                    ? "font-semibold text-brand-brown border-brand-brown"
                    : "text-brand-brown-light border-transparent hover:text-brand-brown hover:border-brand-sand"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-brand-sand/60" />

      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-3">
          Color
        </p>
        <div className="flex flex-wrap gap-2.5">
          {ALL_COLORS.map((color) => {
            const active = selectedColors.includes(color);
            return (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                title={color}
                className={`relative w-8 h-8 rounded-full transition-all duration-200 ${active
                    ? "ring-2 ring-brand-brown ring-offset-2 ring-offset-brand-cream scale-105"
                    : "ring-1 ring-black/10 hover:ring-brand-brown-light hover:scale-105"
                  }`}
                style={{ backgroundColor: COLOR_HEX[color] }}
                aria-label={color}
                aria-pressed={active}
              >
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Check
                        className="w-4 h-4 drop-shadow"
                        strokeWidth={3}
                        color={LIGHT_COLORS.has(color) ? "#4A3428" : "#F7F2EA"}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-brand-sand/60" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light">
            Max Price
          </p>
          <span className="relative overflow-hidden text-sm font-semibold text-brand-brown tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={maxPrice}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="inline-block"
              >
                ${maxPrice}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <div className="relative pt-1">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-brand-brown relative z-10"
            aria-label="Maximum price filter"
          />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-brown pointer-events-none transition-all duration-150"
            style={{ left: `calc(${pricePercent}% - 3px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-brand-brown-light mt-1">
          <span>${PRICE_MIN}</span>
          <span>${PRICE_MAX}</span>
        </div>
      </div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-brand-brown-light hover:text-brand-brown transition-colors overflow-hidden"
          >
            <X className="w-3.5 h-3.5 shrink-0" /> Clear all filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ShopPage() {
  const allProducts = getAllProducts();

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleColor = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedCategory("all");
    setMaxPrice(200);
    setSortBy("newest");
  };

  const hasActiveFilters =
    selectedColors.length > 0 || selectedCategory !== "all" || maxPrice < 200;

  const activeFilterCount =
    selectedColors.length +
    (selectedCategory !== "all" ? 1 : 0) +
    (maxPrice < 200 ? 1 : 0);

  const filtered = useMemo(() => {
    let result: Product[] = allProducts;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedColors.includes(v.color))
      );
    }

    result = result.filter((p) => p.price <= maxPrice);

    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "bestselling")
        return Number(b.isBestSeller) - Number(a.isBestSeller);
      // newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [allProducts, selectedColors, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light mb-2">
          Full Collection
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-brown">
            Shop All
          </h1>
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light bg-brand-cream-dark/40 rounded-full px-3.5 py-1.5">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </motion.div>

      <div className="flex gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
          <FilterPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4 pb-4 border-b border-brand-sand/60">
            {/* Active color filters */}
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {selectedColors.map((c) => (
                  <motion.button
                    key={c}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => toggleColor(c)}
                    className="flex items-center gap-1.5 bg-brand-cream-dark text-brand-brown text-xs font-medium rounded-full px-3 py-1 hover:bg-brand-sand transition-colors"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: COLOR_HEX[c] }}
                    />
                    {c} <X className="w-3.5 h-3.5" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              {/* Mobile filter button */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-brand-sand rounded-full px-4 py-2 text-sm font-medium text-brand-brown hover:bg-brand-cream-dark transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-4 h-4 rounded-full bg-brand-brown text-brand-cream text-[10px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none border border-brand-sand rounded-full pl-4 pr-9 py-2 text-sm font-medium text-brand-brown bg-brand-cream cursor-pointer outline-none hover:bg-brand-cream-dark/30 focus-visible:ring-2 focus-visible:ring-brand-brown/20 transition-colors"
                  aria-label="Sort products"
                >
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-brand-brown-light absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <motion.div
                initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 16 }}
                className="circular-patch w-24 h-24 mb-6 text-sm"
              >
                <div className="circular-patch-inner">0</div>
              </motion.div>
              <h2 className="font-display text-2xl font-semibold text-brand-brown mb-2">
                No products found
              </h2>
              <p className="text-brand-brown-light mb-6">
                Try adjusting your filters.
              </p>
              <button
                onClick={clearFilters}
                className="bg-brand-brown text-brand-cream rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-brand-brown-dark transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
              layout
            >
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} priority={i < 2} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-brand-brown/40 backdrop-blur-sm lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 z-[60] w-72 bg-brand-cream p-6 shadow-xl overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <p className="font-display text-xl font-semibold text-brand-brown">
                  Filters
                </p>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-brand-cream-dark transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedColors={selectedColors}
                toggleColor={toggleColor}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />
              {hasActiveFilters && (
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full mt-8 bg-brand-brown text-brand-cream rounded-full py-3 text-sm font-semibold hover:bg-brand-brown-dark transition-colors"
                >
                  Show {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}