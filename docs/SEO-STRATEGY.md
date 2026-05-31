# Qasr-e-Shehbala — SEO Strategy

> Premium menswear / made-to-measure groom wear · Saddar, Rawalpindi · est. 1999
> Companion to [`RESEARCH.md`](RESEARCH.md). Built for realistic Pakistani search behaviour (English + Roman-Urdu, strong local intent, Oct–Feb wedding seasonality).

## Guiding truth

For a physical groom-wear shop, **organic success is measured in WhatsApp clicks, calls, and store visits — not on-site checkouts.** SEO's job is to put us in front of a groom (or his family) researching 1–3 months before the wedding, build enough trust to start a conversation, and hand off cleanly to WhatsApp. The two highest-ROI channels are **Google Business Profile / local pack** and **a compounding content engine**, not national catalog ranking against HSY-scale brands.

Realistic timeline: GBP movement in 2–4 weeks; top-3 local pack in 3–6 months; content authority compounding from month 3 onward. There is no shortcut — but the plan below is the fastest *honest* path, and it is fully aligned with Google's helpful-content direction (so it does not get clawed back later).

---

## 1. Keyword strategy

Pakistani search splits across three languages on one keyboard: English, Urdu script, and Roman-Urdu. We target **English as the primary on-page language** (it is the most commercial and structured) and **weave Roman-Urdu into copy, FAQs, alt text, and synonyms** — capturing the ~40% who search transliterated, which most competitors ignore. No separate Urdu-script site.

Three intent tiers:

### Tier 1 — Local + transactional (highest priority, lowest competition)
The defensible niche. A national designer cannot credibly claim "made-to-measure in Rawalpindi since 1999."

- `sherwani tailor in Rawalpindi`, `sherwani stitching Rawalpindi`
- `prince coat stitching Islamabad`, `groom sherwani Saddar`
- `made to measure sherwani Rawalpindi`, `wedding sherwani Islamabad`
- `sherwani designer near me`, `groom wear shop Rawalpindi`
- Roman-Urdu: `sherwani banwana Rawalpindi`, `dulha sherwani Pindi`

### Tier 2 — Product / category (medium competition)
- `wedding sherwani`, `prince coat for groom`, `black velvet sherwani`
- `jamawar sherwani`, `groom waistcoat`, `barat dress for groom`
- Roman-Urdu: `dulha ki sherwani`, `prince coat banwana`, `shaadi ka joora for men`, `sherwani ki qeemat`

### Tier 3 — Informational / top-of-funnel (cheap to win, feeds the catalog)
- `sherwani vs prince coat`, `how to take sherwani measurements`
- `what to wear to barat / walima / mehndi`, `sherwani fabric guide`
- `groom wear trends 2026`, `which fabric for winter sherwani`

**Action:** validate exact volumes in Google Keyword Planner / Search Console once live (public volume data is unreliable for this niche). Let real query data, not assumption, drive which Roman-Urdu pages earn dedicated treatment.

---

## 2. Content clusters (topical authority map)

Hub-and-spoke. Each **pillar** is a commercial landing page; **spokes** are blog posts that link up to the pillar and across to products. This is the mechanism that passes topical authority to commercial pages.

```
PILLAR: Groom Wear (/collections/groom-wear)
├── Sherwani (/collections/sherwani) ── pillar
│   ├── blog: sherwani-vs-prince-coat
│   ├── blog: jamawar-velvet-banarsi-fabric-guide
│   ├── blog: how-to-take-sherwani-measurements
│   └── blog: wedding-sherwani-rawalpindi-islamabad (local)
├── Prince Coat (/collections/prince-coat) ── pillar
│   └── blog: sherwani-vs-prince-coat (shared spoke)
├── Waistcoats (/collections/waistcoats)
└── Occasion cluster
    ├── blog: barat-walima-mehndi-groom-dress-guide
    └── blog: groom-wear-trends-2026

PILLAR: Local (Rawalpindi / Islamabad)
└── wedding-sherwani-rawalpindi-islamabad + GBP + LocalBusiness schema
```

