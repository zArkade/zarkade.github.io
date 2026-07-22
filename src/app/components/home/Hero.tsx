import { getTranslations } from "next-intl/server";

const STACK = ["C#", "Java", "DataFlex"];

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative isolate flex min-h-[85vh] flex-col justify-center overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-evenly text-accent/40">
        <PulseLine className="h-16" />
        <PulseLine className="h-16" />
        <PulseLine className="h-16" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background-2 px-3 py-1 font-mono text-xs text-muted">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_6px_var(--signal)]" />
          </span>
          {t("eyebrow")}
        </div>

        <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
          {t("name")}
        </h1>

        <p className="mt-4 gap-2 font-mono text-sm font-medium text-accent sm:text-base">
          {t("role")}
        </p>

        <p className="mt-6 max-w-xl text-lg text-muted">
          {t("description")}
        </p>

        <ul className="mt-10 flex flex-wrap gap-3">
          {STACK.map((tech) => (
            <li key={tech} className="inline-flex items-center gap-2 rounded-full border border-muted/20 px-3 py-1.5 font-mono text-xs text-foreground">
              <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_6px_var(--signal)]" />
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted">
        ↓ {t("scroll")}
      </div>
    </section>
  );
}

function PulseLine({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="flex h-full w-[200%] motion-safe:animate-pulse-scroll motion-reduce:animate-none">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 400 80" preserveAspectRatio="none" className="h-full w-1/2 shrink-0" aria-hidden="true">
            <path d="M0,40 C40,40 40,15 80,15 C120,15 120,40 160,40 C200,40 200,65 240,65 C280,65 280,40 320,40 L400,40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ))}
      </div>
    </div>
  );
}