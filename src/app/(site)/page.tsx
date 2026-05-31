import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Star, Scissors, Ruler, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, GROOM_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = buildMetadata();
export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className="bg-parchment">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-label="Hero">
        {/* Warm radial background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 75% 50%, #F5EDE1 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 10% 80%, #F2E8EB22 0%, transparent 60%)"
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[90vh] grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20">

            {/* Left — copy */}
            <div className="relative z-10 max-w-xl">
              <div className="animate-fade-up flex items-center gap-3 mb-8" style={{ animationDelay: "0ms" }}>
                <span className="h-px w-8 bg-terracotta" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
                  Rawalpindi · Saddar · Est. {SITE.established}
                </span>
              </div>

              <h1
                className="animate-fade-up font-display text-[3.2rem] leading-[1.05] text-charcoal sm:text-[4.5rem] lg:text-[5.5rem]"
                style={{ animationDelay: "80ms", fontWeight: 400 }}
              >
                Dressed for the{" "}
                <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                  grandest
                </em>
                <br />
                day of your life
              </h1>

              <p
                className="animate-fade-up mt-7 text-[15px] leading-relaxed text-slate"
                style={{ animationDelay: "160ms" }}
              >
                Made-to-measure sherwani, prince coats and waistcoats — cut by master karigars
                in Saddar since 1999.{" "}
                <span className="text-charcoal font-medium italic font-display text-[17px]">
                  Dulha ki sherwani, bilkul naap ki.
                </span>
              </p>

              <div
                className="animate-fade-up mt-10 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <Link
                  href="/collections/groom-wear"
                  className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-[14px] font-semibold text-cream shadow-sm transition-all hover:bg-terracotta-light hover:shadow-md"
                >
                  Explore Groom Wear
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Assalam o Alaikum! I would like to enquire about groom wear.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-7 py-3.5 text-[14px] font-semibold text-slate shadow-sm transition-all hover:border-terracotta hover:text-terracotta"
                >
                  <WaIcon className="h-4 w-4 text-[#25D366]" />
                  WhatsApp Enquiry
                </a>
              </div>

              {/* Micro trust strip */}
              <div
                className="animate-fade-up mt-12 flex items-center gap-5 border-t border-sand pt-6"
                style={{ animationDelay: "320ms" }}
              >
                {[
                  { n: "25+", l: "Years" },
                  { n: "1000+", l: "Grooms" },
                  { n: "15", l: "Day delivery" },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-display text-2xl font-semibold text-charcoal">{n}</p>
                    <p className="text-[11px] uppercase tracking-wider text-mist">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — decorative panel */}
            <div className="animate-fade-up relative" style={{ animationDelay: "120ms" }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-linen shadow-[0_8px_60px_-12px_rgba(26,20,16,0.15)]">
                {/* Ornamental geometric */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 300 300" className="h-72 w-72 text-sand opacity-80" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                    <circle cx="150" cy="150" r="130" />
                    <circle cx="150" cy="150" r="100" />
                    <circle cx="150" cy="150" r="70" />
                    <polygon points="150,20 280,150 150,280 20,150" />
                    <polygon points="150,50 250,150 150,250 50,150" />
                    <polygon points="150,95 205,150 150,205 95,150" />
                    <circle cx="150" cy="150" r="12" fill="currentColor" stroke="none" opacity="0.3" />
                  </svg>
                </div>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <p className="font-display text-3xl text-mist" style={{ fontStyle: "italic" }}>Qasr-e-Shehbala</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-fog">Garment photography</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-cream px-5 py-4 shadow-lg ring-1 ring-sand sm:block">
                <p className="font-display text-3xl font-semibold text-charcoal">1999</p>
                <p className="text-[10px] uppercase tracking-widest text-mist">Established</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ornament ─────────────────────────────────────────── */}
      <div className="py-6 text-center text-brass text-sm tracking-[0.5em] select-none">
        ⸻ ✦ ⸻
      </div>

      {/* ── Trust signals ────────────────────────────────────── */}
      <section className="border-y border-sand bg-cream py-12" aria-label="Why us">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Star, title: "Since 1999", desc: "25+ years of master tailoring in Saddar" },
              { icon: Scissors, title: "Master Karigars", desc: "Expert craftsmen, fitted 1,000+ grooms" },
              { icon: Ruler, title: "Made to Measure", desc: "Cut to your exact naap, every time" },
              { icon: Clock, title: "15-Day Delivery", desc: "Sherwani ready in 15 working days" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group flex flex-col items-center text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-pale text-terracotta transition-all group-hover:bg-terracotta group-hover:text-cream">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="font-display text-lg font-semibold text-charcoal">{title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-mist">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections ──────────────────────────────────────── */}
      <section className="py-20" aria-labelledby="collections-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta mb-3">Our Collections</p>
            <h2 id="collections-heading" className="font-display text-[2.8rem] font-light text-charcoal leading-tight">
              Dressed for every <em style={{ fontStyle: "italic" }}>rasm</em>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[14px] text-mist leading-relaxed">
              From the barat to the walima — each garment made to measure, by hand, in Saddar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GROOM_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-linen transition-shadow hover:shadow-xl hover:shadow-charcoal/10"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Aspect with Mughal arch clip inside */}
                <div className="relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden">
                  {/* Arch background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br transition-all duration-500"
                    style={{
                      background: [
                        "linear-gradient(145deg, #F5EDE1, #EDE0CE)",
                        "linear-gradient(145deg, #F2E8EB, #E8D5D8)",
                        "linear-gradient(145deg, #EBF1EB, #D8E5D9)",
                        "linear-gradient(145deg, #F4EDDE, #EDE0C8)",
                      ][i % 4],
                    }}
                  />
                  {/* Fine geometric ornament */}
                  <svg viewBox="0 0 120 120" className="h-24 w-24 text-sand opacity-60 transition-all duration-500 group-hover:opacity-90 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden="true">
                    <circle cx="60" cy="60" r="54" />
                    <circle cx="60" cy="60" r="38" />
                    <polygon points="60,6 114,60 60,114 6,60" />
                    <polygon points="60,28 92,60 60,92 28,60" />
                  </svg>
                  {/* Arch curtain at bottom */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-[55%]"
                    style={{
                      background: "linear-gradient(to top, rgba(26,20,16,0.72) 0%, rgba(26,20,16,0.3) 60%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-terracotta-pale mb-1">{cat.romanUrdu}</p>
                  <p className="font-display text-xl text-cream">{cat.label}</p>
                  <p className="mt-1.5 flex items-center gap-1 text-[12px] text-cream/60 transition-colors group-hover:text-cream/90">
                    View collection
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ornament ─────────────────────────────────────────── */}
      <div className="py-2 text-center text-sand text-sm tracking-[0.5em] select-none">
        ⸻ ✦ ⸻
      </div>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="grain relative bg-linen py-20" aria-labelledby="process-heading">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta mb-3">The Process</p>
            <h2 id="process-heading" className="font-display text-[2.8rem] font-light text-charcoal">
              Your sherwani, in four steps
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4">
            {[
              { n: "01", t: "Browse & Enquire", d: "Choose a design and message us on WhatsApp" },
              { n: "02", t: "Measurements", d: "Visit Saddar or share your naap from home" },
              { n: "03", t: "Deposit & Craft", d: "30–50% advance secures your fabric. 15 days." },
              { n: "04", t: "Fitting & Collection", d: "Try on, approve, take home. Balance on delivery." },
            ].map(({ n, t, d }) => (
              <div key={n} className="relative">
                <p className="font-display text-[3.5rem] font-light leading-none text-sand">{n}</p>
                <p className="mt-2 text-[14px] font-semibold text-charcoal">{t}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-mist">{d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Assalam o Alaikum! I want to discuss a custom sherwani.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#1da851] hover:shadow-md"
            >
              <WaIcon className="h-5 w-5" />
              Start on WhatsApp
            </a>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-8 py-3.5 text-[14px] font-semibold text-slate shadow-sm transition-all hover:border-terracotta hover:text-terracotta"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Policy strip ─────────────────────────────────────── */}
      <section className="border-t border-sand bg-cream py-8" aria-label="Policies">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              "30–50% advance secures your fabric",
              "Balance at final fitting",
              "Free alterations within 7 days",
              "COD on accessories under PKR 10,000",
            ].map((point) => (
              <span key={point} className="flex items-center gap-2 text-[12px] font-medium text-slate">
                <span className="h-1 w-1 rounded-full bg-terracotta" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit us ─────────────────────────────────────────── */}
      <section className="py-16 bg-parchment" aria-label="Visit the shop">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta mb-3">Come see us</p>
          <h2 className="font-display text-[2.2rem] font-light text-charcoal">
            Saddar Road, Rawalpindi
          </h2>
          <p className="mt-3 text-[14px] text-mist">
            Our karigars are here Monday through Saturday, 10am to 9pm.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent("Qasr-e-Shehbala, Saddar, Rawalpindi")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sand px-6 py-3 text-[13px] font-medium text-slate transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get directions
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-sand px-6 py-3 text-[13px] font-medium text-slate transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L0 24l6.335-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.357-.214-3.763.89.946-3.656-.235-.375A9.783 9.783 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
    </svg>
  );
}
