# Qasr-e-Shehbala — Market Research & Decision Log

> Compiled 2026-05-31 from a multi-agent research + design pass. This is the evidence base behind [`../ARCHITECTURE.md`](../ARCHITECTURE.md).
> **Confidence tags:** `[HIGH]` corroborated across sources · `[MEDIUM]` directional. Treat all pricing/tax/latency figures as 2025–2026 estimates to **re-verify before relying on them**.

## Contents
1. [Payments, COD & made-to-order tailoring](#1-payments-cod--made-to-order-tailoring)
2. [WhatsApp-driven conversion](#2-whatsapp-driven-conversion)
3. [Cheap, low-ops hosting for Pakistan](#3-cheap-low-ops-hosting-for-pakistan)
4. [SEO & content strategy](#4-seo--content-strategy)
5. [Adversarial review — what we cut and why](#5-adversarial-review--what-we-cut-and-why)

---

## 1. Payments, COD & made-to-order tailoring

**Key findings**

- `[HIGH]` **COD is ~80%+ of Pakistani ecommerce, but it's the wrong default for high-ticket groom wear.** The 80%+ share is irrelevant as a target for PKR 30k–300k items — cash-flow exposure, doorstep rejection, and fraud on a single high-value parcel are catastrophic, not statistical. (One viral "93.7%" figure is a LinkedIn post; use ~80%+.) — *trackmyorder.pk*
- `[HIGH]` **RTO is brutal:** industry 20–35%, fashion frequently >40%, ~8–10% of COD orders outright fake. Prepaid RTO is only 4–8% vs 20–30% for COD. A returned cut-to-measure sherwani is unsellable + two-way courier cost → high-ticket COD is effectively **uninsurable** for a small merchant. — *trackmyorder.pk*
- `[HIGH]` **The two proven RTO levers:** WhatsApp confirmation before dispatch (cuts RTO 30–35% → 18–22% within a month) and a partial advance. Pakistani merchants already require advances on high-value/custom orders (e.g. Wear Zone Karachi requires 15% advance above PKR 20,000). — *fulfillkaro.pk*
- `[HIGH]` **Made-to-order tailoring is universally advance-deposit + balance on fitting/delivery**, ~10–15 working-day sherwani lead times. The deposit must cover non-recoverable fabric + labor (fabric is cut to the customer). — *lawrencepur.com* and established bespoke houses (A Moosajee Sons, Bari & Sons est. 1974).
- `[HIGH]` **Raast P2M = cheapest digital rail:** 0% MDR currently, T+1 settlement, SBP subsidy Sept 2025–June 2026 (intended ~3 years). JazzCash & Easypaisa have integrated it. No gateway integration required to start taking deposits. — *sbp.org.pk*
- `[HIGH]` **Safepay = realistic card/wallet aggregator:** ~2.9% + Rs 30 domestic, ~2–3 day settlement, accepts sole proprietors/freelancers, ~1–2 wk onboarding, **no-code payment links shareable over WhatsApp**. PayFast/Paymob comparable; PayFast supports Raast. — *safepay.helpscoutdocs.com*
- `[HIGH]` **Courier COD remittance is slow** (Leopards/M&P/Trax ~10–15 days; TCS ~3 days). **PostEx pays COD upfront/instantly** (logistics+fintech). All expose merchant APIs. For high-ticket, avoiding COD matters more than remittance speed. — *xstak.com*
- `[MEDIUM]` **2025–26 FBR tax regime:** payment intermediaries withhold **1%** on digitally-paid orders, couriers withhold **2%** on COD, **plus 2% sales tax at source**; **every online seller must register for sales tax** (bar cottage-industry exemptions). COD now carries a higher tax drag than digital — another reason to push deposits. — *kpmg.com*
- `[HIGH]` **Manual bank/wallet transfer + screenshot confirmation is a legitimate Phase-1 rail**, not a hack — it matches how trust is built offline, needs zero gateway onboarding. It's fraud-spoofable (fake screenshots), so it stays a documented manual-verification step. — *getsafepay.pk*

**→ Architecture impact:** multi-stage `Payment` model (deposit/balance/full/cod); deposit-default with COD price-gated and **never pure COD on custom high-ticket**; Raast/transfer/Safepay-link for deposits; one courier (PostEx/TCS) for the accessory tail only; store `gross/net/tax_withheld` per payment; FBR registration is a go-live gate.

**Caveats:** Raast 0% MDR is subsidy/policy-dependent — re-verify. FBR mechanics are recently enacted and still settling — confirm with a tax consultant. RTO % are merchant-education benchmarks (directional), dominated by low-ticket data. Safepay limits for unregistered sole-props are case-by-case.

---

## 2. WhatsApp-driven conversion

**Key findings**

- `[HIGH]` **Use the FREE WhatsApp Business App at launch, not the Cloud API.** The App (catalog up to 500 items, quick replies, labels, away/greeting messages) captures essentially all the value for a low-SKU, high-touch business at zero cost. The wa.me **click-to-chat handoff needs no API at all.** The Cloud API (automation, multi-agent inbox, bulk, templates, per-message fees) only earns its place at volume. — *gurusup.com*
- `[HIGH]` **The handoff = a `wa.me` deep link with a URL-encoded pre-filled message** (`https://wa.me/<92...>?text=<encoded>`). Use `encodeURIComponent` (handles Urdu/newlines). Recipient needn't save the number. Click-to-chat reportedly converts 5–15% vs 1–4% web checkout (vendor data — motivation, not forecast). Place below price + a sticky button + a printable QR for the shop. — *greenbubble.io*
- `[HIGH]` **Embed full structured context in the message** — a reference ID (`QES-2026-0412`), product+SKU, fabric/color, size/"will share measurements", product URL. **wa.me cannot prefill images** → include image URL or rely on the catalog. **Fire a beacon/POST to your DB before navigating** so a lead exists even if the chat never starts. — *appsflyer.com*
- `[MEDIUM]` **Keep the WhatsApp catalog manual/optional** — the website is the canonical catalog; WhatsApp is the closing channel. Keeping ordering conversational also sidesteps Meta Commerce-Policy grey areas around selling custom "services". — *wappbiz.com*
- `[HIGH]` **The realistic funnel:** browse web → tap Order-on-WhatsApp (with context) → human chat (measurements/fabric/price) → deposit → tailoring → fitting → delivery. The website should **not** be a hard checkout; capture name/phone/product/size/city + ref ID as a CRM-lite lead. — *brandbuilders.com.pk*
- `[HIGH]` **Automated outbound notifications need the Cloud API + approved utility templates** (billed per message, outside the 24h window). At launch, send status updates **manually** from the Business App inside the thread (free, in-window). — *egrow.com*
- `[MEDIUM]` **Meta moved to per-message pricing (Jul 1 2025); Pakistan rates rise Apr 1 2026.** In-window customer-initiated replies stay free. Reinforces "stay manual until volume justifies API." — *ycloud.com*

**→ Architecture impact:** reusable `<OrderOnWhatsApp>` component building the wa.me link from an env `BUSINESS_PHONE`; server-side lead beacon before navigation; `leads` table keyed by ref ID mirroring the order-stage vocabulary (so a later Cloud API fires templates on the same transitions with no schema rework); manual notifications via Business App at launch.

**Caveats:** API per-message prices vary widely across sources & change Apr 2026 — confirm with a BSP. Test wa.me with Urdu text + newlines on real Android/iOS. Mass outbound from the unofficial app risks bans — that's the boundary where the official API becomes necessary.

---

## 3. Cheap, low-ops hosting for Pakistan

**Key findings**

- `[HIGH]` **Singapore is the closest viable region** (Karachi→Singapore ~88ms vs ~122ms Amsterdam, ~172ms US-East, ~212ms US-West). Pick Singapore (or Mumbai) for any always-on origin. Default regions (Vercel `iad1`, Hetzner Germany) are worst-case. — *zenlayer.com*
- `[HIGH]` **Biggest latency trap:** Cloudflare's Pakistan PoPs (KHI/LHE/ISB) are **DNS/WARP-only**; cached content actually serves from Singapore. 2025 submarine-cable cuts hit PTCL-routed users. Static caching still helps (edge HTML from SIN at ~88ms beats an unoptimized US origin), but there is **no reliable sub-20ms in-country edge today.** — *community.cloudflare.com*
- `[HIGH]` **SSG/ISR content is edge-cached regardless of compute location**, so SEO-critical pages are fast on either Vercel Hobby (free, 100GB/mo) or Cloudflare Pages (free static bandwidth). — *developers.cloudflare.com*
- `[HIGH]` **Vercel = fastest to ship, free at Hobby, but image optimization + bandwidth are the classic surprise bill** (Pro $20/mo). **Mitigation: serve images from R2/Cloudflare Images and disable Vercel image optimization.** — *vercel.com/docs*
- `[HIGH]` **Cloudflare R2 = best media store** ($0 egress; $0.015/GB-mo). Backblaze B2 is cheaper to store but charges egress. Cloudflare Images ~$5/100k stored, ~$1/100k transforms — cheaper/lower-ops than self-hosted Sharp. — *taloflow.ai*
- `[HIGH]` **Supabase > Neon for this stack** (Postgres free 500MB/50K MAU, built-in PgBouncer, Singapore/Mumbai regions; Pro $25 = 8GB, no auto-pause). **A serverless/always-on app MUST use the pooled PgBouncer transaction-mode string** or exhaust connections. — *supabase.com/docs*
- `[HIGH]` **A NestJS API (when extracted) wants always-on hosting** (warm pool, no cold start): Render Starter $7, Railway ~$5, or a small VPS — all Singapore. — *fly.io/pricing*
- `[MEDIUM]` **VPS:** Hetzner cheapest-per-resource but cheap tiers are EU-only; Singapore VPS (DO SGP1 ~$24, Hetzner SG pricier) co-locating API+DB is lowest absolute cost but you own backups/patching/uptime.
- `[MEDIUM]` **For a low-ops solo dev, managed PaaS beats a VPS as the starting point** — the few dollars saved aren't worth the ops burden. Consolidate to a VPS only when bills exceed it. — *railway docs*
- `[HIGH]` Pakistan reality (COD-dominant + WhatsApp) means **checkout complexity should NOT be Phase 1.** Build SEO catalog + a lightweight COD/WhatsApp lead form. — *atnrco.com*

**→ Architecture impact:** Vercel Hobby + Cloudflare DNS + Supabase (Singapore, pooled) + R2/Cloudflare Images, Vercel image opt OFF; ~$0–7/mo; scale-up = Supabase Pro → Vercel Pro → Cloud API/worker → VPS consolidation.

**Caveats:** latency figures are typical-path and vary by ISP/cable health. Cloudflare PoP routing may change. Free tiers/prices shift frequently (Fly removed free tier 2026; Hetzner +prices Apr 2026; Neon repriced) — confirm at signup. This optimizes for solo/low-ops/SEO-first — not for payment-heavy or multi-region-failover needs.

---

## 4. SEO & content strategy

**Key findings**

- `[HIGH]` **Google Business Profile is the single highest-leverage organic channel** for a physical shop, and **reviews are the dominant local ranking factor** — steady velocity (1–2/week) beats bursts; 100+ photos → ~520% more calls; top local-pack ~17.6% CTR. Top-3 map pack takes ~3–6 months. Build a WhatsApp/QR review-request flow into the in-store handoff. — *stradigi.org*
- `[MEDIUM]` **~40% search in Roman Urdu**, mostly under-served by English-only competitors. Keep English primary on-page; **layer Roman-Urdu into FAQs/blog/alt-text/synonyms** ("sherwani ki qeemat", "dulha ki sherwani"). No separate Urdu-script subsite. — *seopakistan.com*
- `[HIGH]` **Demand peaks Oct–Feb ("Decemberistan"), shifting earlier to October; content/query spike is Aug–Sep** (grooms research/book 1–3 months ahead). Build evergreen guides refreshed annually. — *aljazeera.com*
- `[MEDIUM]` **Keyword tiers:** local-tailoring (highest priority, lowest competition: "sherwani tailor Rawalpindi"); product/category (medium, dominated by HSY/Arsalan Iqbal/Dulha House); informational ("sherwani vs prince coat", "how to measure"). **The moat = local + made-to-measure + since-1999 heritage** — big designers can't credibly claim it. — *dulhahouse.net*
- `[HIGH]` **Next.js: SSG/ISR for catalog+blog, SSR only for cart/search.** Merchant-listing/Product structured data **must be in server HTML** — App Router server components render JSON-LD server-side by default; never client-inject it. — *developers.google.com*
- `[HIGH]` **Technical SEO in App Router:** Metadata API (static `metadata`; `generateMetadata` only for dynamic routes), absolute `alternates.canonical` on every paginated/filtered route, `app/sitemap.ts` + `app/robots.ts`, `next/image` with explicit dimensions + keyword-rich alt text (Google Images/Lens is a fashion discovery channel). CWV (LCP/INP/CLS) are ranking factors. — *nextjs.org*
- `[HIGH]` **Three schema types:** `Product` (merchant listing, PKR price/availability, apparel sizing) on PDPs; `Article` on posts; site-wide `LocalBusiness`/`ClothingStore` + `Organization`. Add `aggregateRating`/review **only with genuine reviews** (fabrication violates policy). Star snippets are increasingly not shown — treat as bonus. — *developers.google.com*
- `[MEDIUM]` **A compounding blog is the cheapest organic moat — but only if posts internally link into product/category pages.** Pillars: comparison, how-to-measure (also an RTO reducer), fabric guides, event styling, real-wedding lookbooks. Cadence: 2–4 deep evergreen posts/month, front-loaded before Aug–Sep, refreshed annually. Write once, distribute three ways (web + WhatsApp + Instagram). — *goinflow.com*
- `[HIGH]` **Top SEO-killers:** thin/duplicate product pages (→ unique 2–4 sentence description per product + 150–300 words per category), JS-rendered structured data, ignoring local intent. — *delante.co*

**→ Architecture impact:** ISR catalog + SSG blog, server-rendered JSON-LD, sitemap/robots, canonical discipline; GBP as priority-zero; MDX blog with mandatory internal links + unique-copy quality gate; measure WhatsApp clicks / calls / GBP actions, not on-site purchases.

**Caveats:** no live keyword-volume data retrieved — validate terms in Keyword Planner/Search Console post-launch. Several CTR/CWV stats are vendor-reported (directional). The ~40% Roman-Urdu figure is agency content (direction sound, exact % uncertain).

---

## 5. Adversarial review — what we cut and why

Three critics (anti-overengineering, Pakistan market-fit, execution-speed) pressure-tested the first-pass design. The biggest finding and the cuts:

### 🔴 The contradiction (all three critics, HIGH)
The first-pass design said **"Next.js-only MVP, don't build NestJS"** in the architecture section, then **assumed a live NestJS API at launch** in the ops/security and roadmap sections (signed tokens, Pino, `/health`, "NestJS on Render/Railway as a Phase-1 deliverable"). A solo founder following it literally would deploy **two services** for v1 — a second deploy target, second Singapore region, second connection pool — for zero functional gain, and weeks of delay past the Aug–Sep ramp.
**Resolution: Phase 1 is ONE Next.js App Router app. No NestJS at launch.** Server layer is folder-shaped like the future Nest modules so extraction stays mechanical.

### Cut from Phase 1 (deferred to a named trigger)
| Cut | Why | Re-add when |
|---|---|---|
| Separate NestJS service | Second deploy/region/pool for no gain | Cloud API worker / cron / mobile API needed |
| `TailoringJob` + `TailoringEvent` + `FittingAppointment` | Dual state machines + 2 event logs before a single sale | Staff tap stages at volume |
| `Shipment` table + RTO state machine | No courier at MVP; hero product is in-store collection | Courier integrated (Phase 2) |
| `StockLevel` + reserved counter + release sweep | Hero products are made-to-order (no stock); accessories won't race | Real overselling occurs |
| Two-tier admin + 5 roles + per-user RBAC + edge middleware | 1–3 users at launch; Supabase Studio covers power-admin | 2nd/3rd staffer logs in |
| Per-karigar logins | One shared front-desk device; karigars won't log in | — (keep per-user auth for money actions only) |
| pg_dump-to-R2 + monthly restore-verification cron | Ops theater at near-zero data; Supabase backs up | Data worth belt-and-suspenders (manual quarterly check) |
| Sentry-on-backend + Pino + correlation IDs + `/health` | Presumes NestJS exists | NestJS extracted |
| Module table prefixes + "mirror Nest folders" ceremony | A constant tax buying an option likely never exercised | — (keep: all DB access behind a function) |
| UUIDv7 everywhere | Setup tax; the human `order_ref` already covers public IDs | — (take Prisma's default) |
| Vision auto-alt-text on upload path | Moving part on the fragile upload flow | Phase-2 batch script |
| Committed migrations + separate dev project pre-launch | Ceremony while schema churns with zero data | At go-live (`db push` until then) |
| Embedded card checkout | Wrong Phase-1 path for the market | Phase 2 (Safepay embedded) |

### New requirements the market-fit critic ADDED (were missing)
- **Direct-inbound (WhatsApp/call/walk-in) is the PRIMARY lead path** — create a lead from a phone number in 2 taps, generate the `QES` ref at that moment. Web-origin leads are the minority; the wa.me/sendBeacon bridge only fires for them.
- **Trust surface is a Phase-1 conversion requirement** — since-1999 story, shop/owner/karigar photos, Maps embed, real WhatsApp number, **plain deposit/refund/alteration policy page**, genuine testimonials. Deposit-first stalls without it.
- **In-store fitting/collection is the default fulfillment**; courier is the exception (accessory tail).
- **Out-of-city / remote MTO** needs a `measurement_method` field, higher deposit floor, and prepaid/no-COD rule (highest-dispute scenario).
- **Deposit amount is negotiated per customer** — soft default + recorded override, not a hard computed gate (over-rigid enforcement makes the floor abandon the software). One hard rule only: CUTTING needs a verified deposit.
- **Screenshot + manual-verify is the first-class default deposit flow**; Raast is a bonus when used — don't architect cost around 0% Raast volume that may not materialize. Store sender name/account-tail to catch repeat fake screenshots.
- **Seasonal lead-time guardrail** — one editable "current lead time: N days" number (over-promising during peak is the #1 dispute cause).
- **Bilingual WhatsApp message templates** (Urdu/Roman-Urdu) even though the site is English-primary — that's where the trust-laden conversation happens.

### Kept (load-bearing, all critics agreed)
App Router + RSC + server-rendered JSON-LD + ISR/SSG · pooled PgBouncer string · Vercel image opt OFF + R2 · no on-site checkout (WhatsApp + deposit link) · `Money` as PKR integer minor units + branded type · multi-stage `Payment` model + deposit-default/COD-gated/never-pure-COD-on-custom policy · phone-as-identity · snapshot measurements+price onto the order line · `confirmed_via_whatsapp` first-class · server-side lead beacon keyed by `QES` ref · MDX-in-git blog with mandatory internal links + the one AI "draft" button · `gross/net/tax_withheld` columns + FBR registration gate · buy accounting, never build · reactive threshold-gated scaling.
