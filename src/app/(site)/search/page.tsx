import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductGrid } from "@/components/product/product-grid";
import { Search } from "lucide-react";
import { searchProducts } from "@/server/catalog/queries";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return buildMetadata({
    title: q ? `Search: "${q}"` : "Search",
    description: "Search our collection of premium made-to-measure groom wear.",
    slug: q ? `search?q=${encodeURIComponent(q)}` : "search",
    noindex: true, // search result pages should not be indexed
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const products = await searchProducts(query);

  return (
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Search", href: "/search" }]} />

        {/* Search input */}
        <div className="mt-8 mb-10">
          <form action="/search" method="GET">
            <label htmlFor="search-input" className="sr-only">
              Search products
            </label>
            <div className="relative max-w-xl">
              <Search
                className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-mist"
                aria-hidden="true"
              />
              <input
                id="search-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search sherwani, prince coat, fabric…"
                autoFocus
                className="w-full rounded-xl border border-sand bg-cream py-3 pl-10 pr-4 text-sm text-charcoal placeholder-mist transition-colors focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              />
            </div>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <>
            <h1 className="mb-6 font-display text-2xl font-light text-charcoal">
              {products.length > 0
                ? `${products.length} results for “${query}”`
                : `No results for “${query}”`}
            </h1>
            <ProductGrid
              products={products}
              emptyMessage={`No garments found for "${query}". Try a different search or browse our collections.`}
            />
          </>
        ) : (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-sand" aria-hidden="true" />
            <p className="text-mist">
              Search for sherwani, prince coat, waistcoat, or a specific fabric.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
