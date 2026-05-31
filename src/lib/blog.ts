import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  ogImage?: string;
  author?: string;
  featured?: boolean;
  faqs?: BlogFaq[];
}

export interface BlogPostMeta extends Omit<BlogFrontmatter, "faqs"> {
  slug: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  faqs: BlogFaq[];
}

function readPostFile(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    category: frontmatter.category,
    tags: frontmatter.tags ?? [],
    ogImage: frontmatter.ogImage,
    author: frontmatter.author,
    featured: frontmatter.featured ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
    faqs: frontmatter.faqs ?? [],
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => readPostFile(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _content, faqs: _faqs, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return readPostFile(slug);
}
