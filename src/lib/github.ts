const GITHUB_USERNAME = "zArkade";

export interface GithubRepo {
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
  isFork: boolean;
}

interface GithubApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  private: boolean;
  owner: { login: string };
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100&sort=updated`,
    {
      headers: { Accept: "application/vnd.github+json" },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    console.warn(`[github] falha ao buscar repositorios com estrela (status ${res.status})`);
    return [];
  }

  const data: GithubApiRepo[] = await res.json();

  return data
    .filter((repo) => !repo.private)
    .filter((repo) => repo.owner.login.toLowerCase() === GITHUB_USERNAME.toLowerCase())
    .filter((repo) => repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase())
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : null,
      language: repo.language,
      stars: repo.stargazers_count,
      topics: repo.topics ?? [],
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      isFork: repo.fork,
    }));
}