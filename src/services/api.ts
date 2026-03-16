import type { TechTrend, TechTrendsResponse } from "@/types";
import type { TrendingReposResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * REST API: 기술 트렌드 목록 조회 (서버 상태용)
 */
export async function fetchTechTrends(): Promise<TechTrendsResponse> {
  const res = await fetch(`${BASE_URL}/api/trends`);
  if (!res.ok) throw new Error("Failed to fetch trends");
  return res.json();
}

/**
 * REST API: GitHub Trending 목록 조회 (초기 데이터 — React Query)
 * @param sort - 정렬 기준: stars(기본) | forks
 */
export async function fetchTrendingRepos(sort: "stars" | "forks" = "stars"): Promise<TrendingReposResponse> {
  const path = `${BASE_URL}/api/trending`;
  const url = path.includes("?") ? `${path}&sort=${sort}` : `${path}?sort=${sort}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(errBody.error ?? "Failed to fetch trending");
  }
  return res.json();
}

/**
 * 트렌드 단건 조회 (예시)
 */
export async function fetchTechTrendById(id: string): Promise<{ trend: TechTrend }> {
  const res = await fetch(`${BASE_URL}/api/trends/${id}`);
  if (!res.ok) throw new Error("Failed to fetch trend");
  return res.json();
}