**Rule:** every blog post links to at least one collection/product page and one sibling post. Every collection page links to its 2–3 most relevant guides. No orphan content.

---

## 3. Landing pages

| Page | Type | Rendering | Primary intent |
| --- | --- | --- | --- |
| `/collections/groom-wear` | Pillar | ISR | "groom wear", brand discovery |
| `/collections/sherwani` | Pillar | ISR | "wedding sherwani", "sherwani tailor" |
| `/collections/prince-coat` | Pillar | ISR | "prince coat for groom" |
| `/collections/waistcoats` | Category | ISR | "groom waistcoat" |
| `/products/[slug]` | Product | ISR + on-demand revalidate | long-tail product + fabric terms |
| `/measurement-guide` | Resource | SSG | "how to measure for sherwani" |
| `/about` | Trust | SSG | brand/heritage, "since 1999" |
| `/appointments` | Conversion | SSG | "book sherwani consultation" |

Each pillar needs **150–300 words of unique intro copy** (the `introCopy` field already exists on the `Category` model) — the cheapest defence against thin-content devaluation. Each product needs a **unique 2–4 sentence description** (never duplicated across similar sherwanis).

Future **programmatic** landing pages (Phase 2, only once the catalog justifies it): `sherwani in [colour]`, `[fabric] sherwani`, `[occasion] groom dress`. Generate from real catalog data with unique copy per page — never thin doorway pages. Gate behind "do we have ≥3 genuine products for this facet" so they are never empty.

---

## 4. Blog strategy + the posts (written and live)

Six full posts are written and shipping in `content/blog/` (rendered via MDX at `/blog/[slug]`), each with internal links, Roman-Urdu woven in, and FAQ schema:

1. **sherwani-vs-prince-coat** — comparison (Tier 3 → Tier 2 hand-off) · *featured*
2. **how-to-take-sherwani-measurements** — resource + RTO-reducer for out-of-city grooms
3. **jamawar-velvet-banarsi-fabric-guide** — fabric authority
4. **groom-wear-trends-2026** — seasonal, refreshed annually
5. **wedding-sherwani-rawalpindi-islamabad** — local money post
6. **barat-walima-mehndi-groom-dress-guide** — occasion cluster

They are written in a real tailor's voice — specific (Saddar Road, *Decemberistan*, PKR ranges, karigar, naap), opinionated, and free of AI filler — because Google's helpful-content systems and human readers both reward genuine expertise. No fabricated reviews or customer names (policy + trust).

### Next 18 posts (priority order)
- `sherwani-colours-2026-which-suits-you`
- `groom-wear-budget-guide-pakistan` (price expectations)
- `how-early-should-groom-order-sherwani`
- `kulla-pagri-khussa-groom-accessories-guide`
- `sherwani-care-and-storage`
- `velvet-sherwani-winter-wedding-guide`
- `nikah-dress-for-groom-ideas`
- `tall-short-heavy-groom-sherwani-fit-guide`
- `coordinating-groom-and-bride-outfits`
- `real-wedding-lookbook-[season]` (genuine customer features, with consent)
- `sherwani-embroidery-types-dabka-zardozi-tilla`
- `prince-coat-vs-suit-for-walima`
- `groom-wear-checklist-30-days-before-wedding`
- `best-sherwani-colours-for-photography`
- `mehndi-outfit-ideas-for-groom`
- `made-to-measure-vs-readymade-sherwani`
- `out-of-city-groom-ordering-from-rawalpindi`
- `groom-wear-trends-2027` (annual refresh pattern)

**Cadence:** 2–4 deep evergreen posts/month, front-loaded Aug–Sep before the season. Refresh dated posts annually (Trends 2026 → 2027) rather than churning thin posts. Repurpose each post into a WhatsApp broadcast snippet and an Instagram carousel — write once, distribute three ways.

---

## 5. Topical authority map

