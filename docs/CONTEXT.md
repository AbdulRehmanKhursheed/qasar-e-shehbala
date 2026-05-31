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
    page.tsx         home
    collections/     /collections and /collections/[slug] (ISR, reads DB)
    products/[slug]  product detail (ISR, reads DB, Product JSON-LD)
    blog/            blog index + [slug] (MDX from content/blog/)
    about, contact, appointments, measurement-guide, search
  api/
    leads/           POST → createLead
    appointments/    POST → createAppointment
    beacon/          POST → analytics event (sendBeacon target)
  layout.tsx         root: fonts, metadata, manifest, LocalBusiness JSON-LD
  sitemap.ts, robots.ts, manifest.ts
content/blog/        30 MDX articles (the blog CMS — git-managed)
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
