import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, Truck, ShieldCheck } from "lucide-react";
import { buildMetadata, productJsonLd, faqJsonLd } from "@/lib/seo";
import { formatPKR } from "@/lib/utils";
import { SITE, CATEGORY_FAQS, DEFAULT_FAQS } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TrustBar } from "@/components/ui/trust-bar";
import { GeometricMotif } from "@/components/ui/geometric-motif";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { StickyCta } from "@/components/product/sticky-cta";
import { ProductSpecs } from "@/components/product/product-specs";
import { SizeChart } from "@/components/product/size-chart";
import { ProductCard } from "@/components/product/product-card";
import { getProductBySlug, getRelatedProducts } from "@/server/catalog/queries";

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
  const related = await getRelatedProducts(product.category?.slug, product.id);

  const faqs = (product.category && CATEGORY_FAQS[product.category.slug]) || DEFAULT_FAQS;

  const structuredData: Record<string, unknown>[] = [
    productJsonLd({
      name: product.name,
      description: product.description ?? undefined,
      images: product.images.map((img) => img.r2Key),
      priceRupees,
      sku: product.variants[0]?.sku,
      slug,
      inStock: true,
    }),
    faqJsonLd(faqs),
  ];

  return (
    <div className="min-h-screen bg-parchment">
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-12">
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

            <p className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-mist">
              <ShieldCheck className="h-4 w-4 text-sage" aria-hidden="true" />
              No advance lost — your deposit is held against your order
            </p>

            {/* Specifications */}
            <div className="mt-8 border-t border-sand pt-7">
              <h2 className="mb-3 font-display text-xl text-charcoal">Details</h2>
              <ProductSpecs product={product} isMTO={isMTO} />
            </div>

            {/* Size guide */}
            <div className="mt-6">
              <SizeChart />
            </div>

            {/* How it works */}
            <div className="mt-6 rounded-2xl border border-sand bg-cream p-5">
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

            {/* Delivery & returns */}
            <div className="mt-4 flex gap-3 rounded-2xl border border-sand bg-cream p-5">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" aria-hidden="true" />
              <div className="text-[13px] leading-6 text-slate">
                <p className="font-semibold text-charcoal">Delivery & fitting</p>
                <p className="mt-1">
                  Collect in-store in Saddar, Rawalpindi, or have it couriered nationwide once
                  ready. Send your measurements on WhatsApp if you can&apos;t visit — out-of-city
                  grooms order with us every season. One free alteration within 7 days of collection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust */}
        <TrustBar className="mt-14" />

        {/* FAQ */}
        <section className="mt-16 border-t border-sand pt-10" aria-labelledby="product-faq">
          <h2 id="product-faq" className="font-display text-2xl font-light text-charcoal sm:text-3xl">
            Questions, answered
          </h2>
          <dl className="mt-6 max-w-3xl divide-y divide-sand">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <dt className="text-[15px] font-semibold text-charcoal">{faq.question}</dt>
                <dd className="mt-2 text-[14px] leading-7 text-slate">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-2xl font-light text-charcoal sm:text-3xl">
              You may also like
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <StickyCta
        productName={product.name}
        sku={product.variants[0]?.sku}
        productUrl={`${SITE.url}/products/${slug}`}
        productId={product.id}
        variantId={product.variants[0]?.id}
        priceMinor={product.basePriceMinor}
        isMTO={isMTO}
      />
    </div>
  );
}
