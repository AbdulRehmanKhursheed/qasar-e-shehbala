import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MapPin } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${SITE.name} — Rawalpindi's premier made-to-measure groom wear house, established in Saddar in ${SITE.established}. Over 25 years of master tailoring.`,
  slug: "about",
});

export const revalidate = 86400; // 24 h

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "About Us", href: "/about" }]} />

        {/* Hero text */}
        <div className="mt-10">
          <p className="text-sm font-medium uppercase tracking-wider text-jewel mb-3">
            Our Story
          </p>
          <h1
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Crafting Groom Wear
            <br />
            Since {SITE.established}
          </h1>
        </div>

        {/* Story */}
        <div className="mt-10 space-y-6 text-base leading-8 text-gray-600 max-w-3xl">
          <p>
            Qasar-e-Shehbala &mdash; <em>&ldquo;The Palace of Royalty&rdquo;</em> &mdash; was founded in
            Saddar, Rawalpindi in 1999 with a single purpose: to dress the Pakistani
            groom in a garment he would remember for a lifetime.
          </p>
          <p>
            For over 25 years our master karigars have crafted sherwani, prince
            coats, and waistcoats by hand, using time-honoured techniques passed
            down through generations of tailors. Every garment begins with a
            conversation &mdash; about the occasion, the fabric, the cut &mdash; and ends with
            a perfect fit.
          </p>
          <p>
            We are not a factory. We are a workshop. Each piece is made-to-measure,
            for you, in Saddar. The same families have trusted us for wedding after
            wedding, decade after decade.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-gray-100 pt-14 sm:grid-cols-3">
          {[
            {
              title: "Craftsmanship",
              body: "Every seam, every embroidery, every button — done by hand by experienced karigars who take pride in their work.",
            },
            {
              title: "Heritage",
              body: "We carry the traditions of Saddar's tailoring heritage. Our techniques are old; our results are timeless.",
            },
            {
              title: "Service",
              body: "A groom's experience is as important as his garment. From the first WhatsApp message to the final fitting, we are with you.",
            },
          ].map((val) => (
            <div key={val.title}>
              <h2 className="text-base font-semibold text-gray-900">{val.title}</h2>
              <p className="mt-2 text-sm text-gray-500 leading-7">{val.body}</p>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="mt-14 rounded-2xl bg-gray-50 p-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jewel/8">
              <MapPin className="h-5 w-5 text-jewel" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Visit Our Shop</h2>
              <address className="mt-2 not-italic text-sm text-gray-600 leading-7">
                {SITE.address.line1}
                <br />
                {SITE.address.area}, {SITE.address.city}
                <br />
                {SITE.address.province}, Pakistan
              </address>
              <p className="mt-2 text-sm text-gray-500">
                Open {SITE.openingHours}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${SITE.name}, Saddar, Rawalpindi`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-jewel hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
