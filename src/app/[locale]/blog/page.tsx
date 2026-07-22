import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/posts";
import { BlogList } from "./BlogList";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = getAllPosts(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{t("description")}</p>

      <div className="mt-12">
        <BlogList
          posts={posts}
          searchPlaceholder={t("searchPlaceholder")}
          allTagsLabel={t("allTags")}
          emptyLabel={t("empty")}
          noResultsLabel={t("noResults")}
        />
      </div>
    </div>
  );
}