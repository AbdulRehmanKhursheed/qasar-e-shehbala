import type { MetadataRoute } from "next";
import { SITE, GROOM_CATEGORIES } from "@/lib/constants";

/**
 * Dynamic sitemap — auto-generated from static routes + DB content.
 * Product/blog slugs come from the DB in Phase 2.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/groom-wear`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/appointments`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/measurement-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = GROOM_CATEGORIES.map((cat) => ({
    url: `${SITE.url}/collections/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // TODO: fetch product slugs and blog slugs from DB in Phase 2
  // const products = await prisma.product.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } });
  // const productRoutes = products.map(p => ({ url: `${SITE.url}/products/${p.slug}`, lastModified: p.updatedAt, ... }));

  return [...staticRoutes, ...categoryRoutes];
}
