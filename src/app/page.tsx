import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Star, Scissors, Ruler } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, GROOM_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata();

// ISR — revalidate the homepage every hour
export const revalidate = 3600;

const TRUST_SIGNALS = [
  {
    icon: Star,
    title: "Since 1999",
    description: "Over 25 years of crafting premium groom wear in Saddar",
  },
  {
    icon: Scissors,
    title: "Master Karigars",
    description: "Experienced tailors who have fitted hundreds of grooms",
  },
  {
    icon: Ruler,
    title: "Made to Measure",
    description: "Every garment cut and stitched to your exact measurements",
  },
  {
    icon: Clock,
    title: `${SITE.defaultLeadTimeDays}-Day Delivery`,
    description: "Sherwani and prince coats ready in 10–15 working days",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Browse & Enquire", desc: "Pick a design and tap Order on WhatsApp" },
  { step: "02", title: "Measurements", desc: "Visit us in Saddar or share measurements at home" },
  { step: "03", title: "Deposit & Tailoring", desc: "30–50% advance locks your fabric. Delivery in 15 days." },
  { step: "04", title: "Fitting & Collection", desc: "Try on, approve, take home. Balance on delivery." },
];

const POLICY_POINTS = [
  "✓ 30–50% advance deposit secures your fabric",
  "✓ Balance paid at final fitting or collection",
  "✓ Alterations included within 7 days",
  "✓ COD available on ready-to-wear under PKR 10,000",
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
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#0f0f0f]"
        aria-label="Hero"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[85vh] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2">
            {/* Copy */}
            <div className="relative z-10">
              <Badge variant="gold" className="mb-6">
                Rawalpindi · Saddar · Est. {SITE.established}
              </Badge>
              <h1
                className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Dressed for the{" "}
                <span className="text-[#c9a227]">Greatest</span>{" "}
                Day of Your Life
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                Premium made-to-measure sherwani, prince coats, and waistcoats —
                crafted by master karigars in Saddar, Rawalpindi.{" "}
                <em className="not-italic font-medium text-gray-300">
                  Dulha ki sherwani, bilkul aap ke naap ki.
                </em>
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/collections/groom-wear"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#a07d1a] transition-colors"
                >
                  Explore Groom Wear
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <WhatsAppIcon />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>

            {/* Image placeholder — replace with real garment photography */}
            <div className="relative aspect-[3/4] max-h-[600px] overflow-hidden rounded-2xl bg-white/5">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <Scissors className="h-12 w-12 text-white/20" aria-hidden="true" />
                <p className="text-xs text-white/30">Hero garment photography goes here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(201,162,39,0.15), transparent)",
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── Trust signals ─────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-12" aria-label="Why us">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TRUST_SIGNALS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                  <Icon className="h-5 w-5 text-[#c9a227]" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category grid ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="categories-heading"
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Our Collections
            </h2>
            <p className="mt-3 text-gray-500">
              From the barat to the walima — we dress the groom for every occasion
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GROOM_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-gray-100"
              >
                {/* Photography placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <Scissors className="h-10 w-10 text-gray-300" aria-hidden="true" />
                </div>

                <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4 pt-16">
                  <p className="text-xs text-[#c9a227] uppercase tracking-wider">
                    {cat.romanUrdu}
                  </p>
                  <p className="text-lg font-semibold text-white">{cat.label}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-300 group-hover:text-white transition-colors">
                    View Collection
                    <ArrowRight
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works + CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] py-16" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[#c9a227] mb-4">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Your Perfect Sherwani, In 4 Steps
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 text-left">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step}>
                <span className="text-3xl font-bold text-[#c9a227] opacity-60">{step}</span>
                <p className="mt-2 text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={customUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
            >
              <WhatsAppIcon />
              Start on WhatsApp
            </a>
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-8 py-3.5 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Policy strip ───────────────────────────────────────────────────── */}
      <section className="bg-amber-50 py-8" aria-label="Policy assurances">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-gray-700">
            {POLICY_POINTS.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Inline WhatsApp SVG icon ──────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
    </svg>
  );
}
