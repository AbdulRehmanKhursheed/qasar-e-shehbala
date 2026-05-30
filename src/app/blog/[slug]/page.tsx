import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/constants";
import type { BlogPost } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

// TODO: Replace with Prisma query
async function getPost(_slug: string): Promise<BlogPost | null> {
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    slug: `blog/${slug}`,
    type: "article",
    ogImage: post.ogImageKey
      ? `${process.env.NEXT_PUBLIC_CF_IMAGES_URL}/${post.ogImageKey}/w=1200,q=80,format=auto`
      : undefined,
  });
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.excerpt ?? undefined,
    slug,
    publishedAt: post.publishedAt ?? new Date().toISOString(),
    ogImage: post.ogImageKey
      ? `${process.env.NEXT_PUBLIC_CF_IMAGES_URL}/${post.ogImageKey}/w=1200,format=auto`
      : undefined,
  });

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={jsonLd} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${slug}` },
          ]}
        />

        <header className="mt-10 mb-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">{tag.name}</Badge>
            ))}
          </div>

          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            )}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </header>

        {/* Body — MDX content rendered here in Phase 2 */}
        {post.body ? (
          <div
            className="prose prose-gray max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-[#c9a227] prose-a:no-underline hover:prose-a:underline"
            // In Phase 2: render MDX via next-mdx-remote or Contentlayer
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        ) : (
          <p className="text-gray-500">Content coming soon.</p>
        )}

        {/* Related products CTA */}
        <div className="mt-12 rounded-2xl bg-[#0f0f0f] p-8 text-center">
          <p className="text-base font-semibold text-white">
            Ready to find your perfect groom wear?
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Browse our collection or start a WhatsApp conversation with our team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/collections/groom-wear"
              className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a07d1a] transition-colors"
            >
              Browse Groom Wear
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
