# Qasr-e-Shehbala — Database Design

> Companion to [`../prisma/schema.prisma`](../prisma/schema.prisma) (validated against Prisma 6/7).
> Stack: PostgreSQL · Prisma · NestJS · Next.js. Single company, multi-branch, solo/tiny team.

This document explains the *why* and the parts Prisma can't express. Read `ARCHITECTURE.md` first for the business framing (deposit-first WhatsApp funnel, in-store collection default, RTO economics).

---

## 1. Entity design — what each table is for

| Domain | Tables | Phase |
|---|---|---|
| Identity & branch | `Branch`, `Staff`, `Customer`, `Address` | 1 |
| Catalog | `Category`, `Product`, `ProductVariant`, `ProductImage`, `Fabric`, `ProductFabricOption` | 1 |
| Inventory | `StockLevel`, `StockAdjustment` | 1 / 2 |
| Measurements | `MeasurementProfile` (+ snapshot JSON on `OrderItem`) | 1 |
| Orders & money | `Order`, `OrderItem`, `Payment`, `OrderEvent` | 1 |
| Fulfillment | `Shipment` | 2 |
| Tailoring | `TailoringJob`, `TailoringEvent` | 1 (column) → 2 (entity) |
| Appointments | `Appointment` | 1 |
| Leads / CRM | `Lead` | 1 |
| Discounts | `Coupon`, `CouponRedemption` | 2 |
| CMS / SEO | `BlogPost`, `BlogTag`, `ContentProductLink`, `Redirect`, `SiteBlock` | 2 (blog is MDX-in-git at launch) |
| Analytics | `AnalyticsEvent` | 1 (the WhatsApp-click beacon) |
| Audit | `AuditLog` | 1 |

**Key modeling calls** (carried from the architecture):

