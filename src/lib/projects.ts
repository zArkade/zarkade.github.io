import { getGithubRepos, type GithubRepo } from "./github";
import { projectOverrides } from "@/data/projects";

export interface Project extends GithubRepo {
  featured: boolean;
  cover?: string;
  photos: string[];
  challenges?: string;
  giscusRepoId?: string;
  giscusCategoryId?: string;
  tags: string[];
}

export async function getProjects(locale: string): Promise<Project[]> {
  const repos = await getGithubRepos();

  return repos
    .filter((repo) => !projectOverrides[repo.name]?.hidden)
    .map((repo) => {
      const override = projectOverrides[repo.name] ?? {};
      return {
        ...repo,
        featured: override.featured ?? false,
        cover: override.cover,
        photos: override.photos ?? [],
        challenges: override.challenges?.[locale],
        giscusRepoId: override.giscusRepoId,
        giscusCategoryId: override.giscusCategoryId,
        tags: override.tags ?? (repo.language ? [repo.language] : []),
      };
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    });
}