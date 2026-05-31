import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { GROOM_CATEGORIES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { GeometricMotif } from "@/components/ui/geometric-motif";

export const metadata: Metadata = buildMetadata({
  title: "All Collections",
  description:
    "Browse our complete collection of premium made-to-measure groom wear — sherwani, prince coats, waistcoats and more. Tailored in Saddar, Rawalpindi.",
  slug: "collections",
});

export const revalidate = 3600;

const GRADIENTS = [
  "linear-gradient(145deg, #F5EDE1, #EDE0CE)",
  "linear-gradient(145deg, #F2E8EB, #E8D5D8)",
  "linear-gradient(145deg, #EBF1EB, #D8E5D9)",
  "linear-gradient(145deg, #F4EDDE, #EDE0C8)",
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Collections", href: "/collections" }]} />

        <header className="mt-8 mb-12 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta">
            The Collections
          </p>
          <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
            Dressed for every <em style={{ fontStyle: "italic" }}>rasm</em>
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-mist">
            From the sherwani of the barat to the subtle waistcoat of the walima —
            every garment made to measure, by hand, in Saddar.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {GROOM_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative flex items-end overflow-hidden rounded-2xl ring-1 ring-sand transition-shadow hover:shadow-xl hover:shadow-charcoal/10"
            >
              <div className="relative flex aspect-[16/9] w-full items-center justify-center" style={{ background: GRADIENTS[i % 4] }}>
                <GeometricMotif className="h-28 w-28 text-sand opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-charcoal/85 to-transparent p-6 pt-16">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-terracotta-pale">{cat.romanUrdu}</p>
                  <h2 className="mt-1 font-display text-2xl text-cream">{cat.label}</h2>
                </div>
                <ArrowRight className="h-5 w-5 text-cream/70 transition-transform group-hover:translate-x-1 group-hover:text-cream" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
