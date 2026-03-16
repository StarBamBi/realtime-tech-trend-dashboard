import { NextResponse } from "next/server";
import type { TrendingReposResponse } from "@/types";
import { fetchTrendingReposFromGitHub, type TrendingSort } from "@/services/github.server";

const CACHE_MAX_AGE = 60; // 1분 캐시 (GitHub rate limit 고려)
const SORT_VALUES = ["stars", "forks"] as const;

/**
 * Next.js Route Handler: GitHub Trending 데이터 조회
 * GitHub Search API 사용 (공식 Trending API 없음 → stars/forks 기준 인기 저장소 반환)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") ?? "";
  const perPage = Math.min(Number(searchParams.get("per_page")) || 10, 30);
  const since = searchParams.get("since") ?? undefined;
  const sortParam = searchParams.get("sort") ?? "stars";
  const sort: TrendingSort = SORT_VALUES.includes(sortParam as (typeof SORT_VALUES)[number])
    ? (sortParam as TrendingSort)
    : "stars";

  try {
    const repos = await fetchTrendingReposFromGitHub({ language, perPage, since, sort });
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
    const message = err instanceof Error ? err.message : "Failed to fetch trending repos";
    const status = message.includes("rate limit") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
