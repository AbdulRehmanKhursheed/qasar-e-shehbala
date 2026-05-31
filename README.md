# Qasr-e-Shehbala

Ecommerce and tailoring platform for a premium Pakistani menswear house — made-to-measure sherwani, prince coats, and groom wear, crafted in Saddar, Rawalpindi since 1999.

The product is built around how high-ticket groom wear actually sells in Pakistan: customers discover the brand through search and referrals, the conversation and order happen over WhatsApp, and a deposit is taken before any fabric is cut. The website's job is discovery, trust, and a clean hand-off to WhatsApp — not a one-click checkout.

## Highlights

- **Storefront** — home, collections, product pages, blog, about, contact, appointment booking, search, and a measurement guide. Server-rendered, SEO-first, fast on Pakistani mobile networks.
- **WhatsApp-first conversion** — every product has an "Order on WhatsApp" action that logs a lead server-side before opening the chat, so no enquiry is lost.
- **Admin portal** — dashboard, orders, tailoring workflow, leads, and more, behind authentication.
- **Tailoring workflow** — an explicit state machine (enquiry → measured → deposit → cutting → stitching → fitting → ready → delivered) with a big-button, bilingual interface for shop-floor staff.
- **SEO** — server-rendered structured data (Product, Article, FAQ, LocalBusiness, Breadcrumb), dynamic sitemap and robots, and a content engine with six launch articles.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Content | MDX (blog) |
| Auth | JWT sessions (jose) + bcrypt |
| Media | Cloudflare R2 + Cloudflare Images |
| Hosting | Vercel |

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- A PostgreSQL database (Supabase recommended, Singapore region for Pakistan latency)

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Used by | Required |
| --- | --- | --- |
| `DATABASE_URL` | App (pooled connection) | Yes |
| `DIRECT_URL` | Migrations | Yes |
| `NEXT_PUBLIC_SITE_URL` | Storefront (canonical URLs, metadata) | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Storefront (wa.me links) | Yes |
| `NEXT_PUBLIC_PHONE` | Storefront (contact) | Yes |
| `NEXT_PUBLIC_EMAIL` | Storefront (contact) | Yes |
| `NEXT_PUBLIC_CF_IMAGES_URL` | Storefront (image delivery) | Recommended |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Storefront (analytics) | Optional |
| `AUTH_SECRET` | Admin authentication | Yes for admin |
| `CLOUDFLARE_R2_*` | Admin media uploads | Yes for admin uploads |

### 3. Set up the database

```bash
npm run db:push     # apply the schema
npm run db:seed     # seed a branch, owner account, categories, fabrics, and sample products
```

The seed creates an owner login: `owner@qasrshehbala.pk` / `changeme123`. **Change this password before going live.**

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (generates the Prisma client first) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |
| `npm run db:push` | Sync the Prisma schema to the database |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

## Project structure

```
content/blog/          MDX articles
prisma/                Schema and seed script
src/
  app/
    (site)/            Storefront pages (public chrome)
    admin/(panel)/     Authenticated admin pages
    admin/login/       Sign-in
    api/               Route handlers (leads, appointments, analytics beacon)
  components/           UI, layout, product, blog, admin components
  server/               Data access and mutations, grouped by domain
  lib/                  Shared utilities, SEO helpers, constants
  types/                Shared types
docs/                  Architecture, database, SEO, and research documents
```

## Deployment

Deployed on Vercel. Set the environment variables above in the project settings, then push to `main`. The build runs `prisma generate` automatically.

For the storefront alone, the `NEXT_PUBLIC_*` variables plus `DATABASE_URL` and `DIRECT_URL` are sufficient. `AUTH_SECRET` and `CLOUDFLARE_R2_*` are only needed for the admin portal.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design and phased roadmap
- [`docs/DATABASE.md`](docs/DATABASE.md) — schema design and data conventions
- [`docs/SEO-STRATEGY.md`](docs/SEO-STRATEGY.md) — keyword, content, and technical SEO strategy
- [`docs/RESEARCH.md`](docs/RESEARCH.md) — market research behind the product decisions

## License

Private and proprietary. All rights reserved.
