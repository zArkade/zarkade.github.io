"use client";

import { useMemo, useState } from "react";
import { GitFork } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format-date";
import type { Project } from "@/lib/projects";

export function ProjectList({
  projects,
  searchPlaceholder,
  allLanguagesLabel,
  emptyLabel,
  noResultsLabel,
  featuredLabel,
  forkLabel,
}: {
  projects: Project[];
  searchPlaceholder: string;
  allLanguagesLabel: string;
  emptyLabel: string;
  noResultsLabel: string;
  featuredLabel: string;
  forkLabel: string;
}) {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        project.name.toLowerCase().includes(normalizedQuery) ||
        (project.description ?? "").toLowerCase().includes(normalizedQuery);
      const matchesTag = !activeTag || project.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [projects, query, activeTag]);

  if (projects.length === 0) {
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
          {allLanguagesLabel}
        </button>
        {tags.map((tag) => (
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

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {filteredProjects.length === 0 && (
          <p className="text-sm text-muted sm:col-span-2">{noResultsLabel}</p>
        )}
        {filteredProjects.map((project) => (
          <Link
            key={project.name}
            href={`/projetos/${project.name}`}
            className="block rounded-lg border border-muted/20 p-6 transition-colors hover:border-accent/50"
          >
            {(project.featured || project.isFork) && (
              <div className="flex flex-wrap items-center gap-2">
                {project.featured && (
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    {featuredLabel}
                  </span>
                )}
                {project.isFork && (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                    <GitFork size={11} /> {forkLabel}
                  </span>
                )}
              </div>
            )}
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <h2 className="font-display text-xl font-medium">{project.name}</h2>
              <time
                dateTime={project.pushedAt}
                className="shrink-0 font-mono text-xs text-foreground"
              >📝:
                {formatDate(project.pushedAt, locale)}
              </time>
            </div>
            <p className="mt-2 text-sm text-muted">{project.description ?? "—"}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}