import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { GROOM_CATEGORIES } from "@/lib/constants";
import { getCategoryBySlug, getFabrics, getProducts } from "@/server/catalog/queries";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FilterSidebar } from "@/components/collection/filter-sidebar";
import { ProductGrid } from "@/components/product/product-grid";
import type { FilterState } from "@/types";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export function generateStaticParams() {
  return GROOM_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const fallback = GROOM_CATEGORIES.find((c) => c.slug === slug);
  const name = category?.name ?? fallback?.label;
  if (!name) return {};

  return buildMetadata({
    title: name,
    description:
      category?.metaDescription ??
      `Browse our made-to-measure ${name.toLowerCase()} collection. Each piece tailored in Saddar, Rawalpindi by master karigars.`,
    slug: `collections/${slug}`,
  });
}

export const revalidate = 3600;

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const staticCategory = GROOM_CATEGORIES.find((c) => c.slug === slug);
  if (!staticCategory) notFound();

  const filters: FilterState = {
    category: slug,
    fabric: sp.fabric,
    sort: sp.sort as FilterState["sort"],
    productType: sp.type as FilterState["productType"],
  };

  const [category, products, fabrics] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts(filters),
    getFabrics(),
  ]);

  const name = category?.name ?? staticCategory.label;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Collections", href: "/collections" },
            { name, href: `/collections/${slug}` },
          ]}
        />

        <header className="mt-8 mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-jewel">
            {staticCategory.romanUrdu}
          </p>
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {name}
          </h1>
          {category?.introCopy && (
            <p className="mt-3 max-w-2xl text-gray-500 leading-7">{category.introCopy}</p>
          )}
        </header>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="hidden w-56 shrink-0 lg:block">
            <FilterSidebar fabrics={fabrics} currentFilters={filters} />
          </div>

          <div className="flex-1">
            <p className="mb-4 text-sm text-gray-500">
              {products.length} {products.length === 1 ? "garment" : "garments"}
            </p>
            <ProductGrid
              products={products}
              emptyMessage="This collection is being updated. Message us on WhatsApp to see the latest pieces."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
