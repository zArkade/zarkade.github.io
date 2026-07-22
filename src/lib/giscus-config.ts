export interface GiscusConfig {
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
}

export const blogGiscusConfig: GiscusConfig = {
  repo: "zArkade/zarkade.github.io",
  repoId: "R_kgDOM-cFoQ",
  category: "Polls",
  categoryId: "DIC_kwDOM-cFoc4DBusm",
};

// export const projectGiscusConfig = (owner: string, repo: string, repoId: string, categoryId: string): GiscusConfig => ({
//   repo: `${owner}/${repo}`,
//   repoId,
//   category: "Comentarios",
//   categoryId,
// });