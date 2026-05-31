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
    <div className="min-h-screen bg-parchment">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ name: "Blog", href: "/blog" }]} />

        <header className="mt-10 mb-12 max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">
            Journal
          </p>
          <h1 className="font-display text-4xl font-light text-charcoal sm:text-5xl">
            Groom Wear Guides
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-mist">
            Expert advice on sherwani, prince coats, fabrics, measurements and styling —
            straight from our Saddar workshop.{" "}
            <em className="font-medium not-italic text-slate">Dulha ki sherwani ka guide.</em>
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-mist">Articles coming soon.</p>
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
    <article className="rounded-2xl border border-sand bg-cream p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="terracotta">{post.category}</Badge>
        <time dateTime={post.date} className="text-xs text-mist">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </time>
      </div>
      <h2 className="mt-3 font-display text-3xl font-light text-charcoal">
        <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-terracotta">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-[15px] leading-7 text-slate">{post.description}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-flex items-center text-sm font-medium text-terracotta hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}

function PostRow({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-sand pb-8 last:border-0">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="outline">{post.category}</Badge>
        <time dateTime={post.date} className="text-xs text-mist">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </time>
      </div>
      <h2 className="font-display text-2xl font-normal text-charcoal transition-colors group-hover:text-terracotta">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-2 text-[15px] leading-7 text-slate">{post.description}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center text-sm font-medium text-terracotta hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}
