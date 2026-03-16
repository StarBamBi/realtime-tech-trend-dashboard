"use client";

import type { GitHubRepo } from "@/types";
import * as s from "./TrendingList.css";

const GITHUB_REPO_URL = (fullName: string) => `https://github.com/${fullName}`;

interface TrendingListProps {
  repos: GitHubRepo[];
}

function RankBadge({ rank }: { rank: 1 | 2 | 3 }) {
  const rankClass = rank === 1 ? s.rank1 : rank === 2 ? s.rank2 : s.rank3;
  return (
    <span className={rankClass} aria-label={`${rank}등`}>
      {rank}
    </span>
  );
}

/** GitHub Trending 목록 (SSE로 갱신). 1·2·3등 뱃지, 호버 확대, 클릭 시 GitHub 이동 */
export function TrendingList({ repos }: TrendingListProps) {
  return (
    <ul className={s.list}>
      {repos.map((repo, index) => {
        const rank = (index + 1) as 1 | 2 | 3;
        const isTopThree = index < 3;
        const href = GITHUB_REPO_URL(repo.name);
        return (
          <li key={repo.id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={isTopThree ? `${s.item} ${s.itemWithRank}` : s.item}
            >
              {isTopThree && <RankBadge rank={rank} />}
              <div className={s.name}>{repo.name}</div>
              <div className={s.meta}>
                <span>⭐ {repo.stars}</span>
                <span>🔀 {repo.forks}</span>
                <span>{repo.language ?? "—"}</span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
