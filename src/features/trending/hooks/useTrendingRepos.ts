import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRepos } from "@/services";
import { useStore } from "@/store";

export const TRENDING_QUERY_KEY = ["github", "trending"] as const;

/** 서버 상태: GitHub Trending 목록 조회 (React Query). sort는 store 기준으로 REST + SSE 동기화 */
export function useTrendingRepos() {
  const sort = useStore((s) => s.trendingSort);

  return useQuery({
    queryKey: [...TRENDING_QUERY_KEY, sort],
    queryFn: () => fetchTrendingRepos(sort),
    refetchOnWindowFocus: false,
  });
}
