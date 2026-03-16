import { useQuery } from "@tanstack/react-query";
import { fetchTechTrends } from "@/services";

export const TRENDS_QUERY_KEY = ["techTrends"] as const;

/**
 * React Query: 서버 상태로 기술 트렌드 목록 조회
 */
export function useTechTrends() {
  return useQuery({
    queryKey: TRENDS_QUERY_KEY,
    queryFn: fetchTechTrends,
    refetchInterval: 30_000,
  });
}
