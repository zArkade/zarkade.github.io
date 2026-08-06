import { getTranslations } from "next-intl/server";
import { VisitorCounter } from "./VisitorCounter";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-muted/20 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} Marcos Gonçalves</span>
        <VisitorCounter label={t("visitors")} />
      </div>
    </footer>
  );
}