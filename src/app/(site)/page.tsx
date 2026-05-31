import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Star, Scissors, Ruler } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, GROOM_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { GeometricMotif } from "@/components/ui/geometric-motif";

export const metadata: Metadata = buildMetadata();
export const revalidate = 3600;

const TRUST_SIGNALS = [
  { icon: Star, title: "Since 1999", description: "Over 25 years crafting groom wear in Saddar" },
  { icon: Scissors, title: "Master Karigars", description: "Tailors who have fitted hundreds of grooms" },
  { icon: Ruler, title: "Made to Measure", description: "Cut and stitched to your exact measurements" },
  { icon: Clock, title: `${SITE.defaultLeadTimeDays}-Day Delivery`, description: "Sherwani and prince coats in 10–15 working days" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Browse & Enquire", desc: "Pick a design and tap Order on WhatsApp" },
  { step: "02", title: "Measurements", desc: "Visit us in Saddar or share measurements at home" },
  { step: "03", title: "Deposit & Tailoring", desc: "30–50% advance locks your fabric. Delivery in 15 days." },
  { step: "04", title: "Fitting & Collection", desc: "Try on, approve, take home. Balance on delivery." },
];

const POLICY_POINTS = [
  "30–50% advance secures your fabric",
  "Balance paid at final fitting",
  "Alterations within 7 days",
  "COD on ready-to-wear under PKR 10,000",
];

export default function HomePage() {
  const enquiryUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "Assalam o Alaikum! I would like to enquire about groom wear."
  )}`;
  const customUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "Assalam o Alaikum! I want to discuss a custom sherwani / groom package."
  )}`;

  return (
    <>
      <section className="bg-mehfil grain relative overflow-hidden" aria-label="Hero">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[88vh] grid-cols-1 items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <div className="animate-rise">
                <Badge variant="onDark">Rawalpindi · Saddar · Est. {SITE.established}</Badge>
              </div>
              <h1 className="animate-rise mt-7 font-display text-[2.7rem] leading-[1.04] text-ivory sm:text-6xl lg:text-7xl" style={{ animationDelay: "80ms" }}>
                Dressed for the{" "}
                <span className="text-gradient-jewel">grandest</span> day of your life
              </h1>
              <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ivory/65" style={{ animationDelay: "160ms" }}>
                Made-to-measure sherwani, prince coats, and waistcoats — cut by hand by
                master karigars in Saddar, Rawalpindi.{" "}
                <span className="text-ivory/90">Dulha ki sherwani, bilkul aap ke naap ki.</span>
              </p>

              <div className="animate-rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "240ms" }}>
                <Link
                  href="/collections/groom-wear"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-royal via-violet to-jewel px-7 py-3.5 text-base font-medium text-ivory transition-all hover:brightness-110"
                >
                  Explore Groom Wear
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-7 py-3.5 text-base font-medium text-ivory transition-colors hover:bg-ivory/10"
                >
                  <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>

            <div className="animate-rise relative" style={{ animationDelay: "200ms" }}>
              <div className="ring-hairline relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-soft/60">
                <GeometricMotif className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 text-violet/25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <span className="font-display text-2xl text-ivory/40">Qasr-e-Shehbala</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-ivory/30">Hero garment photography</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-ivory/15 bg-ink-deep/80 px-5 py-4 backdrop-blur sm:block">
                <p className="font-display text-2xl text-ivory">25+</p>
                <p className="text-xs uppercase tracking-wider text-ivory/50">Years of craft</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ivory-line bg-ivory py-14" aria-label="Why us">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TRUST_SIGNALS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-jewel/10 text-jewel">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="font-display text-lg text-ink">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="categories-heading"
            eyebrow="The Collections"
            title="Dressed for every rasm"
            subtitle="From the barat to the walima — we dress the groom for every occasion."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GROOM_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-ink"
              >
                <div className="bg-mehfil-soft absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  <GeometricMotif className="absolute left-1/2 top-1/3 h-32 w-32 -translate-x-1/2 text-ivory/10" />
                </div>
                <div className="relative z-10 bg-gradient-to-t from-ink-deep via-ink-deep/50 to-transparent p-5 pt-20">
                  <p className="text-xs uppercase tracking-[0.2em] text-rose">{cat.romanUrdu}</p>
                  <p className="mt-1 font-display text-xl text-ivory">{cat.label}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-ivory/60 transition-colors group-hover:text-ivory">
                    View collection
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mehfil grain relative py-20" aria-labelledby="how-heading">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <GeometricMotif className="mx-auto mb-8 h-10 w-10 text-brass/60" />
          <p className="text-sm uppercase tracking-[0.25em] text-rose">How it works</p>
          <h2 id="how-heading" className="mt-4 font-display text-4xl text-ivory">
            Your perfect sherwani, in four steps
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-8 text-left sm:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step}>
                <span className="font-display text-3xl text-gradient-jewel">{step}</span>
                <p className="mt-3 text-sm font-medium text-ivory">{title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ivory/55">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={customUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#1ebe5d]"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              Start on WhatsApp
            </a>
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center rounded-full border border-ivory/25 px-8 py-3.5 text-base font-medium text-ivory transition-colors hover:bg-ivory/10"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory-soft py-10" aria-label="Policy assurances">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-ink/70">
            {POLICY_POINTS.map((point) => (
              <span key={point} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-jewel" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ id, eyebrow, title, subtitle }: { id?: string; eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-jewel">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-4xl text-ink">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-ink/55">{subtitle}</p>}
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
    </svg>
  );
}
