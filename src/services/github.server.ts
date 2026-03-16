import type { GitHubRepo } from "@/types";

/** GitHub Search API 응답 아이템 타입 */
interface GitHubSearchItem {
  id: number;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const GITHUB_API = "https://api.github.com";

export type TrendingSort = "stars" | "forks";

export interface FetchTrendingOptions {
  language?: string;
  perPage?: number;
  since?: string; // YYYY-MM-DD
  sort?: TrendingSort;
}

/**
 * 서버 전용: GitHub Search API로 인기 저장소 목록 조회
 * - /api/trending, /api/events/trends(SSE)에서 공통 사용
 * - GITHUB_TOKEN 설정 시 rate limit 5000/h, 미설정 시 60/h (SSE 5초 간격 사용 시 토큰 권장)
 */
export async function fetchTrendingReposFromGitHub(
  options: FetchTrendingOptions = {}
): Promise<GitHubRepo[]> {
  const { language = "", perPage = 10, since, sort = "stars" } = options;
  const safePerPage = Math.min(perPage, 30);

  const q = since
    ? language
      ? `language:${language} created:>${since}`
      : `created:>${since}`
    : language
      ? `language:${language} stars:>100`
      : "stars:>100";

  const url = new URL("/search/repositories", GITHUB_API);
  url.searchParams.set("q", q);
  url.searchParams.set("sort", sort);
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(safePerPage));

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Next.js-Tech-Trend-Dashboard",
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { headers });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Set GITHUB_TOKEN for higher limits.");
    }
    throw new Error(`GitHub API error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { items?: GitHubSearchItem[] };
  const items = Array.isArray(data.items) ? data.items : [];

  return items.map((item) => ({
    id: String(item.id),
    name: item.full_name,
    stars: item.stargazers_count,
    forks: item.forks_count,
    language: item.language ?? null,
    updatedAt: item.updated_at,
  }));
}
