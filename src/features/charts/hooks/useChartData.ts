import { useMemo } from "react";
import type { GitHubRepo } from "@/types";
import type { StarTrendDataPoint, TechTrendDataPoint } from "../components";

/** 비즈니스 로직: repos → 차트용 데이터 변환 */
export function useStarTrendData(repos: GitHubRepo[]): StarTrendDataPoint[] {
  return useMemo(
    () =>
      repos.slice(0, 10).map((r) => ({
        name: r.name,
        stars: r.stars,
        timestamp: r.updatedAt,
      })),
    [repos]
  );
}

/** 비즈니스 로직: repos → 기술별 집계 */
export function useTechTrendData(repos: GitHubRepo[]): TechTrendDataPoint[] {
  return useMemo(() => {
    const map = new Map<string, number>();
    for (const r of repos) {
      const lang = r.language ?? "Unknown";
      map.set(lang, (map.get(lang) ?? 0) + 1);
    }
    return Array.from(map.entries()).map(([tech, count]) => ({ tech, count }));
  }, [repos]);
}
