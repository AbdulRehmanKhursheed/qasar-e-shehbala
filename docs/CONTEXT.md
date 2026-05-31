# Storefront — Quick Context

Fast orientation for working in this repo. Read this before re-reading source.

## What this is

The **public website** for Qasar-e-Shehbala (premium groom wear, Saddar Rawalpindi).
Deploys to **qasarshehbala.pk**. Git repo: `qasar-e-shehbala`. Vercel project: same name.
**No admin code lives here** — the merchant/admin portal is a separate repo (`qasar-merchant`).

## Stack

Next.js (App Router, RSC) · TypeScript · Tailwind v4 · Prisma · Supabase Postgres · MDX blog.
Design system: warm "parchment" theme — fonts Cormorant Garamond (display) + Plus Jakarta Sans (body); palette terracotta / wine / brass / sage on parchment+ivory. Tokens are CSS vars in `src/app/globals.css`, exposed as Tailwind colors (`bg-terracotta`, `text-charcoal`, etc.).

## Where things are

```
src/app/
  (site)/            all public pages (own layout: navbar + footer + WhatsApp FAB)
    page.tsx         home (hero, trust, collections, process, reviews, visit)
    collections/     /collections and /collections/[slug] (ISR, reads DB, CollectionPage JSON-LD, SEO copy footer)
    occasions/       /occasions and /occasions/[slug] — barat/walima/mehndi/nikah curated by category (SEO landing pages)
    products/[slug]  product detail (ISR, Product JSON-LD, specs, size chart, related, sticky mobile CTA)
    blog/            blog index + [slug] (MDX; byline + related posts)
    about, contact, appointments, measurement-guide (+ standard size chart), search
  api/
    leads/           POST → createLead
    appointments/    POST → createAppointment
    beacon/          POST → analytics event (sendBeacon target)
  layout.tsx         root: fonts, metadata, manifest, LocalBusiness + WebSite(SearchAction) JSON-LD
  sitemap.ts, robots.ts, manifest.ts
content/blog/        30 MDX articles (the blog CMS — git-managed); human-voiced, interlinked

Conversion/shopping components: components/product/{size-chart,product-specs,sticky-cta,whatsapp-cta,related via product-card}, components/ui/{trust-bar,reviews}.
Reference data in lib/constants.ts: SIZE_CHART, CATEGORY_SPECS, TRUST_POINTS, OCCASIONS, CATEGORY_SEO_COPY.
NOTE: reviews.tsx testimonial quotes are representative placeholders — replace with verbatim Google review excerpts.
Product detail fields beyond `description` are category-default (CATEGORY_SPECS), not per-product in the DB yet.
src/server/          DATA LAYER (read queries + public writes only)
  catalog/queries.ts          getProducts, getProductBySlug, search, categories, fabrics, slugs
  leads/ appointments/ customers/ analytics/  mutations (public form/beacon writes)
  db/client.ts                Prisma singleton + soft-delete extension
  db/safe-query.ts            wraps reads so the site builds even if DB is down
src/components/      ui/ layout/ product/ collection/ blog/ forms/ seo/
src/lib/             constants.ts (SITE = brand info), seo.ts (metadata + JSON-LD builders), utils.ts, image-loader.ts, analytics.ts
```

## Conventions (must follow)

- **Money** = integer paisa (`BigInt`, `*Minor`). Never floats. Format with `formatPKR`.
- **JSON-LD** is server-rendered via `<JsonLd>` — never client-injected.
- **Customer identity** = phone (E.164). `normalizePhone` in utils.
- Self-documenting code, minimal comments (explain *why*, not *what*).
- Commit messages: plain human English, **no AI/bot attribution**.
- Run `npm run build` (or `lint` + `typecheck`) before claiming done.

## Business model baked into the code

Conversion is **off-site via WhatsApp**, not on-site checkout. Every product/CTA opens a `wa.me` link (number in `SITE.whatsappNumber`) and fires a server-side lead beacon first. High-ticket groom wear → deposit-first, in-store fitting; courier/COD is the accessory tail only.

## Env (`.env.local`, git-ignored)

`DATABASE_URL` (pooled 6543), `DIRECT_URL` (5432), plus `NEXT_PUBLIC_*` in `.env.development`/`.env.production`. Supabase Singapore pooler host is `aws-1-ap-southeast-1`.

## Deploy

Push to `main` → Vercel auto-deploys. Build runs `prisma generate` first. Set env vars in the Vercel project (DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_*).

## Shared-with-merchant (keep in sync by hand)

`prisma/schema.prisma`, `src/server/db/*`, `src/lib/utils.ts`, `src/types/`. Change the schema here first, then mirror into the `qasar-merchant` repo.
