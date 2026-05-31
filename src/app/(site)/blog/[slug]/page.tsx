import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, articleJsonLd, faqJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { MdxContent } from "@/components/blog/mdx-content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    slug: `blog/${slug}`,
    type: "article",
    ogImage: post.ogImage
      ? `${process.env.NEXT_PUBLIC_CF_IMAGES_URL}/${post.ogImage}/w=1200,q=80,format=auto`
      : undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const structuredData: Record<string, unknown>[] = [
    articleJsonLd({
      title: post.title,
      description: post.description,
      slug,
      publishedAt: post.date,
      updatedAt: post.updated,
      authorName: post.author,
    }),
  ];
  if (post.faqs.length > 0) structuredData.push(faqJsonLd(post.faqs));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={structuredData} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${slug}` },
          ]}
        />

        <header className="mt-10 mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="terracotta">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1
            className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>

        <div className="text-gray-700">
          <MdxContent source={post.content} />
        </div>

        {post.faqs.length > 0 && (
          <section className="mt-14 border-t border-gray-100 pt-10" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <aside className="mt-12 rounded-2xl bg-ink p-8 text-center">
          <p className="text-base font-semibold text-white">Ready to find your perfect groom wear?</p>
          <p className="mt-2 text-sm text-gray-400">
            Browse our collection or start a WhatsApp conversation with our team.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/collections/groom-wear"
              className="inline-flex items-center justify-center rounded-xl bg-jewel px-5 py-2.5 text-sm font-semibold text-white hover:bg-jewel transition-colors"
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
        </aside>
      </article>
    </div>
  );
}
