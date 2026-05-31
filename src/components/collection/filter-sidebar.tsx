"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { COLOR_SWATCHES, PRICE_BUCKETS } from "@/lib/constants";
import type { FilterState } from "@/types";
import type { Fabric } from "@/types";

interface FilterSidebarProps {
  fabrics: Fabric[];
  colors?: string[];
  currentFilters: FilterState;
}

const SORT_OPTIONS = [
  { value: "", label: "Recommended" },
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const PRODUCT_TYPES = [
  { value: "", label: "All" },
  { value: "MADE_TO_ORDER", label: "Made to Measure" },
  { value: "STOCK", label: "Ready to Wear" },
];

export function FilterSidebar({ fabrics, colors = [], currentFilters }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (entries: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(entries)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.delete("page"); // reset to page 1 on filter change
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const activePriceBucket = PRICE_BUCKETS.findIndex(
    (bucket) =>
      bucket.minPrice === currentFilters.minPrice && bucket.maxPrice === currentFilters.maxPrice
  );

  const hasActiveFilters =
    currentFilters.fabric ||
    currentFilters.color ||
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.productType ||
    currentFilters.sort;

  return (
    <aside className="space-y-6" aria-label="Product filters">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sand pb-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal">
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-terracotta hover:text-wine"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            Clear all
          </Button>
        )}
      </div>

      {/* Sort */}
      <FilterGroup title="Sort By">
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((option) => (
            <RadioOption
              key={option.value}
              label={option.label}
              checked={(currentFilters.sort ?? "") === option.value}
              onChange={() => updateFilters({ sort: option.value })}
              name="sort"
            />
          ))}
        </div>
      </FilterGroup>

      {/* Colour */}
      {colors.length > 0 && (
        <FilterGroup title="Colour">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const active = currentFilters.color === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => updateFilters({ color: active ? undefined : color })}
                  aria-pressed={active}
                  title={color}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors",
                    active
                      ? "border-terracotta bg-terracotta-pale text-wine"
                      : "border-sand text-slate hover:border-mist"
                  )}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-charcoal/15"
                    style={{ backgroundColor: COLOR_SWATCHES[color] ?? "#C9BCA8" }}
                    aria-hidden="true"
                  />
                  {color}
                </button>
              );
            })}
          </div>
        </FilterGroup>
      )}

      {/* Price */}
      <FilterGroup title="Price">
        <div className="space-y-1.5">
          <RadioOption
            label="Any price"
            checked={activePriceBucket === -1}
            onChange={() => updateFilters({ minPrice: undefined, maxPrice: undefined })}
            name="price"
          />
          {PRICE_BUCKETS.map((bucket, i) => (
            <RadioOption
              key={bucket.label}
              label={bucket.label}
              checked={activePriceBucket === i}
              onChange={() =>
                updateFilters({
                  minPrice: bucket.minPrice ? String(bucket.minPrice) : undefined,
                  maxPrice: bucket.maxPrice ? String(bucket.maxPrice) : undefined,
                })
              }
              name="price"
            />
          ))}
        </div>
      </FilterGroup>

      {/* Product type */}
      <FilterGroup title="Type">
        <div className="space-y-1.5">
          {PRODUCT_TYPES.map((option) => (
            <RadioOption
              key={option.value}
              label={option.label}
              checked={(currentFilters.productType ?? "") === option.value}
              onChange={() => updateFilters({ type: option.value })}
              name="productType"
            />
          ))}
        </div>
      </FilterGroup>

      {/* Fabric */}
      {fabrics.length > 0 && (
        <FilterGroup title="Fabric">
          <div className="space-y-1.5">
            <RadioOption
              label="All Fabrics"
              checked={!currentFilters.fabric}
              onChange={() => updateFilters({ fabric: undefined })}
              name="fabric"
            />
            {fabrics.map((fabric) => (
              <RadioOption
                key={fabric.id}
                label={fabric.name}
                checked={currentFilters.fabric === fabric.code}
                onChange={() => updateFilters({ fabric: fabric.code })}
                name="fabric"
              />
            ))}
          </div>
        </FilterGroup>
      )}
    </aside>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-mist">
        {title}
      </h3>
      {children}
    </div>
  );
}

function RadioOption({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
        checked
          ? "bg-terracotta-pale font-medium text-wine"
          : "text-slate hover:bg-linen hover:text-charcoal"
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          checked ? "border-terracotta bg-terracotta" : "border-sand"
        )}
        aria-hidden="true"
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-parchment" />}
      </span>
      {label}
    </label>
  );
}
