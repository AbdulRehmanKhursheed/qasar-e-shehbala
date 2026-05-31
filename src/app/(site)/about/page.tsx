import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MapPin, Phone, Star } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${SITE.name} — Rawalpindi's premier made-to-measure groom wear house, established in Saddar in ${SITE.established}. Rated 5.0 by ${SITE.rating.count}+ grooms.`,
  slug: "about",
});

export const revalidate = 86400;

export default function AboutPage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "About Us", href: "/about" }]} />

        {/* Hero */}
        <div className="mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta mb-4">Our Story</p>
          <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
            Crafting Groom Wear<br />
            <em style={{ fontStyle: "italic" }}>Since {SITE.established}</em>
          </h1>
        </div>

        {/* Rating badge */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-sand bg-cream px-5 py-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-brass text-brass" aria-hidden="true" />
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal">
              {SITE.rating.value.toFixed(1)} out of 5
            </p>
            <p className="text-xs text-mist">
              {SITE.rating.count} reviews on Google
            </p>
          </div>
          <a
            href={SITE.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-xs font-medium text-terracotta hover:underline"
          >
            Read reviews →
          </a>
        </div>

        {/* Story */}
        <div className="mt-10 space-y-5 text-[15px] leading-8 text-slate max-w-3xl">
          <p>
            Qasar-e-Shehbala &mdash; <em className="font-display text-[17px] italic text-charcoal">&ldquo;The Palace of Royalty&rdquo;</em> &mdash; was founded
            in Saddar, Rawalpindi in 1999 with a single purpose: to dress the Pakistani
            groom in a garment he would remember for a lifetime.
          </p>
          <p>
            For over 25 years our master karigars have crafted sherwani, prince coats,
            and waistcoats by hand, using techniques passed down through generations of
            tailors at City Centre, Saddar. Every garment begins with a conversation &mdash; about
            the occasion, the fabric, the cut &mdash; and ends with a perfect fit at your
            final naap.
          </p>
          <p>
            We are not a factory. We are a workshop. Each piece is made-to-measure,
            for you, in Saddar. The same families have trusted us for wedding after wedding,
            decade after decade. That trust, built over 25 years, is what we protect with
            every stitch.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-sand pt-14 sm:grid-cols-3">
          {[
            {
              title: "Craftsmanship",
              body: "Every seam, every embroidery, every button — done by hand by experienced karigars who have spent their lives perfecting this work.",
            },
            {
              title: "Heritage",
              body: "We carry the traditions of Saddar's tailoring culture. Our techniques are old; our results are timeless. Since 1999, nothing has changed about how we work.",
            },
            {
              title: "Service",
              body: "A groom's experience matters as much as his garment. From the first WhatsApp message to the final fitting, we are with you — at every step.",
            },
          ].map((val) => (
            <div key={val.title}>
              <h2 className="font-display text-xl text-charcoal">{val.title}</h2>
              <p className="mt-2 text-[13px] text-mist leading-7">{val.body}</p>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="mt-14 rounded-2xl border border-sand bg-cream p-8">
          <h2 className="font-display text-xl text-charcoal mb-5">Visit the Workshop</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mist mb-1">Address</p>
                <address className="not-italic text-sm text-slate leading-6">
                  {SITE.address.full}
                </address>
                <a
                  href={SITE.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-xs font-medium text-terracotta hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mist mb-1">Contact</p>
                <a href={`tel:${SITE.phone}`} className="block text-sm text-slate hover:text-terracotta transition-colors">
                  {SITE.phone}
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#25D366] hover:underline"
                >
                  WhatsApp us
                </a>
                <p className="mt-2 text-xs text-mist">{SITE.openingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-mist mb-4">Ready to start your groom wear journey?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Assalam o Alaikum! I would like to book a consultation.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1da851] transition-colors"
            >
              WhatsApp Consultation
            </a>
            <a
              href="/appointments"
              className="inline-flex items-center rounded-full border border-sand px-6 py-3 text-sm font-medium text-slate hover:border-terracotta hover:text-terracotta transition-colors"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
