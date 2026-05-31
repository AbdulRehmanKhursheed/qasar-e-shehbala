import { CATEGORY_SPECS, DEFAULT_CATEGORY_SPEC, SITE } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductSpecsProps {
  product: Product;
  isMTO: boolean;
}

export function ProductSpecs({ product, isMTO }: ProductSpecsProps) {
  const spec = (product.category && CATEGORY_SPECS[product.category.slug]) || DEFAULT_CATEGORY_SPEC;
  const fabrics = product.fabricOptions.map((o) => o.fabric.name);

  const rows: { label: string; value: string }[] = [
    { label: "Garment", value: product.category?.name ?? "Eastern menswear" },
    { label: "Fit", value: spec.fit },
    { label: "Includes", value: spec.includes.join(" · ") },
    ...(fabrics.length ? [{ label: "Fabric", value: fabrics.join(", ") }] : []),
    { label: "Lining", value: spec.lining },
    { label: "Occasion", value: spec.occasion },
    {
      label: "Made in",
      value: `${SITE.address.area}, ${SITE.address.city}`,
    },
    {
      label: isMTO ? "Stitching time" : "Availability",
      value: isMTO ? `${SITE.defaultLeadTimeDays} working days` : "Ready to wear",
    },
    { label: "Care", value: spec.care },
  ];

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-4 border-b border-sand/70 py-2.5"
        >
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">
            {row.label}
          </dt>
          <dd className="text-right text-[13.5px] text-charcoal-soft">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
