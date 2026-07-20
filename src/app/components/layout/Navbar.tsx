"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Mail, Moon, Sun, Languages, Menu } from "lucide-react";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa6";
import { Tooltip } from "@/app/components/ui/Tooltip";

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isFirstRender = useRef(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setMounted(true);
    }
  }, []);

  const NAV_LINKS = [
    { href: "/blog", label: t("blog") },
    { href: "/projetos", label: t("projetos") },
    { href: "/sobre", label: t("sobre") },
  ];

  const switchLocale = () => {
    const nextLocale = locale === "pt-BR" ? "en-US" : "pt-BR";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Marcos Gonçalves
        </Link>

        <ul className="hidden gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <Tooltip label={t("github")}>
            <a href="https://github.com/zArkade" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub size={18} className="hover:text-neutral-900 dark:hover:text-white" />
            </a>
          </Tooltip>
          <Tooltip label={t("linkedin")}>
            <a href="https://www.linkedin.com/in/marcosribeirogon%C3%A7alves/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={18} className="hover:text-neutral-900 dark:hover:text-white" />
            </a>
          </Tooltip>
          <Tooltip label={t("email")}>
            <a href="mailto:contato.marcosribeiro@outlook.com" aria-label="E-mail">
              <Mail size={18} className="hover:text-neutral-900 dark:hover:text-white" />
            </a>
          </Tooltip>
          <Tooltip label={t("whatsapp")}>
            <a href="https://wa.me/5511979931521" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={18} className="hover:text-neutral-900 dark:hover:text-white" />
            </a>
          </Tooltip>

          <Tooltip label={t("theme")}>
            <button type="button" aria-label="Alternar tema" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:text-neutral-900 dark:hover:text-white">
              {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </Tooltip>

          <Tooltip label={t("language")}>
            <button type="button" aria-label="Alternar idioma" onClick={switchLocale} className="hover:text-neutral-900 dark:hover:text-white">
              <Languages size={18} />
            </button>
          </Tooltip>

          <button type="button" aria-label="Abrir menu" className="sm:hidden">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}