import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Groom Wear Guides & Lookbooks",
  description:
    "Sherwani vs prince coat, how to take measurements, fabric guides, wedding styling tips and real-wedding lookbooks from Qasar-e-Shehbala.",
  slug: "blog",
});

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Blog", href: "/blog" }]} />

        <header className="mt-10 mb-10">
          <h1
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Groom Wear Guides
          </h1>
          <p className="mt-3 text-gray-500">
            Expert advice on sherwani, prince coats, fabrics, measurements and styling —
            straight from our Saddar workshop.{" "}
            <em className="not-italic font-medium">Dulha ki sherwani ka guide.</em>
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-500">Articles coming soon.</p>
        ) : (
          <div className="space-y-12">
            {featured && <FeaturedCard slug={featured.slug} post={featured} />}

            <div className="space-y-8">
              {rest.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PostMeta = ReturnType<typeof getAllPosts>[number];

function FeaturedCard({ post }: { slug: string; post: PostMeta }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="terracotta">{post.category}</Badge>
        <time dateTime={post.date} className="text-xs text-gray-400">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </time>
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
        <Link href={`/blog/${post.slug}`} className="hover:text-jewel transition-colors">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-gray-600 leading-7">{post.description}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center text-sm font-medium text-jewel hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}

function PostRow({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-gray-100 pb-8 last:border-0">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="outline">{post.category}</Badge>
        <time dateTime={post.date} className="text-xs text-gray-400">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </time>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-jewel transition-colors">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-2 text-sm text-gray-600 leading-7">{post.description}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center text-sm font-medium text-jewel hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}