- **Money = `BigInt` minor units (paisa)**, every field suffixed `*Minor`. Never `Float`/`Decimal` for money — a 1-paisa drift across deposit+balance reconciliation on a PKR 200k order is unacceptable. (`Fabric.onHandMeters` *is* `Decimal` — it's a physical measure, not money.)
- **Phone (E.164) is the customer identity** (`Customer.phone @unique`); email optional. Customers don't log in at MVP — only `Staff` are auth principals.
- **Snapshot on `OrderItem`** — `productName`, `unitPriceMinor`, `measurementSnapshot` are *copied* at order time. The reusable `MeasurementProfile` is a convenience template; the snapshot is the contract of record. Editing a profile must never mutate an in-production order.
- **Two inventory semantics behind one `Product`**: `ProductType.STOCK` uses `StockLevel`; `MADE_TO_ORDER` has **no stock** (constrained by tailor time / optional fabric). Never `stock = 9999`.
- **`Lead` is first-class for direct inbound** — most contact is a referral/call/walk-in, not a web session. Staff create a lead from a phone (`Lead.phone`, `customerId` nullable) and the `ref` (QES-2026-0412) is generated at that moment. Web-origin leads add `pageUrl`/`utm*`.
- **`deposit*` on `Order` is a soft default + recorded override** (`depositRequiredMinor`, `depositOverrideReason`) — deposits are negotiated per customer; over-rigid enforcement makes the shop floor abandon the software. The *one* hard rule lives in the service layer: a `MADE_TO_ORDER` item can't enter `CUTTING` without a `VERIFIED` deposit.

## 2. Relationships (the non-obvious ones)

- **`Order 1—* Payment`** — multi-stage (deposit + balance + optional COD). `Order.paymentStatus` is **denormalized**, recomputed from the Payment list in *one* service method on every Payment write (see §9).
- **`OrderItem 1—1 TailoringJob`** (`orderItemId @unique`) — production gets its own lifecycle without polluting the order model. `TailoringJob` is branch-scoped; `assignedTailor` is a `Staff` (relation name `AssignedTailor`).
- **`Lead 1—1 Order`** via `Lead.convertedOrderId @unique` — a lead promotes into an order with the same stage vocabulary, no rework.
- **`Coupon`** has both `orders Order[]` (convenience FK on `Order.couponId`) and `redemptions CouponRedemption[]` (the record of use, with `amountMinor` and a `@unique` orderId so a coupon is redeemed once per order).
- **`Category`** self-references via the `CategoryTree` relation (`parentId` → `children`).
- **`AnalyticsEvent` and `AuditLog` have NO foreign keys** — IDs are stored as plain indexed strings. This is deliberate (see §4): FKs on a high-volume append-only table add write contention and block range-partition detach/archival.

## 3. Indexing strategy

Already in the schema via `@@index`/`@@unique`. Rationale for the load-bearing ones:

| Index | Why |
|---|---|
| `Customer.phone @unique` | Identity lookup — every WhatsApp/walk-in starts here |
| `Order(branchId, orderStatus, createdAt)` | The admin order board: "this branch's open orders, newest first" |
| `Order.paymentStatus`, `Order.createdAt` | Payment-verification queue & reporting windows |
| `Payment(status, collectedAt)` | The "pending verification" work queue |
| `Lead.phone`, `Lead.stage`, `Lead.createdAt` | CRM lookup, funnel views, dedupe by phone |
| `StockLevel @@unique([variantId, branchId])` | One stock row per variant per branch |
| `TailoringJob(branchId, stage)`, `promisedReadyDate` | Production floor view + "what's overdue" |
| `Appointment(branchId, scheduledAt)` | The day's fitting calendar |
| `AnalyticsEvent(eventType, createdAt)`, `referenceId` | Funnel queries + bridging a web session to its WhatsApp close |
| `AuditLog(entityType, entityId)` | "Show all changes to this order/payment" |

### Things Prisma can't express — add via raw SQL in a migration

Run `prisma migrate dev --create-only`, then edit the generated SQL:

```sql
-- Partial indexes so soft-deleted rows don't block slug/sku reuse,
-- and so hot queries skip tombstones entirely.
CREATE UNIQUE INDEX products_slug_active_uq   ON products (slug)        WHERE "deletedAt" IS NULL;
CREATE UNIQUE INDEX variants_sku_active_uq    ON product_variants (sku) WHERE "deletedAt" IS NULL;
CREATE        INDEX products_published_idx    ON products (id)          WHERE "deletedAt" IS NULL AND "isPublished" = true;

-- GIN indexes for JSONB you actually query (variant attributes, measurements).
CREATE INDEX variant_attributes_gin ON product_variants USING GIN (attributes jsonb_path_ops);
CREATE INDEX measurement_gin        ON measurement_profiles USING GIN (measurements jsonb_path_ops);

-- BRIN on the append-only analytics table — tiny, ideal for time-range scans.
CREATE INDEX analytics_created_brin ON analytics_events USING BRIN ("createdAt");

-- Full-text search for the small catalog (optional; ILIKE is fine at low volume).
CREATE INDEX products_fts ON products USING GIN (to_tsvector('simple', name || ' ' || coalesce(description,'')));
```

> When you add a partial unique index in raw SQL, drop the corresponding `@unique` from the Prisma model (keep the field) and let `prisma db pull` reconcile, or mark it `@@ignore`-free by managing that index outside Prisma. Document it so a future `migrate` doesn't fight you.

## 4. Scalability considerations

- **The catalog is read-dominant and served from the edge** (ISR/SSG per `ARCHITECTURE.md`), so the DB sees almost no read load for browsing. Don't optimize the catalog for scale it won't see.
- **Three append-only tables grow unbounded**: `AnalyticsEvent` (fastest), `AuditLog`, `OrderEvent`. Plan for `AnalyticsEvent`:
  - **No FKs** (above) so partitions detach/archive cleanly.
  - **Range-partition by month** once volume warrants (raw SQL, declarative partitioning):
    ```sql
    -- Convert (or create) as a partitioned table:
    CREATE TABLE analytics_events (... , PRIMARY KEY (id, "createdAt")) PARTITION BY RANGE ("createdAt");
    CREATE TABLE analytics_events_2026_06 PARTITION OF analytics_events
      FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
    ```
    Automate monthly partition creation with `pg_partman` or a cron. Drop/cold-store old partitions.
  - **At real volume, move web analytics off Postgres entirely** — GA4 already covers client events; this table is the *durable server-side funnel record*. If it dwarfs everything, ship events to ClickHouse/BigQuery and keep Postgres for transactional data.
- **Connection pooling is mandatory** on serverless: the app uses the **Supabase pooled PgBouncer (transaction-mode)** URL (`DATABASE_URL`, with `?pgbouncer=true&connection_limit=1`); migrations use the **direct** URL (`DIRECT_URL`). Using the direct URL from serverless functions exhausts Postgres connections — the #1 production-breaker for this stack.
- **Cursor pagination, not OFFSET**, for any large list (`where: { createdAt: { lt: cursor } }, orderBy: createdAt desc`).
- **Read replica** (Supabase Pro) only when DB CPU is the *measured* bottleneck — route reporting/analytics reads there. No sharding before replicas.

## 5. Audit logging — two layers, on purpose

- **`OrderEvent`** = the *domain timeline* of an order (created, confirmed-on-WhatsApp, payment recorded, stage changed, dispatched…). It's the source for status history and WhatsApp pings, and it's customer-adjacent. Append-only.
- **`AuditLog`** = *admin mutations* for accountability/fraud (`payment.verify`, `order.cancel`, `product.update`) with `before`/`after` JSON and actor + IP. Polymorphic (`entityType`/`entityId`, no FK).

Implement `AuditLog` with a NestJS interceptor (or Prisma client extension) on write paths — never hand-write call sites:

```ts
// NestJS interceptor sketch — wraps mutating admin handlers.
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const meta = Reflect.getMetadata('audit', ctx.getHandler()); // { action, entityType }
    return next.handle().pipe(tap(async (after) => {
      if (!meta) return;
      await this.prisma.auditLog.create({ data: {
        actorStaffId: req.user?.id, action: meta.action,
        entityType: meta.entityType, entityId: after?.id ?? req.params.id,
        after, ip: req.ip,
      }});
    }));
  }
}
```

**Money-touching actions (payment verification) must record the real actor** — that attribution is a fraud control, which is exactly why payment verification keeps per-user auth even when the shop floor shares a device.

## 6. Soft-delete strategy

- **`deletedAt DateTime?` on catalog/identity only**: `Product`, `ProductVariant`, `Category`, `Customer`, `Staff`, `Fabric`, `MeasurementProfile`.
- **Financial/operational records are NEVER soft-deleted** — `Order`, `Payment`, `OrderEvent`, `Shipment`, `CouponRedemption`. Cancel via status (`OrderStatus.CANCELLED`), never delete (it would orphan payments and break reconciliation).
- **Enforce filtering with a Prisma client extension** so you can't forget `where: { deletedAt: null }`:

```ts
const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const SOFT = new Set(['Product','ProductVariant','Category','Customer','Staff','Fabric','MeasurementProfile']);
        if (SOFT.has(model) && ['findMany','findFirst','count','aggregate'].includes(operation)) {
          args.where = { ...args.where, deletedAt: null };
        }
        return query(args);
      },
    },
    model: {
      $allModels: {
        async softDelete(this: any, where: any) { return this.update({ where, data: { deletedAt: new Date() } }); },
      },
    },
  },
});
```

- **Reuse after delete**: a soft-deleted slug/SKU must not block a new one → use the **partial unique indexes** in §3 (`WHERE deletedAt IS NULL`) instead of plain `@unique`.

## 7. Multi-tenant considerations — you are NOT multi-tenant

This is **one company with multiple physical locations**, not a SaaS with isolated tenants.

- **Use branch-scoping**: a `Branch` table + a `branchId` on location-sensitive entities (`Order`, `Staff`, `StockLevel`, `Appointment`, `TailoringJob`, `Shipment`, `StockAdjustment`). Seed exactly **one** branch at launch and default everything to it.
- **Keep `Product`, `Customer`, `Category`, `Fabric`, `MeasurementProfile` GLOBAL** — a groom measured at one location collects at another; the catalog is shared.
- **Do NOT build** schema-per-tenant, Postgres Row-Level Security tenancy, per-tenant config, or per-branch pricing. That's machinery for franchising you don't have.
- **If you ever franchise** to independent owners: add a `tenantId`, enable RLS with a `current_setting('app.tenant_id')` policy, and scope globals per tenant. Out of scope now — but the clean `branchId` seams mean it's an addition, not a rewrite.

## 8. Migration strategy

- **Pre-launch (schema churning, zero real data):** `prisma db push` against a single dev DB. Iterate freely; don't pay migration ceremony before the shape settles.
- **At go-live:** freeze the schema, switch to **`prisma migrate`** with committed migration files, and create a **separate Supabase dev project** so a migration can never hit prod by accident.
- **Raw-SQL bits** (partial indexes, GIN, BRIN, partitioning, RLS): `prisma migrate dev --create-only` → edit the generated `.sql` → apply. These live in version control alongside Prisma's migrations.
- **Zero-downtime changes** use **expand → migrate → contract**: add nullable column / new table (expand), backfill + dual-write, switch reads, then drop the old (contract) in a later migration. Never rename-in-place a column with live traffic.
- **Seed script** (`prisma/seed.ts`) for the single `Branch`, the category tree, the owner `Staff`, and `SiteBlock` defaults.
- **`directUrl`** in the datasource ensures `migrate` uses a direct (non-PgBouncer) connection — required, since DDL doesn't work through transaction-mode pooling.

## 9. Performance considerations

- **Recompute `Order.paymentStatus` in one place.** It's denormalized for cheap queries; the `Payment[]` list is the ledger of truth. A single `recomputePaymentStatus(orderId, tx)` runs inside the same transaction as every Payment write:

```ts
async function recomputePaymentStatus(tx: Prisma.TransactionClient, orderId: string) {
  const order = await tx.order.findUniqueOrThrow({ where: { id: orderId }, include: { payments: true } });
  const paid = order.payments.filter(p => p.status === 'VERIFIED')
                             .reduce((s, p) => s + p.amountMinor, 0n);
  const status =
    paid === 0n            ? 'UNPAID'
    : paid >= order.totalMinor ? 'PAID'
    : order.payments.some(p => p.type === 'DEPOSIT' && p.status === 'VERIFIED') ? 'DEPOSIT_PAID'
    : 'PARTIALLY_PAID';
  await tx.order.update({ where: { id: orderId }, data: { paymentStatus: status } });
}
```

- **`select` only what you need** (don't `include` whole graphs for a list view). Avoid N+1 by using a single `include` with nested `select` rather than per-row queries.
- **Stock decrement is a guarded atomic update**, not read-modify-write (Phase 2, only if you enable `reserved`):
  ```sql
  UPDATE stock_levels SET reserved = reserved + $n
   WHERE "variantId" = $v AND "branchId" = $b AND (onHand - reserved) >= $n;
  ```
- **`BigInt` serialization**: Prisma returns JS `bigint`; `JSON.stringify` throws on it. Add a global serializer (`BigInt.prototype.toJSON = function(){ return this.toString(); }`) or a NestJS interceptor, and parse back to `bigint` for math. Format to PKR only at the view layer.
- **JSONB validation at the app boundary** (Zod/class-validator) — `measurements`/`attributes` are flexible in the DB but must be validated on write, with a documented canonical key set, so downstream tailoring instructions don't corrupt.

## 10. Prisma schema

The complete, validated schema is in [`../prisma/schema.prisma`](../prisma/schema.prisma). Highlights illustrating the conventions:

```prisma
model Order {
  id        String   @id @default(cuid())
  orderRef  String   @unique            // QES-2026-0412 (human-facing)
  paymentStatus PaymentStatus @default(UNPAID)   // denormalized; recompute on Payment write
  fulfillmentType FulfillmentType @default(IN_STORE_COLLECTION)
  confirmedViaWhatsapp Boolean @default(false)   // highest-ROI RTO reducer
  totalMinor           BigInt @default(0)        // PKR paisa
  depositRequiredMinor BigInt @default(0)        // SOFT default, overridable
  // ... relations + @@index([branchId, orderStatus, createdAt])
}

model Payment {
  type   PaymentType          // DEPOSIT | BALANCE | FULL | COD
  method PaymentMethod        // RAAST | JAZZCASH | EASYPAISA | BANK_TRANSFER | ...
  amountMinor      BigInt
  grossMinor       BigInt?    // FBR 2025-26 settlement reconciliation
  taxWithheldMinor BigInt?
  netMinor         BigInt?
  status     PaymentRecordStatus @default(PENDING)  // screenshot → human VERIFIED
  senderName String?          // fake-screenshot fraud check
  @@index([status, collectedAt])                    // verification queue
}
```

### Generate / validate

```bash
# pooled URL for the app, direct URL for migrations
export DATABASE_URL="postgresql://...supabase.../postgres?pgbouncer=true&connection_limit=1"
export DIRECT_URL="postgresql://...supabase.../postgres"

npx prisma validate          # ✅ schema is valid
npx prisma format
npx prisma migrate dev       # at go-live (db push before then)
npx prisma generate
```

---

## Open items to confirm

- Canonical measurement key-set per garment type (sherwani vs prince coat) before standardizing `measurements` JSON.
- Whether to keep `BlogPost`/CMS tables unmigrated at launch (blog is MDX-in-git first) — build when a non-dev must publish.
- FBR mechanics for `gross/net/taxWithheld` — store now, confirm computation with a tax consultant before reconciling.
