import { Star, Clock, Scissors, Truck } from "lucide-react";
import { TRUST_POINTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = [Star, Clock, Scissors, Truck];

export function TrustBar({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand bg-sand/70 sm:grid-cols-4",
        className
      )}
    >
      {TRUST_POINTS.map((point, i) => {
        const Icon = ICONS[i] ?? Star;
        return (
          <li key={point.label} className="flex items-center gap-3 bg-cream px-4 py-3.5">
            <Icon className="h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-charcoal">{point.label}</p>
              <p className="text-[11px] text-mist">{point.detail}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
