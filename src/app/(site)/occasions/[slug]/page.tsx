import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { OCCASIONS } from "@/lib/constants";
import { getProductsByCategories } from "@/server/catalog/queries";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductGrid } from "@/components/product/product-grid";
import { TrustBar } from "@/components/ui/trust-bar";

interface OccasionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return OCCASIONS.map((occasion) => ({ slug: occasion.slug }));
}

export async function generateMetadata({ params }: OccasionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const occasion = OCCASIONS.find((o) => o.slug === slug);
  if (!occasion) return {};

  return buildMetadata({
    title: `${occasion.label} Groom Wear`,
    description: occasion.intro,
    slug: `occasions/${slug}`,
  });
}

export const revalidate = 3600;

export default async function OccasionPage({ params }: OccasionPageProps) {
  const { slug } = await params;
  const occasion = OCCASIONS.find((o) => o.slug === slug);
  if (!occasion) notFound();

  const products = await getProductsByCategories([...occasion.categories]);

  return (
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Occasions", href: "/occasions" },
            { name: occasion.label, href: `/occasions/${slug}` },
          ]}
        />

        <header className="mt-10 mb-10 max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
            {occasion.romanUrdu}
          </p>
          <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
            {occasion.label} Groom Wear
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-mist">{occasion.intro}</p>
        </header>

        <ProductGrid
          products={products}
          emptyMessage="New pieces for this occasion are on the way. Message us on WhatsApp to see what's ready now."
        />

        <TrustBar className="mt-14" />

        <section className="mt-14 border-t border-sand pt-10">
          <p className="max-w-3xl text-[14px] leading-8 text-slate">{occasion.seo}</p>
        </section>
      </div>
    </div>
  );
}
