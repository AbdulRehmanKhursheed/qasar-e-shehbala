import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable, Pagination, type Column } from "@/components/admin/data-table";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/admin/status-badge";
import { formatPKR, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders" };
export const dynamic = "force-dynamic";

interface OrderRow {
  id: string;
  orderRef: string;
  customerName: string;
  customerPhone: string;
  totalMinor: string;
  orderStatus: string;
  paymentStatus: string;
  fulfillmentType: string;
  channel: string;
  createdAt: string;
}

interface SearchParams {
  page?: string;
  status?: string;
  paymentStatus?: string;
  q?: string;
}

// TODO: Replace with Prisma query with filters and cursor pagination
async function getOrders(_params: SearchParams): Promise<{ orders: OrderRow[]; total: number }> {
  return { orders: [], total: 0 };
}

const COLUMNS: Column<OrderRow>[] = [
  {
    key: "ref",
    header: "Ref",
    cell: (r) => (
      <Link href={`/admin/orders/${r.id}`} className="font-mono text-xs font-bold text-[#c9a227] hover:underline">
        {r.orderRef}
      </Link>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    cell: (r) => (
      <div>
        <p className="font-medium text-gray-900 text-xs">{r.customerName}</p>
        <p className="text-gray-400 text-xs">{r.customerPhone}</p>
      </div>
    ),
  },
  {
    key: "total",
    header: "Total",
    cell: (r) => <span className="tabular-nums text-xs font-medium">{formatPKR(BigInt(r.totalMinor))}</span>,
  },
  {
    key: "orderStatus",
    header: "Status",
    cell: (r) => <OrderStatusBadge status={r.orderStatus as never} />,
  },
  {
    key: "payment",
    header: "Payment",
    cell: (r) => <PaymentStatusBadge status={r.paymentStatus as never} />,
  },
  {
    key: "channel",
    header: "Channel",
    cell: (r) => <span className="text-xs text-gray-500">{r.channel}</span>,
  },
  {
    key: "date",
    header: "Date",
    cell: (r) => <time className="text-xs text-gray-400">{formatDate(r.createdAt)}</time>,
  },
];

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? 1);
  const { orders, total } = await getOrders(sp);

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {/* Quick-filter pills */}
          {["all", "LEAD", "CONFIRMED", "IN_PROGRESS", "READY", "DELIVERED"].map((s) => (
            <Link
              key={s}
              href={s === "all" ? "/admin/orders" : `/admin/orders?status=${s}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                (sp.status === s || (!sp.status && s === "all"))
                  ? "border-[#c9a227] bg-amber-50 text-[#c9a227]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </Link>
          ))}
        </div>

        <Link
          href="/admin/orders/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f0f0f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d2d2d] transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          New Order
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={orders}
        keyField="id"
        emptyMessage="No orders match the current filters."
        caption="Orders list"
      />

      <Pagination
        page={page}
        total={total}
        pageSize={20}
        onPageChange={() => {}}
      />
    </div>
  );
}
