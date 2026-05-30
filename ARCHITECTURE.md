# Qasr-e-Shehbala — Architecture

> **Status:** Phase-1 design, agreed 2026-05-31
> **Business:** Made-to-measure groom wear & menswear (sherwani, prince coat, waistcoat), physical shop in Saddar, Rawalpindi since 1999. First digital presence.
> **Team:** Solo / tiny. Stack familiarity: React, Next.js, NestJS.
> **Goals:** fast execution · low ops · low initial cost · gradual scale · excellent SEO · integrated blog · Pakistan-market fit (COD/WhatsApp/deposit reality).

This document is the synthesis of a multi-agent design pass (4 market-research briefs + 5 design clusters) hardened by three adversarial critics (anti-overengineering, Pakistan market-fit, execution-speed). See [`docs/RESEARCH.md`](docs/RESEARCH.md) for the underlying research, sources, and the full record of what was cut and why.

---

## 0. The reframe everything hangs on

You are **not** building a checkout. For PKR 30k–300k made-to-measure groom wear:

1. **Conversion happens off-site, in WhatsApp**, through human negotiation of measurements/fabric/price. The website's job is discovery (SEO), trust, and a clean **logged handoff** that ends with a **deposit taken before fabric is cut**.
2. **Most first contact is NOT the website** — it's a referral, Instagram DM, phone call, or walk-in landing directly in WhatsApp with no web session. So **direct-inbound lead creation is the PRIMARY path**; web-origin leads are the minority.
3. **The biggest financial risk is RTO, not infra scale.** A returned cut-to-measure sherwani is a total loss. The defense is a **payment policy** (deposit-first, COD price-gated, never pure COD on custom), not code.
4. **Trust is a conversion requirement, not garnish.** A bare "pay 50% deposit" from an unknown site won't convert without visible since-1999 proof.

---

## Decision summary

| Area | Decision | Phase |
|---|---|---|
| Architecture | Modular monolith. **No microservices.** | 1 |
| App | **ONE Next.js App Router app. No separate NestJS at launch.** | 1 |
| Backend | NestJS extracted only on a concrete trigger | 2+ |
| DB | Supabase Postgres, Singapore, **pooled PgBouncer string only** | 1 |
| Media | Cloudflare R2 + Cloudflare Images, **Vercel image opt OFF** | 1 |
| ORM | Prisma | 1 |
| CMS | None — MDX-in-git blog + Postgres catalog | 1 |
| Admin | Supabase Studio + ONE custom big-button stage screen | 1 |
| Payments | Deposit-default, COD price-gated, screenshot+manual-verify | 1 |
| Fulfillment | In-store collection default; courier deferred | 1→2 |
| Auth | Auth.js, 2 roles | 1 |
| Analytics | GA4 + Search Console + server-side WhatsApp-click beacon | 1 |
| Monitoring | Sentry (FE) + 1 uptime ping | 1 |
| AI | ONE founder-in-the-loop "draft copy" button | 1 |

---

## 1. Monolith vs microservices — modular monolith

Microservices solve org/scaling problems a solo team selling a low-SKU catalog does not have, and they actively hurt here: the order lifecycle (`lead → confirmed_via_whatsapp → deposit_paid → in_production → ready_for_fitting → balance_paid → delivered`) is a **single ACID consistency domain** — fabric is cut-to-customer and the deposit must atomically tie to the order. Splitting it forces sagas/outbox for a shop doing tens-to-low-hundreds of orders/month.

**One app, one Postgres, one deploy.** Organize internally by domain module with clean seams.

**Do NOT build:** message broker, Kafka/RabbitMQ/SQS, k8s/Docker Swarm, service mesh, gRPC, saga/CQRS, per-service DBs, mandatory Docker in dev.

## 2. Next.js architecture

> **⚠️ Resolved contradiction (all 3 critics, HIGH):** the first design said "Next.js-only MVP" but elsewhere assumed a live NestJS API at launch. Building both = a second deploy target, second region, second connection-pool problem, for zero functional gain. **Resolution: Phase 1 is ONE Next.js app. No NestJS at launch.**

- **App Router + React Server Components** (not Pages Router) — puts SEO-critical JSON-LD + content in server HTML by default.
- **Rendering per template:** Home → ISR (hourly); Category/PDP → ISR + on-demand revalidation on edit; Blog/lookbooks → SSG (MDX); Admin/account → dynamic SSR + `noindex`.
- **Mutations** → Server Actions; **webhooks + the lead beacon** → Route Handlers. DB access via Prisma from server code, behind a **thin services layer** (the seam that makes a future NestJS extraction mechanical).
- **Extract NestJS only when** one is true: (1) WhatsApp Cloud API outbound worker, (2) scheduled jobs that don't fit Vercel cron, (3) background work blocking requests, (4) a stable API for a mobile app / in-shop POS.

