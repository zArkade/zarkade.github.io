import { getTranslations, setRequestLocale } from "next-intl/server";
import { Timeline } from "@/app/components/about/Timeline";
import { professionalTimeline, educationTimeline } from "@/data/timeline";
import { Mail } from "lucide-react";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa6";

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Sobre");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t("bio")}</p>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
            {t("professionalTitle")}
          </h2>
          <div className="mt-6">
            <Timeline entries={professionalTimeline[locale] ?? professionalTimeline["pt-BR"]} />
          </div>
        </div>

        <div>
          <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
            {t("educationTitle")}
          </h2>
          <div className="mt-6">
            <Timeline entries={educationTimeline[locale] ?? educationTimeline["pt-BR"]} />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-mono text-sm uppercase tracking-wider text-accent">
          {t("socialTitle")}
        </h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href="https://github.com/zArkade" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-muted/20 px-4 py-2 text-sm hover:border-accent/50 hover:text-accent">
            <FaGithub size={16} /> GitHub
          </a>
          <a href="mailto:contato.marcosribeiro@outlook.com" className="inline-flex items-center gap-2 rounded-full border border-muted/20 px-4 py-2 text-sm hover:border-accent/50 hover:text-accent">
            <Mail size={16} /> E-mail
          </a>
          <a href="https://wa.me/5511979931521" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-muted/20 px-4 py-2 text-sm hover:border-accent/50 hover:text-accent">
            <FaWhatsapp size={16} /> WhatsApp
          </a>
          <a href="https://www.linkedin.com/in/marcosribeirogon%C3%A7alves/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-muted/20 px-4 py-2 text-sm hover:border-accent/50 hover:text-accent">
            <FaLinkedin size={16} /> Linkedin
          </a>
        </div>
      </div>
    </div>
  );
}