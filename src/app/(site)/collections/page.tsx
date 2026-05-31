import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { GROOM_CATEGORIES } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "All Collections",
  description:
    "Browse our complete collection of premium made-to-measure groom wear — sherwani, prince coats, waistcoats and more. Tailored in Saddar, Rawalpindi.",
  slug: "collections",
});

export const revalidate = 3600;

export default function CollectionsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Collections", href: "/collections" }]} />

        <div className="mt-8 mb-12">
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            All Collections
          </h1>
          <p className="mt-3 max-w-2xl text-gray-500">
            From the sherwani of the barat to the subtle waistcoat of the walima —
            every garment made to measure, by hand, in Saddar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {GROOM_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 hover:border-amber-200 hover:bg-amber-50 transition-colors"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/7] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-300 text-sm">
                  {cat.label} Photography
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#c9a227] uppercase tracking-wider">
                    {cat.romanUrdu}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    {cat.label}
                  </h2>
                </div>
                <ArrowRight
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-[#c9a227]"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
