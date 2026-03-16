import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRepos } from "@/services";

export const TRENDING_QUERY_KEY = ["github", "trending"] as const;

/** 서버 상태: GitHub Trending 목록 조회 (React Query) */
export function useTrendingRepos() {
  return useQuery({
    queryKey: TRENDING_QUERY_KEY,
    queryFn: fetchTrendingRepos,
    refetchOnWindowFocus: false,
  });
}
