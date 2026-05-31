import Link from "next/link";
import { Ruler } from "lucide-react";
import { SIZE_CHART } from "@/lib/constants";

export function SizeChart() {
  return (
    <details className="group rounded-2xl border border-sand bg-cream">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
        <span className="flex items-center gap-2.5 font-display text-lg text-charcoal">
          <Ruler className="h-4 w-4 text-terracotta" aria-hidden="true" />
          Size Guide
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-mist transition-colors group-open:text-terracotta">
          <span className="group-open:hidden">View chart</span>
          <span className="hidden group-open:inline">Hide</span>
        </span>
      </summary>

      <div className="border-t border-sand px-5 pb-5 pt-4">
        <p className="text-[13px] leading-6 text-mist">
          A standard reference in {SIZE_CHART.units}. Every Qasar-e-Shehbala garment is
          cut to your own measurements, so treat this as a starting point — not a limit.
        </p>

        <div className="mt-4 overflow-x-auto rounded-xl border border-sand">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-linen text-left">
                {SIZE_CHART.columns.map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.rows.map((row) => (
                <tr key={row.size} className="border-t border-sand/70">
                  <td className="px-3.5 py-2.5 font-semibold text-charcoal">{row.size}</td>
                  <td className="px-3.5 py-2.5 text-slate">{row.chest}</td>
                  <td className="px-3.5 py-2.5 text-slate">{row.waist}</td>
                  <td className="px-3.5 py-2.5 text-slate">{row.shoulder}</td>
                  <td className="px-3.5 py-2.5 text-slate">{row.sleeve}</td>
                  <td className="px-3.5 py-2.5 text-slate">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href="/measurement-guide"
          className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-terracotta hover:underline"
        >
          <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
          How to measure yourself at home
        </Link>
      </div>
    </details>
  );
}
