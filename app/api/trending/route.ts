import { NextResponse } from "next/server";
import type { GitHubRepo, TrendingReposResponse } from "@/types";

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
const CACHE_MAX_AGE = 60; // 1분 캐시 (GitHub rate limit 고려)

/**
 * Next.js Route Handler: GitHub Trending 데이터 조회
 * GitHub Search API 사용 (공식 Trending API 없음 → stars 기준 인기 저장소 반환)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") ?? "";
  const perPage = Math.min(Number(searchParams.get("per_page")) || 10, 30);
  const since = searchParams.get("since"); // optional: YYYY-MM-DD (e.g. 2024-01-01)

  // stars 기준 인기 저장소. since 있으면 해당 일 이후 생성된 것만
  const q = since
    ? language
      ? `language:${language} created:>${since}`
      : `created:>${since}`
    : language
      ? `language:${language} stars:>100`
      : "stars:>100";

  const url = new URL("/search/repositories", GITHUB_API);
  url.searchParams.set("q", q);
  url.searchParams.set("sort", "stars");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(perPage));

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Next.js-Tech-Trend-Dashboard",
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url.toString(), { headers, next: { revalidate: CACHE_MAX_AGE } });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 403) {
        return NextResponse.json(
          { error: "GitHub API rate limit exceeded. Set GITHUB_TOKEN for higher limits." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "GitHub API error", details: text },
        { status: res.status }
      );
    }

    const data = (await res.json()) as { items?: GitHubSearchItem[] };
    const items = Array.isArray(data.items) ? data.items : [];
    const repos: GitHubRepo[] = items.map((item) => ({
      id: String(item.id),
      name: item.full_name,
      stars: item.stargazers_count,
      forks: item.forks_count,
      language: item.language ?? null,
      updatedAt: item.updated_at,
    }));

    const body: TrendingReposResponse = {
      repos,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=120`,
      },
    });
  } catch (err) {
    console.error("[API /api/trending]", err);
    return NextResponse.json(
      { error: "Failed to fetch trending repos" },
      { status: 500 }
    );
  }
}
