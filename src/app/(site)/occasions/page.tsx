import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { OCCASIONS } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Shop by Wedding Event",
  description:
    "Groom wear for every wedding function — barat sherwani, walima prince coat, mehndi kurta and nikah looks. Made to measure in Saddar, Rawalpindi.",
  slug: "occasions",
});

export const revalidate = 86400;

const GRADIENTS = [
  "linear-gradient(145deg, #F5EDE1, #EDE0CE)",
  "linear-gradient(145deg, #F2E8EB, #E8D5D8)",
  "linear-gradient(145deg, #EBF1EB, #D8E5D9)",
  "linear-gradient(145deg, #F4EDDE, #EDE0C8)",
];

export default function OccasionsPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Occasions", href: "/occasions" }]} />

        <header className="mt-10 mb-12 max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
            Shop by Event
          </p>
          <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
            Dressed for every rasm
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-mist">
            From the barat to the walima, mehndi to nikah — every function has its own brief.
            Start with the occasion and we&apos;ll guide you to the right garment, cut to your measure.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {OCCASIONS.map((occasion, i) => (
            <Link
              key={occasion.slug}
              href={`/occasions/${occasion.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-sand p-7 transition-shadow hover:shadow-xl hover:shadow-charcoal/10"
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
                  {occasion.romanUrdu}
                </p>
                <h2 className="mt-2 font-display text-3xl font-light text-charcoal">
                  {occasion.label}
                </h2>
                <p className="mt-3 max-w-sm text-[14px] leading-7 text-slate">
                  {occasion.tagline}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-charcoal transition-colors group-hover:text-terracotta">
                Explore {occasion.label} looks
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
