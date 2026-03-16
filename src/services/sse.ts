import type { SSETrendEvent } from "@/types";

const SSE_URL = process.env.NEXT_PUBLIC_SSE_URL ?? (typeof window !== "undefined" ? "/api/events/trends" : "");

export interface SSECallbacks {
  onMessage: (event: SSETrendEvent) => void;
  onOpen?: () => void;
  onError?: () => void;
  onClose?: () => void;
}

/**
 * 실시간 데이터: SSE 구독 (5초 간격 전송 등 — 서버 설정에 따름).
 * polling 미사용, 스트리밍 기반 업데이트.
 */
export function subscribeTrendSSE(callbacks: SSECallbacks): () => void {
  if (typeof window === "undefined") return () => {};

  const es = new EventSource(SSE_URL);

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
