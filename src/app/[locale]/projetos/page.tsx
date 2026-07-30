import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { ProjectList } from "@/app/components/projects/ProjectList";

export default async function ProjetosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Projetos");
  const projects = await getProjects(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{t("description")}</p>

      <div className="mt-12">
        <ProjectList
          projects={projects}
          searchPlaceholder={t("searchPlaceholder")}
          allLanguagesLabel={t("allLanguages")}
          emptyLabel={t("empty")}
          noResultsLabel={t("noResults")}
          featuredLabel={t("featured")}
          forkLabel={t("fork")}
        />
      </div>
    </div>
  );
}