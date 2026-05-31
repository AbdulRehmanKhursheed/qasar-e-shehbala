import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { OCCASIONS } from "@/lib/constants";
import { getProducts } from "@/server/catalog/queries";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { GeometricMotif } from "@/components/ui/geometric-motif";
import type { Product } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Lookbook — Groom Wear by Occasion",
  description:
    "A visual lookbook of sherwani, prince coat and waistcoat looks styled for the barat, walima, mehndi and nikah — each made to measure in Saddar, Rawalpindi.",
  slug: "lookbook",
});

export const revalidate = 3600;

export default async function LookbookPage() {
  const products = await getProducts();

  const sections = OCCASIONS.map((occasion) => ({
    occasion,
    items: products
      .filter((p) => p.category && (occasion.categories as readonly string[]).includes(p.category.slug))
      .slice(0, 4),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Lookbook", href: "/lookbook" }]} />

        <header className="mt-10 mb-14 max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
            Lookbook
          </p>
          <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
            Styled for the occasion
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-mist">
            A visual guide to dressing the groom across every function — barat, walima, mehndi and
            nikah. Every piece below is made to measure in our Saddar atelier. Tap any look to enquire.
          </p>
        </header>

        <div className="space-y-20">
          {sections.map(({ occasion, items }) => (
            <section key={occasion.slug} aria-labelledby={`look-${occasion.slug}`}>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
                    {occasion.romanUrdu}
                  </p>
                  <h2 id={`look-${occasion.slug}`} className="font-display text-3xl font-light text-charcoal">
                    {occasion.label}
                  </h2>
                </div>
                <Link
                  href={`/occasions/${occasion.slug}`}
                  className="shrink-0 text-[13px] font-medium text-terracotta hover:underline"
                >
                  Shop {occasion.label} →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {items.map((product, i) => (
                  <LookCard key={product.id} product={product} feature={i === 0} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function LookCard({ product, feature }: { product: Product; feature?: boolean }) {
  const image = product.images[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group relative overflow-hidden rounded-2xl bg-linen ring-1 ring-sand ${
        feature ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`relative ${feature ? "aspect-square md:aspect-[4/5]" : "aspect-[3/4]"}`}>
        {image ? (
          <Image
            src={image.r2Key}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={feature ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <GeometricMotif className="h-20 w-20 text-sand" />
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background: "linear-gradient(to top, rgba(26,20,16,0.7) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-lg leading-tight text-cream">{product.name}</p>
          <p className="mt-0.5 text-[12px] text-cream/70 transition-colors group-hover:text-cream">
            View piece →
          </p>
        </div>
      </div>
    </Link>
  );
}
