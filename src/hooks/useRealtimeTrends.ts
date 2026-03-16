"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createRealtimeClient } from "@/services";
import { useStore } from "@/store";
import { TRENDS_QUERY_KEY } from "./useTechTrends";
import type { TechTrend, RealtimeTrendEvent } from "@/types";

/**
 * 실시간 트렌드 이벤트 수신 시 서버 상태(React Query) 갱신 + 클라이언트 스냅샷 갱신
 */
export function useRealtimeTrends() {
  const queryClient = useQueryClient();
  const setConnectionStatus = useStore((s) => s.setConnectionStatus);
  const setLiveSnapshot = useStore((s) => s.setLiveTrendsSnapshot);
  const clientRef = useRef<ReturnType<typeof createRealtimeClient>>(null);

  useEffect(() => {
    setConnectionStatus("connecting");

    const client = createRealtimeClient((event: RealtimeTrendEvent) => {
      setConnectionStatus("connected");

      const { type, payload } = event;

      queryClient.setQueryData<{ trends: TechTrend[]; lastUpdated: string }>(
        TRENDS_QUERY_KEY,
        (prev) => {
          if (!prev) return { trends: [payload], lastUpdated: new Date().toISOString() };
          let trends = [...prev.trends];
          const idx = trends.findIndex((t) => t.id === payload.id);

          if (type === "trend_remove" && idx >= 0) {
            trends = trends.filter((t) => t.id !== payload.id);
          } else if (type === "trend_add" && idx < 0) {
            trends.push(payload);
          } else if ((type === "trend_update" || type === "trend_add") && idx >= 0) {
            trends[idx] = payload;
          } else if (type === "trend_add") {
            trends.push(payload);
          }

          return { ...prev, trends, lastUpdated: new Date().toISOString() };
        }
      );

      setLiveSnapshot((prev) => {
        const next = prev.filter((t) => t.id !== payload.id);
        if (type !== "trend_remove") next.push(payload);
        return next;
      });
    });

    clientRef.current = client;

    if (!client) {
      setConnectionStatus("disconnected");
      return;
    }

    return () => {
      client?.close();
      setConnectionStatus("disconnected");
    };
  }, [queryClient, setConnectionStatus, setLiveSnapshot]);
}