We win authority on **one tight domain**: *Pakistani groom wear, made-to-measure, locally in Rawalpindi/Islamabad.* We do not dilute into womenswear, kids, or unrelated fashion. Depth on a narrow topic beats breadth — it is how a small site outranks larger, unfocused ones.

Authority signals we build:
- **Coverage:** every sub-topic a groom researches (garment choice, fabric, fit, measurements, occasion, accessories, budget, timing) gets a genuinely useful page.
- **Internal links:** dense, logical linking between guides and commercial pages (below).
- **Local entity:** consistent NAP across site, GBP, and `LocalBusiness` schema ties the "groom wear" topic to the "Rawalpindi" place.
- **Freshness:** seasonal posts updated yearly; `updated` dates surfaced in schema.

---

## 6. Internal linking strategy

- **Posts → commercial pages:** every post links to ≥1 collection/product. (Already done in all 6 posts.)
- **Posts → posts:** each post links to 1–2 siblings in its cluster. (Done.)
- **Collections → posts:** each pillar surfaces its 2–3 most relevant guides ("Read before you buy").
- **Products → guide:** PDPs link to the measurement guide and the relevant fabric/occasion post.
- **Anchor text:** descriptive and keyword-bearing ("sherwani vs prince coat guide"), never "click here".
- **Breadcrumbs:** on every product/category/blog page, with `BreadcrumbList` schema (already implemented).
- **Footer:** links to the pillar collections and key resources for site-wide equity flow.

Avoid: linking every keyword on every page (dilutes), orphan posts (build-time lint should flag a post with zero internal links).

---

## 7. Technical SEO checklist

Already implemented in the codebase (✅) or to action (☐):

- ✅ App Router + RSC — content and JSON-LD in server HTML, never client-injected
- ✅ ISR for catalog/blog, SSG for static, `noindex` on search/admin/cart
- ✅ `app/sitemap.ts` — dynamic, includes static + categories + blog posts
- ✅ `app/robots.ts` — allows site, disallows `/admin/`, `/api/`, search params
- ✅ Absolute `alternates.canonical` on every route via `buildMetadata`
- ✅ `next/image` with explicit dimensions + Cloudflare Images loader (Vercel opt disabled)
- ✅ Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- ✅ Mobile-first, responsive, accessible (semantic landmarks, focus-visible, aria labels)
- ☐ Core Web Vitals budget on PTCL 4G: LCP < 2.5s, INP < 200ms, CLS < 0.1 — priority-load hero only, lazy the rest
- ☐ Verify property + submit sitemap in Google Search Console on day one
- ☐ AVIF/WebP via Cloudflare Images; compress all garment photography
- ☐ `redirects` table wired for any slug rename (model exists)
- ☐ Validate every template in Google Rich Results Test before launch
- ☐ Self-canonicalise filtered/sorted/paginated category URLs (when filters scale)

---

## 8. Structured data strategy

All JSON-LD is server-rendered (helpers in `src/lib/seo.ts`):

- **`LocalBusiness` / `ClothingStore`** — site-wide, in root layout. NAP, geo, hours, phone, WhatsApp, `sameAs`, `hasMap`, `paymentAccepted`. The backbone of local ranking.
- **`Product` (merchant listing)** — on PDPs. PKR price, availability, brand, SKU. `aggregateRating`/`review` only when genuine reviews exist (never fabricated).
- **`Article`** — on blog posts, with `datePublished`/`dateModified`.
- **`FAQPage`** — on posts with FAQs (all 6 have them). Strong for long-tail and rich results.
- **`BreadcrumbList`** — on product/category/blog.
- **`Organization`** — brand entity, logo, socials.

Treat star/review snippets as a bonus, not a forecast — Google shows them inconsistently. The real value is correct indexing and merchant eligibility.

---

## 9. Competitor SEO analysis

