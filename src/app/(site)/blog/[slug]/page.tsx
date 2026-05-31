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
    <div className="min-h-screen bg-parchment">
      <JsonLd data={structuredData} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${slug}` },
          ]}
        />

        <header className="mt-10 mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="terracotta">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-display text-4xl font-light leading-tight text-charcoal sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-mist">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>

        <MdxContent source={post.content} />

        {post.faqs.length > 0 && (
          <section className="mt-14 border-t border-sand pt-10" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-6 font-display text-3xl font-light text-charcoal">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold text-charcoal">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-slate">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <aside className="mt-12 rounded-2xl bg-charcoal p-8 text-center">
          <p className="font-display text-2xl font-light text-parchment">
            Ready to find your perfect groom wear?
          </p>
          <p className="mt-2 text-sm text-parchment/70">
            Browse our collection or start a WhatsApp conversation with our team.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-light"
            >
              Browse Collections
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </aside>
      </article>
    </div>
  );
}
