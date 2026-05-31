import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 mb-4 scroll-mt-24 font-display text-3xl font-light text-charcoal" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 scroll-mt-24 font-display text-xl font-normal text-charcoal" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 text-[17px] leading-8 text-slate" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 ml-5 list-disc space-y-2 text-slate marker:text-terracotta" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 ml-5 list-decimal space-y-2 text-slate marker:text-terracotta" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1.5 leading-7" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-charcoal" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-4 border-terracotta bg-terracotta-pale py-3 pl-5 pr-4 italic text-charcoal-soft"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-sand" />,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return <Link href={href} className="font-medium text-terracotta underline-offset-2 hover:underline" {...props} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-terracotta underline-offset-2 hover:underline"
        {...props}
      />
    );
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-sand">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-sand bg-linen px-4 py-2.5 text-left font-semibold text-charcoal" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-sand/60 px-4 py-2.5 text-slate" {...props} />
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
