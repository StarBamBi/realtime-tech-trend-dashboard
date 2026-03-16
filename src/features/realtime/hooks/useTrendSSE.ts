"use client";

import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { subscribeTrendSSE } from "@/services";
import { useStore } from "@/store";
import { TRENDING_QUERY_KEY } from "@/features/trending/hooks";
import type { GitHubRepo, SSETrendEvent } from "@/types";

type TrendingQueryData = { repos: GitHubRepo[]; lastUpdated: string };

/**
 * 실시간 업데이트: SSE 구독 → React Query 캐시 갱신 (polling 미사용)
 * - 초기 데이터는 useTrendingRepos(React Query)로 로드
 * - SSE 메시지 수신 시 동일 queryKey 캐시만 갱신하여 구독 중인 UI가 자동 반영
 */
export function useTrendSSE() {
  const queryClient = useQueryClient();
  const setStatus = useStore((s) => s.setConnectionStatus);

  const handleMessage = useCallback(
    (event: SSETrendEvent) => {
      setStatus("connected");
      queryClient.setQueryData<TrendingQueryData>(TRENDING_QUERY_KEY, (prev) => {
        if (!prev) return prev; // 초기 fetch 완료 전에는 캐시 덮어쓰지 않음
        const nextUpdated = new Date().toISOString();
        const { type, payload } = event;

        if (type === "trend_remove") {
          const repos = prev.repos.filter((r) => r.id !== payload.id);
          return { ...prev, repos, lastUpdated: nextUpdated };
        }

        const idx = prev.repos.findIndex((r) => r.id === payload.id);
        const repos = [...prev.repos];
        if (idx >= 0) {
          repos[idx] = payload; // trend_update
        } else {
          repos.push(payload); // trend_add
        }
        return { ...prev, repos, lastUpdated: nextUpdated };
      });
    },
    [queryClient, setStatus]
  );

  useEffect(() => {
    setStatus("connecting");

    const unsubscribe = subscribeTrendSSE({
      onMessage: handleMessage,
      onOpen: () => setStatus("connected"),
      onError: () => setStatus("error"),
      onClose: () => setStatus("disconnected"),
    });

    return () => {
      unsubscribe();
      setStatus("disconnected");
    };
  }, [handleMessage, setStatus]);
}
