import Image from "next/image";
import Link from "next/link";
import { cn, formatPKR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";
import { SITE } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  priority?: boolean; // true for above-the-fold cards (LCP)
  className?: string;
}

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const primaryImage = product.images[0];
  const hoverImage = product.images[1];
  const priceRupees = Number(product.basePriceMinor) / 100;

  const isMTO = product.productType === "MADE_TO_ORDER" || product.productType === "BOTH";

  return (
    <article
      className={cn("group relative flex flex-col overflow-hidden rounded-xl bg-white", className)}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-gray-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        {primaryImage ? (
          <>
            <Image
              src={primaryImage.r2Key}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-500",
                hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
              )}
              priority={priority}
            />
            {hoverImage && (
              <Image
                src={hoverImage.r2Key}
                alt={hoverImage.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-300">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {isMTO && (
            <Badge variant="gold">Made to Measure</Badge>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
        )}

        <h3 className="text-sm font-medium text-gray-900 leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-[#c9a227] transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>

        {priceRupees > 0 && (
          <p className="mt-2 text-base font-semibold text-gray-900">
            {formatPKR(Number(product.basePriceMinor))}
          </p>
        )}

        {isMTO && (
          <p className="mt-1.5 text-xs text-gray-500">
            Ready in {SITE.defaultLeadTimeDays} working days
          </p>
        )}
      </div>
    </article>
  );
}
