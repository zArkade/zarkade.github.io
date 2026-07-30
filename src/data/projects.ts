export interface ProjectOverride {
  featured?: boolean;
  hidden?: boolean;
  cover?: string;
  photos?: string[];
  challenges?: Record<string, string>;
  giscusRepoId?: string;
  giscusCategoryId?: string;
  tags?: string[];
}

export const projectOverrides: Record<string, ProjectOverride> = {
  "zarkade.github.io": {
    featured: true,
    challenges: {
      "pt-BR": "",
      "en-US": "",
    },
  tags: ["Next.js", "TypeScript", "Tailwind"],
  },
};