"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import type { GiscusConfig } from "@/lib/giscus-config";

export function GiscusComments({ config }: { config: GiscusConfig }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-16 border-t border-muted/20 pt-10">
      <Giscus
        repo={config.repo}
        repoId={config.repoId}
        category={config.category}
        categoryId={config.categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="pt"
        loading="lazy"
      />
    </div>
  );
}