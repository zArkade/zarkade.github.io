"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { PostSummary } from "@/lib/posts";

export function BlogList({
  posts,
  searchPlaceholder,
  allTagsLabel,
  emptyLabel,
  noResultsLabel,
}: {
  posts: PostSummary[];
  searchPlaceholder: string;
  allTagsLabel: string;
  emptyLabel: string;
  noResultsLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  if (posts.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        className="w-full rounded-lg border border-muted/20 bg-background-2 px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent/50 focus:outline-none"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
            activeTag === null
              ? "border-accent bg-accent/10 text-accent"
              : "border-muted/20 text-muted hover:border-accent/50"
          }`}
        >
          {allTagsLabel}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              activeTag === tag
                ? "border-accent bg-accent/10 text-accent"
                : "border-muted/20 text-muted hover:border-accent/50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {filteredPosts.length === 0 && (
          <p className="text-sm text-muted">{noResultsLabel}</p>
        )}
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-muted/20 p-6 transition-colors hover:border-accent/50"
          >
            <time className="font-mono text-xs text-accent">{post.date}</time>
            <h2 className="mt-2 font-display text-xl font-medium">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-muted/20 px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}