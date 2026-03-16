import { NextResponse } from "next/server";

/** SSE 전송 간격 (밀리초) — 5초 */
const SSE_INTERVAL_MS = 5000;

/**
 * Server Sent Events 기반 실시간 데이터 스트림 API
 *
 * - GET /api/events/trends
 * - Content-Type: text/event-stream
 * - 5초 간격으로 trend_update 이벤트 전송 (polling 없이 스트리밍)
 * - 클라이언트 연결 종료 시 스트림 정리 (Controller is already closed 방지)
 */
export async function GET() {
  const encoder = new TextEncoder();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      function send() {
        if (closed) return;

        try {
          const data = JSON.stringify({
            type: "trend_update",
            payload: {
              id: "1",
              name: "vercel/next.js",
              stars: 120000 + Math.floor(Math.random() * 10),
              forks: 26000,
              language: "TypeScript",
              updatedAt: new Date().toISOString(),
            },
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch {
          closed = true;
          return;
        }

        if (!closed) {
          timeoutId = setTimeout(send, SSE_INTERVAL_MS);
        }
      }

      timeoutId = setTimeout(send, SSE_INTERVAL_MS);
    },
    cancel() {
      closed = true;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store, no-cache",
      Connection: "keep-alive",
    },
  });
}
