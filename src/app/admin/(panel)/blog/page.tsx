import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Blog & CMS" };

export default function BlogAdminPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800">
        Blog posts are MDX files in <code className="rounded bg-blue-100 px-1">content/blog/</code>. Add or edit a file, then redeploy. To allow a non-technical editor to publish without git, migrate to a headless CMS (Payload or Sanity) in Phase 2.
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {["Title", "Category", "Published", "Tags", "View"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.map((post) => (
              <tr key={post.slug} className="hover:bg-gray-50">
                <td className="max-w-xs px-4 py-3">
                  <p className="text-xs font-medium text-gray-900 truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{post.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="royal">{post.category}</Badge>
                </td>
                <td className="px-4 py-3">
                  <time className="text-xs text-gray-500">{formatDate(post.date)}</time>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-royal hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-400">No posts yet. Add an MDX file to content/blog/.</p>
        )}
      </div>

      <p className="text-xs text-gray-500">{posts.length} published articles</p>
    </div>
  );
}
