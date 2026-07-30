import { notFound } from "next/navigation";
import { GitFork } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/projects";
import { formatDate } from "@/lib/format-date";
import { GiscusComments } from "@/app/components/blog/GiscusComments";

export async function generateStaticParams() {
  const params: { locale: string; repo: string }[] = [];

  for (const locale of routing.locales) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      params.push({ locale, repo: project.name });
    }
  }

  if (params.length > 0) {
    return params;
  }

  return routing.locales.map((locale) => ({ locale, repo: "__no_projects__" }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; repo: string }>;
}) {
  const { locale, repo } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Projetos");
  const projects = await getProjects(locale);
  const project = projects.find((p) => p.name === repo);

  if (!project) {
    if (projects.length === 0) {
      return (
        <div className="mx-auto max-w-3xl px-6 py-20 text-center text-muted">
          {t("empty")}
        </div>
      );
    }
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex flex-wrap items-center gap-2">
        {project.featured && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {t("featured")}
          </span>
        )}
        {project.isFork && (
          <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            <GitFork size={11} /> {t("fork")}
          </span>
        )}
      </div>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
        {project.name}
      </h1>
      <p className="mt-4 text-lg text-muted">{project.description ?? "—"}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-muted/20 px-2 py-0.5">
            {tag}
          </span>
          
        ))}
        <time dateTime={project.pushedAt}>{formatDate(project.pushedAt, locale)}</time>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-4 py-2 font-mono text-xs text-accent hover:bg-accent/20"
          >
            {t("viewSite")} ↗
          </a>
        )}
        <a
          href={project.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-4 py-2 font-mono text-xs text-accent hover:bg-background-2"
        >
          {t("viewOnGithub")} ↗
        </a>
      </div>

      {project.photos.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo}
              src={photo}
              alt={project.name}
              className="rounded-lg border border-muted/20"
            />
          ))}
        </div>
      )}

      <div className="mt-10">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
          {t("challengesTitle")}
        </h2>
        <p className="mt-4 text-muted">{project.challenges ?? t("noChallenges")}</p>
      </div>

      {project.giscusRepoId && project.giscusCategoryId && (
        <GiscusComments
          config={{
            repo: `zArkade/${project.name}`,
            repoId: project.giscusRepoId,
            category: "Comentarios",
            categoryId: project.giscusCategoryId,
          }}
        />
      )}
    </article>
  );
}