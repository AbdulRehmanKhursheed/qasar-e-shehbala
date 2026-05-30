"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { FilterState } from "@/types";
import type { Fabric } from "@/types";

interface FilterSidebarProps {
  fabrics: Fabric[];
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

export function FilterSidebar({ fabrics, currentFilters }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters =
    currentFilters.fabric ||
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.productType ||
    currentFilters.sort;

  return (
    <aside className="space-y-6" aria-label="Product filters">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-[#c9a227] hover:text-[#a07d1a]"
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
              onChange={() => updateFilters("sort", option.value)}
              name="sort"
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
              onChange={() => updateFilters("type", option.value)}
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
              onChange={() => updateFilters("fabric", "")}
              name="fabric"
            />
            {fabrics.map((fabric) => (
              <RadioOption
                key={fabric.id}
                label={fabric.name}
                checked={currentFilters.fabric === fabric.code}
                onChange={() => updateFilters("fabric", fabric.code)}
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
      <h3 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
          ? "bg-amber-50 text-[#a07d1a] font-medium"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
          checked ? "border-[#c9a227] bg-[#c9a227]" : "border-gray-300"
        )}
        aria-hidden="true"
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      {label}
    </label>
  );
}
