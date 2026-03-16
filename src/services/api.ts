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
 */
export async function fetchTrendingRepos(): Promise<TrendingReposResponse> {
  const res = await fetch(`${BASE_URL}/api/trending`);
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
