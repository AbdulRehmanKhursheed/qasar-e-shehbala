import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { SITE, LOCAL_AREAS, OCCASIONS, DEFAULT_FAQS } from "@/lib/constants";
import { getFeaturedProducts } from "@/server/catalog/queries";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TrustBar } from "@/components/ui/trust-bar";
import { ProductCard } from "@/components/product/product-card";
import { JsonLd } from "@/components/seo/json-ld";

interface AreaPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return LOCAL_AREAS.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { city } = await params;
  const area = LOCAL_AREAS.find((a) => a.slug === city);
  if (!area) return {};

  return buildMetadata({
    title: `Sherwani Tailor in ${area.city} — Made to Measure`,
    description: area.intro,
    slug: `groom-wear/${city}`,
  });
}

export const revalidate = 86400;

export default async function AreaPage({ params }: AreaPageProps) {
  const { city } = await params;
  const area = LOCAL_AREAS.find((a) => a.slug === city);
  if (!area) notFound();

  const products = await getFeaturedProducts(4);

  const localFaqs = [
    {
      question: `Do you make groom wear for ${area.city}?`,
      answer: `Yes. ${area.intro}`,
    },
    ...DEFAULT_FAQS,
  ];

  return (
    <div className="min-h-screen bg-parchment">
      <JsonLd data={faqJsonLd(localFaqs)} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Groom Wear", href: "/collections" },
            { name: area.city, href: `/groom-wear/${city}` },
          ]}
        />

        <header className="mt-10 mb-10 max-w-3xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
            {area.city} · Saddar, Rawalpindi · Est. {SITE.established}
          </p>
          <h1 className="font-display text-4xl font-light leading-tight text-charcoal sm:text-5xl">
            {area.headline}
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-mist">{area.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Assalam o Alaikum! I'm in ${area.city} and would like to enquire about groom wear.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
            >
              Enquire on WhatsApp
            </a>
            <a
              href={SITE.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-6 py-3 text-sm font-medium text-slate transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Directions to Saddar
            </a>
          </div>
        </header>

        <TrustBar />

        <p className="mt-10 max-w-3xl text-[15px] leading-8 text-slate">{area.body}</p>

        {/* Featured */}
        {products.length > 0 && (
          <section className="mt-12" aria-labelledby="area-featured">
            <h2 id="area-featured" className="font-display text-2xl font-light text-charcoal sm:text-3xl">
              Popular with {area.city} grooms
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Occasions */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-light text-charcoal">Dressed for every function</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {OCCASIONS.map((occasion) => (
              <Link
                key={occasion.slug}
                href={`/occasions/${occasion.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-4 py-2 text-sm text-slate transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {occasion.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        {/* Visit / NAP */}
        <section className="mt-14 rounded-2xl border border-sand bg-cream p-6 sm:p-8">
          <h2 className="font-display text-2xl font-light text-charcoal">Visit our Saddar atelier</h2>
          <div className="mt-4 space-y-2.5 text-sm text-slate">
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              {SITE.address.full}
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              <a href={`tel:${SITE.phone}`} className="hover:text-terracotta">{SITE.phone}</a>
            </p>
            <p className="text-mist">{SITE.openingHours}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14 border-t border-sand pt-10" aria-labelledby="area-faq">
          <h2 id="area-faq" className="font-display text-2xl font-light text-charcoal">
            {area.city} groom wear — questions
          </h2>
          <dl className="mt-6 max-w-3xl divide-y divide-sand">
            {localFaqs.map((faq) => (
              <div key={faq.question} className="py-4">
                <dt className="text-[15px] font-semibold text-charcoal">{faq.question}</dt>
                <dd className="mt-2 text-[14px] leading-7 text-slate">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
