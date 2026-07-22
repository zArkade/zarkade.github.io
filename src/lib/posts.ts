import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  repo?: string;
}

export interface PostSummary extends PostFrontmatter {
  filename: string;
}

function readAllPostFiles(locale: string): PostSummary[] {
  const dir = path.join(POSTS_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(raw);
    return { filename, ...(data as PostFrontmatter) };
  });

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      console.warn(
        `[blog] slug duplicado "${post.slug}" em ${locale} (arquivo ${post.filename}) — as URLs vão colidir.`
      );
    }
    seen.add(post.slug);
  }

  return posts;
}

export function getPostSlugs(locale: string): string[] {
  return readAllPostFiles(locale).map((post) => post.slug);
}

export function getPostBySlug(locale: string, slug: string) {
  const dir = path.join(POSTS_DIR, locale);
  const match = readAllPostFiles(locale).find((post) => post.slug === slug);

  if (!match) {
    throw new Error(`Post com slug "${slug}" não encontrado em ${locale}.`);
  }

  const raw = fs.readFileSync(path.join(dir, match.filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getAllPosts(locale: string): PostSummary[] {
  return readAllPostFiles(locale).sort((a, b) => (a.date < b.date ? 1 : -1));
}