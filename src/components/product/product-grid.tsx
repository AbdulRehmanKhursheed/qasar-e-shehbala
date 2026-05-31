import { ProductCard } from "./product-card";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  priorityCount?: number; // number of above-the-fold cards to priority-load
}

export function ProductGrid({
  products,
  emptyMessage = "No products found.",
  priorityCount = 4,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sand bg-linen/40 py-20 text-center">
        <p className="font-display text-xl font-light text-charcoal">{emptyMessage}</p>
        <p className="mt-2 text-sm text-mist">
          Try adjusting your filters or browse all collections.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
