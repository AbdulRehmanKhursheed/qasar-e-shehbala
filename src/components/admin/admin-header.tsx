"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/tailoring": "Tailoring Jobs",
  "/admin/inventory": "Inventory",
  "/admin/customers": "Customers",
  "/admin/measurements": "Measurements",
  "/admin/appointments": "Appointments",
  "/admin/leads": "WhatsApp Leads",
  "/admin/analytics": "Analytics",
  "/admin/staff": "Staff",
  "/admin/blog": "Blog & CMS",
};

export function AdminHeader() {
  const pathname = usePathname();
  // Match the most specific prefix
  const title =
    Object.entries(PAGE_TITLES)
      .filter(([key]) => pathname.startsWith(key))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? "Admin";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Notification bell — Phase 2 connects to unread lead/order counts */}
        <button
          type="button"
          className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Avatar placeholder */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-[#c9a227]">
          A
        </div>
      </div>
    </header>
  );
}
