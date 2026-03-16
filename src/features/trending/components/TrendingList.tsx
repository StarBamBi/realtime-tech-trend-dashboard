"use client";

import type { GitHubRepo } from "@/types";

interface TrendingListProps {
  repos: GitHubRepo[];
}

/** UI 전용: GitHub Trending 목록 렌더링 (반응형) */
export function TrendingList({ repos }: TrendingListProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800 sm:p-4"
        >
          <div className="truncate text-sm font-medium text-zinc-900 sm:text-base dark:text-zinc-100">
            {repo.name}
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
            <span>⭐ {repo.stars}</span>
            <span>🔀 {repo.forks}</span>
            <span>{repo.language ?? "—"}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
