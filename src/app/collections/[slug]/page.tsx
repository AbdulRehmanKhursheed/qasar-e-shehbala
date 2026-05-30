import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { GROOM_CATEGORIES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FilterSidebar } from "@/components/collection/filter-sidebar";
import { ProductGrid } from "@/components/product/product-grid";
import type { Fabric, FilterState, Product } from "@/types";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

// Pre-generate known category routes at build time
export function generateStaticParams() {
  return GROOM_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = GROOM_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return buildMetadata({
    title: category.label,
    description: `Browse our made-to-measure ${category.label.toLowerCase()} collection. Each piece tailored in Saddar, Rawalpindi by master karigars. ${category.romanUrdu} banwana, bilkul aap ke naap ka.`,
    slug: `collections/${slug}`,
  });
}

export const revalidate = 3600;

// In Phase 1 these will come from the DB via a data layer.
// For now they return empty arrays so the page builds and renders correctly.
async function getCollectionData(slug: string): Promise<{
  products: Product[];
  fabrics: Fabric[];
  categoryName: string;
  categoryDescription?: string;
}> {
  const category = GROOM_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { products: [], fabrics: [], categoryName: "" };

  // TODO: replace with Prisma queries via server-side data layer
  return {
    products: [],
    fabrics: [],
    categoryName: category.label,
    categoryDescription: undefined,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = GROOM_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const { products, fabrics, categoryName, categoryDescription } =
    await getCollectionData(slug);

  const filters: FilterState = {
    category: slug,
    fabric: sp.fabric,
    sort: sp.sort as FilterState["sort"],
    productType: sp.type as FilterState["productType"],
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Collections", href: "/collections" },
            { name: categoryName, href: `/collections/${slug}` },
          ]}
        />

        {/* Header */}
        <div className="mt-8 mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#c9a227] mb-2">
            {category.romanUrdu}
          </p>
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {categoryName}
          </h1>
          {categoryDescription && (
            <p className="mt-3 max-w-2xl text-gray-500">{categoryDescription}</p>
          )}
        </div>

        {/* Layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters — hidden on mobile by default, shown via sheet on small screens */}
          <div className="hidden w-56 shrink-0 lg:block">
            <FilterSidebar fabrics={fabrics} currentFilters={filters} />
          </div>

          {/* Products */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-gray-500">
              {products.length > 0
                ? `${products.length} garments`
                : "Garments loading…"}
            </p>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
