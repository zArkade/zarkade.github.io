import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { mdxOptions } from "@/lib/mdx-options";
import { GiscusComments } from "@/app/components/blog/GiscusComments";
import { blogGiscusConfig } from "@/lib/giscus-config";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getPostSlugs(locale).includes(slug)) {
    notFound();
  }

  const { frontmatter, content } = getPostBySlug(locale, slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <time className="font-mono text-xs text-accent">{frontmatter.date}</time>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
        {frontmatter.title}
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-muted/20 px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {frontmatter.repo && (
        <a
          href={frontmatter.repo}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 px-4 py-2 font-mono text-xs text-accent hover:bg-background-2"
        >
          Ver repositório no GitHub ↗
        </a>
      )}

      <div className="prose mt-10 max-w-none prose-headings:font-display prose-headings:font-medium">
        <MDXRemote source={content} options={mdxOptions} />
      </div>

      {frontmatter.repo && <GiscusComments config={blogGiscusConfig} />}
    </article>
  );
}