import type { SSETrendEvent } from "@/types";

const SSE_BASE = process.env.NEXT_PUBLIC_SSE_URL ?? (typeof window !== "undefined" ? "/api/events/trends" : "");

export interface SSECallbacks {
  onMessage: (event: SSETrendEvent) => void;
  onOpen?: () => void;
  onError?: () => void;
  onClose?: () => void;
}

export interface SubscribeTrendSSEOptions {
  sort?: "stars" | "forks";
}

/**
 * 실시간 데이터: SSE 구독 (5초 간격 전송 등 — 서버 설정에 따름).
 * polling 미사용, 스트리밍 기반 업데이트.
 * sort 변경 시 다른 URL로 구독하므로 정렬 기준에 맞는 스트림 수신.
 */
export function subscribeTrendSSE(callbacks: SSECallbacks, options: SubscribeTrendSSEOptions = {}): () => void {
  if (typeof window === "undefined") return () => {};

  const { sort = "stars" } = options;
  const url = SSE_BASE.includes("?") ? `${SSE_BASE}&sort=${sort}` : `${SSE_BASE}?sort=${sort}`;

  const es = new EventSource(url);

  es.onmessage = (e) => {
    try {
      const event = JSON.parse(e.data) as SSETrendEvent;
      callbacks.onMessage(event);
    } catch {
      // ignore invalid
    }
  };

  es.onopen = () => callbacks.onOpen?.();
  es.onerror = () => callbacks.onError?.();
  es.addEventListener("close", () => {
    callbacks.onClose?.();
    es.close();
  });

  return () => es.close();
}