**Two non-negotiable stack gotchas:**
- Use the **Supabase pooled PgBouncer (transaction-mode) connection string** from all serverless code — the direct string exhausts Postgres connections (the #1 production-breaker for this stack).
- **Disable Vercel image optimization** — on a high-res garment catalog it is the single most likely surprise bill. Serve/resize from R2 + Cloudflare Images.

## 3. NestJS structure (Phase 2+, when extracted)

Modules: `Catalog`, `Order` (owns the state machine; only it transitions order state), `Payment`, `Lead`, `Content`, `Media`, `Admin`, + a `shared/` kernel (Prisma client, config, `Money` value-object, auth guard). One app, one Postgres, in-process synchronous calls — no broker. Modules expose only `*.service.ts`; no cross-module table reaching. **At MVP this is just folder structure inside Next.js.**

## 4. PostgreSQL schema strategy — the minimal honest schema

> The execution critic cut the first-pass schema ~in half (it prescribed `TailoringJob` + `TailoringEvent` + `FittingAppointment` + `Shipment` + `StockLevel` + `ProductFabricOption` at MVP — weeks of CRUD before a single lead). **Ship 8 tables:**

`Customer · Product · ProductVariant · Order · OrderItem · Payment · Lead · OrderEvent`

Load-bearing decisions (cheap now, expensive to retrofit):
- **Money = PKR integer minor units (paisa)** in `BigInt` `*_minor` columns + a branded `Money` type that bans float math. A 1-paisa drift on a six-figure order across deposit+balance reconciliation is unacceptable.
- **Phone (E.164) = customer identity**, email optional. The WhatsApp number *is* the customer.
- **Snapshot measurements + price onto `OrderItem`** at order time (JSONB). A reusable measurement profile is convenience; the snapshot is the **contract of record**. (Defer the separate profile table; store inline at MVP.)
- **`Order` = total + an ordered list of `Payment`s**: `{ type: deposit|balance|full|cod, method, amount_minor, status, proof_url, verified_by, collected_at, gross_minor, tax_withheld_minor, net_minor }`. Support **only** deposit + balance + optional COD-balance — **not** a generic split engine.
- **Tailoring stage = a column** driven by a transition-map function + the single `OrderEvent` log. **Not** a separate entity with its own lifecycle until staff are tapping buttons at volume.
- **PKs:** take Prisma's default (`cuid`/`uuid`) + a human `order_ref` (`QES-2026-0412`). Don't burn time on UUIDv7 extensions.
- **Never soft-delete orders/payments** (immutable; cancel via status). One append-only `OrderEvent` log, not per-table history.
- **Migrations:** `prisma db push` against one DB while the schema churns pre-launch; switch to committed `prisma migrate` + a separate dev project at go-live.

Carry a defaulted `branch_id` on `Order` only (cheap multi-branch insurance — see §16).

## 5. CMS architecture — none

You are the sole editor and you write React. A headless CMS adds a vendor, a sync problem, and a second mental model for zero gain.
- **Blog/lookbooks = MDX in git.** Build-time lint on frontmatter (title, slug, description, ogImage, **required internal links** to product/category pages).
- **Catalog = your Postgres** (one source of truth, ISR revalidation hooks).
- **Homepage = a tiny `site_blocks` (key→JSON) table** with code-defined defaults.
- **Phase-2 trigger:** a non-technical person must publish without git → adopt **Payload** (Postgres-native, self-hostable) or **Sanity** (hosted). Avoid Strapi/Contentful.

## 6. Admin portal — one screen, not a dashboard

> Critics cut the two-tier, five-role, per-user-RBAC admin from MVP.

- **Supabase Studio (or a password-gated table view) = interim power admin** for product CRUD + payment verification.
- **Build exactly ONE custom screen:** the **big-button, mobile-first, bilingual (Urdu + Roman-Urdu) stage-update screen** — each tap advances the order to its legal next state (the state machine makes invalid states impossible) and surfaces a one-tap **"send WhatsApp update"** with a pre-filled bilingual message.
- **Device reality:** ONE shared front-desk phone/tablet, not a phone per karigar. Front-desk advances stages on behalf of tailors, recording which karigar did the work via a picker. **No per-karigar logins.** Reserve per-user auth for **money-touching actions** (payment verification) where attribution is a fraud control.
- **Roles at launch: two** (owner, staff). Expand to five when a real 2nd/3rd staffer logs in.

## 7. Inventory management — two semantics, one is "none"

- **Made-to-order hero products (sherwani, prince coat) have NO stock.** Their scarce resources are tailor time and sometimes fabric. Never `stock = 9999`.
- **Accessories = a single `on_hand` integer** on the variant, edited manually. **No reserved counter, no concurrency transaction, no release sweep** (two staff won't race at tens of orders/month). `StockLevel` becomes a real, branch-scoped table only if overselling actually happens.
- **Fabric tracking is OPTIONAL** — many Saddar tailors buy per-order from the market; forcing meter-level entry is data karigars won't enter.

## 8. Tailoring workflow

Keep the **model honest, the UI/automation dumb-simple.**

- Stages: `ENQUIRY → MEASURED → DEPOSIT_PAID → CUTTING → STITCHING → FITTING → (REWORK loop) → FINISHING → READY → DELIVERED`, terminal `CANCELLED`. Transitions enforced in the service layer.
- **One hard rule:** can't enter `CUTTING` without a **verified deposit** (fabric is non-recoverable).
- At MVP: a **stage column + `OrderEvent` rows**, not a separate entity trio. Photos-per-stage and dedicated tables are Phase 2.
- **Out-of-city / remote MTO** (groom in Lahore/Dubai) is real, growing, highest-dispute. Add `measurement_method (in_store | self_measured | from_old_garment)`, a **higher deposit floor**, and a rule: remote = prepaid-in-full or balance-before-dispatch, **never COD**.
- **Seasonal guardrail:** over-promising delivery dates during peak is the **#1 dispute cause**. Add **one editable number** — "current lead time: N working days" — that auto-populates `promised_ready_date` and WhatsApp messages. Not a scheduling engine.

## 9. Order lifecycle

Two orthogonal status dimensions (collapsing them creates impossible states):
- `order_status`: `LEAD → CONFIRMED → IN_PROGRESS → READY → DISPATCHED → DELIVERED` (+ `CANCELLED`, `RTO`)
- `payment_status` (derived from the Payment list, stored denormalized, **recomputed in one service method on every Payment write**): `UNPAID → DEPOSIT_PAID → PARTIALLY_PAID → PAID → REFUNDED`

Rules:
- **`confirmed_via_whatsapp` is a first-class field** — the single highest-ROI RTO reducer (~30% → ~18–22%). One-tap action.
- **Direct-inbound is first-class:** an Order frequently *starts* as a `LEAD` created by staff from a phone number; `source ∈ {direct_whatsapp, referral, walk_in, instagram, web}`; `QES` ref generated at that moment.
- **Deposit is negotiated, not computed:** `deposit_required` is a **soft default with recorded manager override** — not a hard gate. Over-rigid enforcement makes the shop floor abandon the software. The only hard gate is CUTTING-needs-deposit.
- **In-store collection is the default `fulfillment_type`;** `SHIP` is the exception. `Shipment` table + courier integration deferred to Phase 2 (a `dispatched_at` + note field covers MVP).

## 10. SEO architecture — the real moat

- **Server-render all JSON-LD in Server Components** (never client-injected): `Product` on PDPs, `Article` on posts, site-wide **`LocalBusiness`/`ClothingStore`** (Saddar NAP, geo, hours, WhatsApp, `sameAs`), `BreadcrumbList`.
- `app/sitemap.ts` + `app/robots.ts`; **`alternates.canonical` on every route** (self-canonicalize filtered/paginated category URLs).
- Flat keyword-bearing slugs (`/sherwani/black-velvet-embroidered`); `redirects` table for renames (301).
- **CWV budget** for congested PTCL 4G: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Highest-ROI organic channel = Google Business Profile + local pack + reviews**, not national catalog ranking. Local-intent slugs ("sherwani tailor Rawalpindi") = low competition, high intent. Measure WhatsApp clicks / calls / direction-requests, not on-site "purchases."
- **Bilingual:** one English-primary site, **no hreflang, no Urdu-script subsite.** Weave Roman-Urdu inline into copy/FAQ/alt-text. **But make WhatsApp message templates Urdu/Roman-Urdu.**

## 11. Media storage

- **Originals in Cloudflare R2** (zero egress). Upload via **presigned PUT** (browser → R2 directly).
- **Serve via Cloudflare Images** (managed resize + AVIF) with a simple `next/image` custom loader. (Skip the bespoke Worker transform + perfectly-tuned srcset — managed is the fast choice.)
- **Vercel image optimization OFF. Alt text = required manual field at upload** (AI alt-text is a Phase-2 batch script, not a vision call on the fragile upload path).
- Video → **YouTube embed** (free + discovery channel), lazy/poster-loaded.

## 12. Deployment

| Component | Phase 1 | Region |
|---|---|---|
| Next.js app | Vercel Hobby (free) behind Cloudflare DNS/WAF | functions near DB |
| Database | Supabase free tier, **pooled string** | **Singapore** (~88ms vs ~172ms US) |
| Media | Cloudflare R2 + Cloudflare Images | edge |
| CI/CD | git push → Vercel auto-deploy, preview-per-PR, instant rollback | — |

**Singapore for every stateful component — never accept US/EU defaults.** Cloudflare's Pakistan PoPs are DNS/WARP-only (content from Singapore), so lean on SSG/ISR + long cache-control so crawled/viewed bytes are edge-cached.

## 13. Cost optimization

Start **$0–7/mo**; let cost track revenue. **The dominant cost lever is RTO loss, not infra** → the deposit-first policy is the cheapest "infrastructure" decision. Infra traps ranked: (1) Vercel image optimization → kill it; (2) Vercel bandwidth → R2 + Cloudflare cache; (3) egress → R2's $0 egress; (4) WhatsApp Cloud API per-message fees (rising in PK Apr 2026) → stay on free Business App; (5) COD's 2% WHT + slow remittance.
**Pay for:** domain, Supabase Pro ($25) when outgrown, always-on instance only when NestJS is extracted, gateway fees only on the card slice. **Don't pay for:** Cloud API messaging, managed Redis/search, paid CMS, image SaaS beyond Cloudflare.

## 14. Scalability roadmap — react to measured thresholds

Operational throughput breaks before compute. Ordered next-steps: (1) DB free-tier hurts → Supabase Pro; (2) Vercel Hobby bites → Vercel Pro + caching; (3) manual pinging stops scaling → **WhatsApp Cloud API + NestJS worker**; (4) background work blocks requests → one worker + Upstash Redis; (5) PaaS bills > VPS → consolidate to one Singapore VPS; (6) DB CPU → read replica before any sharding. **Pre-warm plans before the Aug–Sep ramp.** Tie every step to a named metric.

## 15. Security

- **Auth.js (NextAuth v5)**, email+password, Supabase-backed. Not Clerk (per-MAU cost), not hand-rolled JWT.
- **RBAC enforced server-side** (the UI is paint). Two roles at launch.
- **Store ZERO card data** — delegate to gateway hosted links → no PCI scope.
- **Measurements + phone/address = PII** — role-restricted, no public API, never logged/emailed.
- OWASP 80/20: ORM (SQLi), output-encoding (XSS), CSRF on admin mutations, validated/size-limited uploads in R2 (never executed), security headers + Cloudflare WAF, **rate-limit auth + lead/beacon + upload endpoints**. **TOTP MFA on the owner account.**
- **COD-fraud = process, not ML:** deposit-before-cut, WhatsApp-confirm-before-dispatch, COD price-gated, flag repeat-RTO numbers, store sender-name/account-tail per payment.
- **Screenshot + manual verify = the first-class default deposit flow** (most deposits arrive as JazzCash/Easypaisa/IBAN transfer + screenshot). Raast (0% MDR, T+1) is a fraud-reducing bonus when used — don't architect cost around it.

## 16. Multi-branch future

One shop = **location-scoping, not multi-tenancy.** A single `Branch` table (seed one row) + a defaulted `branch_id` on `Order` now. Keep `Product`/`Customer`/measurements **global** (a groom measured at one location collects at another). **Never** build schema-per-tenant, RLS isolation, inter-branch transfers, or per-branch pricing.

## 17. Analytics

Conversion is off-site, so standard GA4 ecommerce will look broken.
- **GA4 + Search Console** only at launch.
- **Primary conversion = `whatsapp_click`, captured server-side:** on tap, `navigator.sendBeacon` → Route Handler writes a `leads` row keyed by `reference_id` **before** opening `wa.me`. The server beacon is the durable, trustworthy record (client analytics is lossy) and doubles as CRM-lite.
- ~8 events max; **instrument GBP call/direction actions** (the top local channel).
- The real funnel is the **DB order-stage progression**, not GA4 revenue.

## 18. Logging & monitoring — signal, not a platform

- **Sentry on the Next.js app** (PII scrubbing in `beforeSend`) + **one free uptime ping** (UptimeRobot). That's it.
- Skip Pino/correlation-IDs/`/health` until NestJS exists. Skip ELK/Grafana/Prometheus — *an unmonitored Grafana stack is worse than none.*
- **Rely on Supabase managed backups at launch.** (Critics unanimously cut the pg_dump-to-R2 + monthly restore-verification cron from the critical path; add an independent copy + a manual quarterly restore check once data is worth protecting.)

## 19. AI integration

**Phase 1 = exactly ONE use:** a founder-in-the-loop **"draft product description / blog outline"** button (a Claude API call with brand-voice + Roman-Urdu guidance; you edit before publish). Directly unblocks the unique-copy SEO requirement a solo founder can't hand-write at volume.

Deferred/ranked: auto-alt-text → Phase-2 batch; WhatsApp FAQ draft-replies (human-approved) → Phase 2; size/fit → rules table first; demand forecasting → SQL/calendar beats a model; semantic search → skip until catalog is large; **virtual try-on → skip.**
**Refuse:** an auto-send WhatsApp chatbot — the conversation *is* the product; a bot erodes trust and risks bans. AI belongs on your side (content), not facing the customer.

## 20. Future ERP evolution

Don't buy/build an ERP — **grow the modular monolith module-by-module** as pain appears (Phase 2: Procurement/Fabric + karigar piece-rate; Phase 3: payroll, multi-branch stock, CRM). **Buy accounting/GST, never build it** (regulated, solved, liability-heavy). The app stores `gross/net/tax_withheld` and exports to your accountant. The bridge is **data continuity**, not a platform purchase.

---

## Phased roadmap — the ONE thing each phase must nail

| | **Phase 1 — Launch (~$0–7/mo)** | **Phase 2 — Growth (~$25–60/mo)** | **Phase 3 — Scale** |
|---|---|---|---|
| **Nail** | Logged web→WhatsApp handoff **+ direct-inbound capture + deposit taken + trust surface** | Operational reliability: templated comms + production tracking | A true operations system (procurement+payroll+accounting), **no rewrite** |
| Adds | SEO storefront, MDX blog, manual payments, big-button stage screen | Cloud API + templates, embedded checkout, 1 courier, NestJS extracted, fabric/piece-rate | Multi-branch stock, CRM, accounting API, VPS consolidation if justified |

## Realistic 8–12 week build

- **Wk 1–2:** Next.js repo, Supabase (Singapore, pooled), Prisma `db push`, 8-table schema, `Money` type, phone-identity, Vercel behind Cloudflare, R2 + Cloudflare Images (Vercel opt OFF).
- **Wk 3–4:** PDP/category ISR with server-rendered Product + LocalBusiness JSON-LD, sitemap/robots, **wa.me deep-link + sendBeacon lead capture + 2-tap direct-inbound lead form** (the revenue mechanism).
- **Wk 5–6:** MDX blog + 6–10 seed evergreen posts with internal links, AI draft button, **trust surface** (since-1999 story, shop/owner photos, Maps embed, deposit/refund/alteration policy page), GA4 + Search Console + GBP, Sentry + uptime ping.
- **Wk 7–8:** the one big-button stage screen behind Auth.js (single role), manual Payment recording, deposit/COD policy in the service layer, freeze schema → migrations, **FBR registration in flight. → LAUNCH ~wk 8.**
- **Wk 9–12:** thin custom product-edit form if Supabase Studio chafes, front-load content before Aug–Sep ramp, harden, measure WhatsApp-click/GBP metrics.

## Do NOT build initially

Microservices · message broker · k8s/Docker · separate NestJS service · on-site card checkout · WhatsApp Cloud API · headless CMS · `Shipment`/`StockLevel`/`TailoringJob`/`FittingAppointment` tables · reservation engine · multi-courier · per-karigar logins · 5-role RBAC · pg_dump/restore-verification cron · ELK/Grafana/Pino · UUIDv7 fuss · vision-auto-alt-text on upload · AI chatbot/vector search/try-on · ERP modules · multi-tenancy · Urdu-script subsite/hreflang · in-house accounting.

## Non-code launch gates

1. **FBR sales-tax registration** is a go-live prerequisite under the 2025–26 regime — confirm *your* shop's actual obligation with a Pakistani tax consultant. Keep nullable `gross/net/tax_withheld` columns; defer reconciliation logic.
2. **The trust surface is a conversion requirement** — real shop/owner/karigar photos, WhatsApp-verifiable number, genuine testimonials, plain deposit/refund/alteration policy.

## Open items to confirm before/at launch

- Raast P2M merchant acceptance & 0% MDR window (SBP subsidy, policy-dependent).
- Safepay/PayFast onboarding docs for a 1999-established but newly-registered entity.
- Exact FBR obligation for a single-shop, mostly in-store/deposit business.
- Business WhatsApp number/SIM for the Business App + wa.me links.
- Test wa.me deep links with Urdu text + newlines on real Android & iOS.
