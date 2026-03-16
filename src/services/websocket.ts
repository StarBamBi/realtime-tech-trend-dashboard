import type { WSUserEvent } from "@/types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "";

export type WSMessageHandler = (event: WSUserEvent) => void;

/**
 * 사용자 이벤트: WebSocket (repository 좋아요, 관심 기술 구독 등).
 * 실시간 데이터는 SSE, 사용자 인터랙션은 WebSocket.
 */
export function createUserEventSocket(onMessage: WSMessageHandler): { send: (event: WSUserEvent) => void; close: () => void } | null {
  if (typeof window === "undefined" || !WS_URL) return null;

  const ws = new WebSocket(WS_URL);

  ws.onmessage = (e) => {
    try {
      const event = JSON.parse(e.data) as WSUserEvent;
      onMessage(event);
    } catch {
      // ignore
    }
  };

  return {
    send: (event: WSUserEvent) => {
      if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(event));
    },
    close: () => ws.close(),
  };
}
