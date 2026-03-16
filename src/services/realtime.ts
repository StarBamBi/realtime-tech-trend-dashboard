import type { RealtimeTrendEvent } from "@/types";

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL ?? "";

export type RealtimeMessageHandler = (event: RealtimeTrendEvent) => void;

/**
 * 실시간 데이터 레이어: WebSocket/Socket.IO 연결 및 이벤트 구독
 * 브라우저에서만 사용 (클라이언트 컴포넌트 또는 훅에서 호출)
 */
export function createRealtimeClient(onMessage: RealtimeMessageHandler) {
  if (typeof window === "undefined") return null;

  // Socket.IO 또는 네이티브 WebSocket 래퍼로 확장 가능
  if (!SOCKET_URL) {
    console.warn("NEXT_PUBLIC_WS_URL not set, realtime client disabled");
    return null;
  }

  // 예시: WebSocket 사용 시
  const ws = new WebSocket(SOCKET_URL);

  ws.onmessage = (e) => {
    try {
      const event = JSON.parse(e.data) as RealtimeTrendEvent;
      onMessage(event);
    } catch {
      // ignore invalid messages
    }
  };

  return {
    close: () => ws.close(),
    get readyState() {
      return ws.readyState;
    },
  };
}
