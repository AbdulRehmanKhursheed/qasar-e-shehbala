import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, Ruler } from "lucide-react";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { formatPKR } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { GeometricMotif } from "@/components/ui/geometric-motif";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { getProductBySlug } from "@/server/catalog/queries";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const firstImage = product.images[0];
  return buildMetadata({
    title: product.metaTitle ?? product.name,
    description:
      product.metaDescription ??
      product.description ??
      `Premium made-to-measure ${product.name} by ${SITE.name}. Tailored in Saddar, Rawalpindi.`,
    slug: `products/${slug}`,
    ogImage: firstImage?.r2Key?.startsWith("http") ? firstImage.r2Key : undefined,
  });
}

export const revalidate = 3600;

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const priceRupees = Number(product.basePriceMinor) / 100;
  const isMTO = product.productType === "MADE_TO_ORDER" || product.productType === "BOTH";
  const primaryImage = product.images[0];
  const categoryName = product.category?.name;

  const structuredData = productJsonLd({
    name: product.name,
    description: product.description ?? undefined,
    images: product.images.map((img) => img.r2Key),
    priceRupees,
    sku: product.variants[0]?.sku,
    slug,
    inStock: true,
  });

  return (
    <div className="min-h-screen bg-parchment">
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Collections", href: "/collections" },
            ...(categoryName
              ? [{ name: categoryName, href: `/collections/${product.category?.slug ?? ""}` }]
              : []),
            { name: product.name, href: `/products/${slug}` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-linen ring-1 ring-sand">
              {primaryImage ? (
                <Image
                  src={primaryImage.r2Key}
                  alt={primaryImage.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <GeometricMotif className="h-40 w-40 text-sand" />
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((img) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl bg-linen ring-1 ring-sand/60">
                    <Image src={img.r2Key} alt={img.alt} fill className="object-cover" sizes="15vw" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {categoryName && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
                {categoryName}
              </p>
            )}
            <h1 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              {priceRupees > 0 && (
                <p className="font-display text-3xl text-charcoal">
                  {formatPKR(Number(product.basePriceMinor))}
                </p>
              )}
              {isMTO && <Badge variant="terracotta">Made to Measure</Badge>}
            </div>

            <p className="mt-3 text-sm text-mist">
              {isMTO
                ? `Ready in ${SITE.defaultLeadTimeDays} working days · 30–50% advance secures your fabric`
                : "Ready to wear · COD available up to PKR 10,000"}
            </p>

            {product.description && (
              <div className="mt-7 border-t border-sand pt-7">
                <p className="text-[15px] leading-8 text-slate">{product.description}</p>
              </div>
            )}

            {product.fabricOptions.length > 0 && (
              <div className="mt-7 border-t border-sand pt-7">
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
                  Available Fabrics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.fabricOptions.map(({ fabric }) => (
                    <span
                      key={fabric.id}
                      className="rounded-full border border-sand bg-cream px-3.5 py-1.5 text-xs text-slate"
                    >
                      {fabric.name}
                      {fabric.color ? ` · ${fabric.color}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <WhatsAppCTA
                productName={product.name}
                sku={product.variants[0]?.sku}
                productUrl={`${SITE.url}/products/${slug}`}
                productId={product.id}
                variantId={product.variants[0]?.id}
              />
              <a
                href={`tel:${SITE.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-sand bg-cream px-6 py-3.5 text-sm font-medium text-slate transition-colors hover:border-terracotta hover:text-terracotta"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call us: {SITE.phone}
              </a>
            </div>

            {/* How it works */}
            <div className="mt-7 rounded-2xl border border-sand bg-cream p-5">
              <p className="font-display text-lg text-charcoal">How your order works</p>
              <ul className="mt-3 space-y-2 text-[13px] text-slate">
                {[
                  "Enquire on WhatsApp — we confirm measurements & fabric",
                  "Pay a 30–50% advance to begin tailoring",
                  "Balance collected at the final fitting or on delivery",
                  "Free alteration within 7 days of collection",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/measurement-guide"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-terracotta hover:underline"
            >
              <Ruler className="h-4 w-4" aria-hidden="true" />
              Not sure of your size? See the measurement guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
