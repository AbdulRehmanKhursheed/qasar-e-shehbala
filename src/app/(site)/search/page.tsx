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
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Search", href: "/search" }]} />

        {/* Search input */}
        <div className="mt-8 mb-8">
          <form action="/search" method="GET">
            <label htmlFor="search-input" className="sr-only">
              Search products
            </label>
            <div className="relative max-w-xl">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search sherwani, prince coat, fabric…"
                autoFocus
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227] focus:ring-offset-0"
              />
            </div>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <>
            <h1 className="text-lg font-semibold text-gray-900 mb-6">
              {products.length > 0
                ? `${products.length} results for "${query}"`
                : `No results for "${query}"`}
            </h1>
            <ProductGrid
              products={products}
              emptyMessage={`No garments found for "${query}". Try a different search or browse our collections.`}
            />
          </>
        ) : (
          <div className="py-20 text-center">
            <Search className="mx-auto h-10 w-10 text-gray-300 mb-4" aria-hidden="true" />
            <p className="text-gray-500">
              Search for sherwani, prince coat, waistcoat, or a specific fabric.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
