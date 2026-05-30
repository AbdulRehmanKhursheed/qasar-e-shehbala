import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Groom Wear Guides & Lookbooks",
  description:
    "Sherwani vs prince coat, how to take measurements, fabric guides, wedding styling tips and real-wedding lookbooks from Qasr-e-Shehbala.",
  slug: "blog",
});

export const revalidate = 3600;

// TODO: Replace with Prisma query to published blog posts
async function getPosts(): Promise<BlogPost[]> {
  return [];
}

// Seed content — shown when DB is empty, illustrating the content strategy
const SEED_POSTS: Pick<BlogPost, "slug" | "title" | "excerpt" | "type" | "status" | "publishedAt" | "tags">[] =
  [
    {
      slug: "sherwani-vs-prince-coat",
      title: "Sherwani vs Prince Coat — Which Should the Groom Wear?",
      excerpt:
        "Both are iconic choices for the Pakistani groom. Here's how to decide based on occasion, body type, and personal style — straight from our karigars.",
      type: "ARTICLE",
      status: "PUBLISHED",
      publishedAt: new Date().toISOString(),
      tags: [{ id: "1", slug: "groom-guide", name: "Groom Guide" }],
    },
    {
      slug: "how-to-take-sherwani-measurements",
      title: "How to Take Sherwani Measurements at Home",
      excerpt:
        "If you're ordering from outside Rawalpindi, this step-by-step guide walks you through taking your own measurements accurately for a perfect fit.",
      type: "ARTICLE",
      status: "PUBLISHED",
      publishedAt: new Date().toISOString(),
      tags: [{ id: "2", slug: "measurements", name: "Measurements" }],
    },
    {
      slug: "jamawar-velvet-banarsi-fabric-guide",
      title: "Fabric Guide: Jamawar, Velvet, and Banarsi for Groom Wear",
      excerpt:
        "Understand the differences between the three most popular sherwani fabrics — and which one suits your wedding season, venue, and style.",
      type: "ARTICLE",
      status: "PUBLISHED",
      publishedAt: new Date().toISOString(),
      tags: [{ id: "3", slug: "fabrics", name: "Fabrics" }],
    },
    {
      slug: "groom-wear-trends-2026",
      title: "Groom Wear Trends 2026 — What Rawalpindi Grooms Are Wearing",
      excerpt:
        "Black sherwani, velvet embroidery, and minimalist cuts — here's what's trending this wedding season and how to wear it.",
      type: "ARTICLE",
      status: "PUBLISHED",
      publishedAt: new Date().toISOString(),
      tags: [{ id: "4", slug: "trends", name: "Trends" }],
    },
  ];

export default async function BlogPage() {
  const dbPosts = await getPosts();
  const posts = dbPosts.length > 0 ? dbPosts : SEED_POSTS;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Blog", href: "/blog" }]} />

        <div className="mt-10 mb-10">
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Groom Wear Guides
          </h1>
          <p className="mt-3 text-gray-500">
            Expert advice on sherwani, prince coats, fabrics, measurements and
            styling — straight from our Saddar workshop.{" "}
            <em className="not-italic font-medium">
              Dulha ki sherwani ka guide.
            </em>
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group border-b border-gray-100 pb-8 last:border-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs text-gray-400"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>

              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#c9a227] transition-colors">
                <Link href={`/blog/${post.slug}`} className="focus-visible:underline focus-visible:outline-none">
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="mt-2 text-sm text-gray-600 leading-7">{post.excerpt}</p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center text-sm font-medium text-[#c9a227] hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
