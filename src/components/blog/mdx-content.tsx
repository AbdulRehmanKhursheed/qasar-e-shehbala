import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 mb-4 text-2xl font-bold text-gray-900 scroll-mt-24"
      style={{ fontFamily: "Georgia, serif" }}
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-gray-900 scroll-mt-24" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 text-base leading-8 text-gray-700" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 ml-5 list-disc space-y-2 text-gray-700 marker:text-[#c9a227]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 ml-5 list-decimal space-y-2 text-gray-700 marker:text-[#c9a227]" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="leading-7 pl-1.5" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-4 border-[#c9a227] bg-amber-50 py-3 pl-5 pr-4 text-gray-700 italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-gray-100" />,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return <Link href={href} className="font-medium text-[#c9a227] underline-offset-2 hover:underline" {...props} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[#c9a227] underline-offset-2 hover:underline"
        {...props}
      />
    );
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-700" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-gray-100 px-4 py-2 text-gray-600" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
