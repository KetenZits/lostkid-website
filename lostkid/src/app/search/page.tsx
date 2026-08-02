"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = query ? searchProducts(query) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-5xl font-bold text-brand-brown mb-8">Search</h1>

      {/* Search input */}
      <form
        action="/search"
        className="flex gap-2 max-w-xl mb-12"
      >
        <label htmlFor="search-input" className="sr-only">Search products</label>
        <div className="flex-1 flex items-center gap-3 border border-brand-sand rounded-full px-5 py-3 focus-within:border-brand-brown transition-colors">
          <Search className="w-4 h-4 text-brand-brown-light shrink-0" />
          <input
            id="search-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search bags, accessories..."
            className="flex-1 bg-transparent text-sm text-brand-brown placeholder:text-brand-brown-light/50 outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-brand-brown text-brand-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-brand-brown-dark transition-colors"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {query ? (
        results.length > 0 ? (
          <>
            <p className="text-sm text-brand-brown-light mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
              <span className="font-semibold text-brand-brown">{query}</span>&rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center text-center py-16">
            <div className="circular-patch w-24 h-24 mb-6 text-2xl">
              <div className="circular-patch-inner">?</div>
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-brown mb-2">
              No results for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-brand-brown-light mb-8 max-w-sm">
              Try a different search term, or browse everything in the shop.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              {["tote", "puffer", "bag", "cap"].map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${suggestion}`}
                  className="border border-brand-sand rounded-full px-4 py-2 text-sm font-medium hover:bg-brand-cream-dark transition-colors"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <p className="text-brand-brown-light">
            Start typing above to search our collection.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
