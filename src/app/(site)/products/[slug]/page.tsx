import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { formatPKR } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { getProductBySlug } from "@/server/catalog/queries";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const getProduct = getProductBySlug;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  const firstImage = product.images[0];
  return buildMetadata({
    title: product.metaTitle ?? product.name,
    description:
      product.metaDescription ??
      product.description ??
      `Premium made-to-measure ${product.name} by ${SITE.name}. Tailored in Saddar, Rawalpindi.`,
    slug: `products/${slug}`,
    ogImage: firstImage?.r2Key
      ? `${process.env.NEXT_PUBLIC_CF_IMAGES_URL}/${firstImage.r2Key}/w=1200,q=80,format=auto`
      : undefined,
  });
}

// On-demand ISR — revalidate when product is updated via admin webhook
export const revalidate = false; // static until revalidated

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const priceRupees = Number(product.basePriceMinor) / 100;
  const isMTO =
    product.productType === "MADE_TO_ORDER" ||
    product.productType === "BOTH";
  const primaryImage = product.images[0];
  const categoryName = product.category?.name;

  const structuredData = productJsonLd({
    name: product.name,
    description: product.description ?? undefined,
    images: product.images.map(
      (img) =>
        `${process.env.NEXT_PUBLIC_CF_IMAGES_URL}/${img.r2Key}/w=800,q=80,format=auto`
    ),
    priceRupees,
    sku: product.variants[0]?.sku,
    slug,
    inStock: true, // MTO is always available; STOCK would check StockLevel
  });

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Collections", href: "/collections" },
            ...(categoryName
              ? [
                  {
                    name: categoryName,
                    href: `/collections/${product.category?.slug ?? ""}`,
                  },
                ]
              : []),
            { name: product.name, href: `/products/${slug}` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          {/* ── Image gallery ──────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Primary */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
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
                <div className="flex h-full items-center justify-center text-gray-300">
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <Image
                      src={img.r2Key}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="10vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ───────────────────────────────────────── */}
          <div className="flex flex-col">
            {categoryName && (
              <p className="text-xs font-medium uppercase tracking-wider text-jewel">
                {categoryName}
              </p>
            )}
            <h1
              className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {priceRupees > 0 && (
                <p className="text-2xl font-semibold text-gray-900">
                  {formatPKR(Number(product.basePriceMinor))}
                </p>
              )}
              {isMTO && (
                <Badge variant="terracotta">Made to Measure</Badge>
              )}
            </div>

            {/* Lead time */}
            <p className="mt-3 text-sm text-gray-500">
              {isMTO
                ? `Ready in ${SITE.defaultLeadTimeDays} working days · 30–50% advance deposit required`
                : "Ready to wear · COD available up to PKR 10,000"}
            </p>

            {/* Description */}
            {product.description && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-sm leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>
            )}

            {/* Fabric options */}
            {product.fabricOptions.length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Available Fabrics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.fabricOptions.map(({ fabric }) => (
                    <span
                      key={fabric.id}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                    >
                      {fabric.name}
                      {fabric.color ? ` · ${fabric.color}` : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp CTA — the primary conversion action */}
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
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Call Us: {SITE.phone}
              </a>
            </div>

            {/* Policy reassurance */}
            <div className="mt-6 rounded-xl bg-jewel/8 p-4 text-sm text-gray-700 space-y-1.5">
              <p className="font-medium text-gray-900">How it works</p>
              <p>✓ Enquire on WhatsApp — we&apos;ll confirm measurements & fabric</p>
              <p>✓ Pay 30–50% advance deposit to begin tailoring</p>
              <p>✓ Balance collected at final fitting or delivery</p>
              <p>✓ Free alteration within 7 days of collection</p>
            </div>

            {/* Measurement guide link */}
            <p className="mt-4 text-xs text-gray-500">
              Not sure about your measurements?{" "}
              <a
                href="/measurement-guide"
                className="font-medium text-jewel hover:underline"
              >
                See our measurement guide →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