| Competitor type | Examples | Their strength | Our wedge |
| --- | --- | --- | --- |
| National designers | HSY, Republic, Amir Adnan, Junaid Jamshed | Brand authority, ad budget, national ranking | They sell off-the-rack online; cannot claim local made-to-measure |
| Online marketplaces | Daraz sellers, brand e-stores | Volume, COD logistics | Thin product copy, no local trust, no tailoring expertise |
| Local Saddar/Pindi tailors | Various shops | Local reputation, walk-in trade | Little to no digital presence — wide-open SERP locally |

**The gap:** national brands own product terms but ignore local intent; local tailors own the trade but have no website or GBP. We win the **intersection** — "made-to-measure groom wear, in Rawalpindi" — where competition is weakest and intent-to-buy is highest.

**Recon to run quarterly:** search each Tier-1/2 keyword from a Rawalpindi IP, note who ranks in the local pack and organic, check their GBP review velocity, and find content gaps (questions no one answers well).

---

## 10. Long-tail opportunities

Highest conversion, lowest competition — these are where a new site wins first:

- `black velvet sherwani for barat Rawalpindi`
- `prince coat stitching price in Islamabad`
- `how much advance for custom sherwani`
- `sherwani delivery time Pakistan`
- `bottle green velvet sherwani 2026`
- `groom waistcoat with kurta for nikah`
- `sherwani measurement chart in inches`
- `out of city sherwani order Pakistan`
- Roman-Urdu: `sherwani ki qeemat Pindi`, `dulha sherwani design 2026`, `prince coat ki price`

These are answered directly inside the published posts and product copy, and harvested via FAQ schema.

---

## 11. 12-month SEO roadmap

**Month 0 — Foundations**
- Launch site (already technically SEO-ready). Verify Search Console + Bing Webmaster, submit sitemap.
- Create & verify Google Business Profile: 750-char description with Saddar + service keywords, list services with PKR ranges, upload 20+ real photos (exterior, interior, fabrics, finished garments, karigars at work).
- Set up GA4; instrument WhatsApp-click, call, and directions events as conversions.

**Months 1–2 — Local + trust**
- Publish the trust surface (since-1999 story, shop/owner/karigar photos, Maps embed, policy page).
- GBP review engine: in-store QR + WhatsApp request flow targeting 1–2 genuine reviews/week.
- Write unique intro copy for all pillar pages; unique descriptions for every product.

**Months 3–4 — Content engine**
- Ship the 6 launch posts (done) + 4 more from the priority list. Dense internal linking.
- First Search Console review: which queries are impressing? Double down; fix any thin/duplicate pages.

**Months 5–6 — Authority + seasonality prep**
- 4 more posts. Begin earning local links (wedding planners, venue blogs, photographers — natural partners).
- Refresh trends/seasonal posts. **Front-load Aug–Sep content before the Oct–Feb peak.**

**Months 7–9 — Peak season harvest**
- Maintain cadence; lean into long-tail "near me" and colour/fabric terms now ranking.
- Add programmatic facet pages only if catalog depth justifies it (≥3 products per facet).
- Monitor CWV under traffic; ensure GBP is fully optimised before the rush.

**Months 10–12 — Compound + review**
- Annual refresh (Trends 2026 → 2027). Real-wedding lookbooks from the season (with consent).
- Full competitor re-audit; expand into any winning sub-topics.
- Review the funnel end-to-end: impressions → clicks → WhatsApp → deposit → order.

**The one KPI per phase:** Months 0–2 *local visibility* (GBP actions); 3–6 *content impressions* (Search Console); 7–12 *qualified WhatsApp leads from organic*.

---

## What NOT to do

- No fabricated reviews/ratings (policy violation + reputational risk).
- No thin programmatic/doorway pages or AI-bulk content with no human edit.
- No keyword stuffing or hidden Roman-Urdu text.
- No buying links. Earn them from wedding-industry partners.
- No separate Urdu-script subsite at this stage — Roman-Urdu inline is enough until data says otherwise.
- Do not measure success by on-site "purchases" — the conversion is the WhatsApp handoff.
