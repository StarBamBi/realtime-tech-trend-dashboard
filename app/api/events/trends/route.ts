import { NextResponse } from "next/server";
import { fetchTrendingReposFromGitHub, type TrendingSort } from "@/services/github.server";

/** SSE 전송 간격 (밀리초) — 5초 */
const SSE_INTERVAL_MS = 5000;
const SORT_VALUES = ["stars", "forks"] as const;

/**
 * Server Sent Events 기반 실시간 데이터 스트림 API
 *
 * - GET /api/events/trends?sort=stars|forks
 * - Content-Type: text/event-stream
 * - 5초 간격으로 GitHub Search API에서 인기 저장소를 조회한 뒤 trend_update 이벤트 전송 (polling 없이 스트리밍)
 * - 클라이언트 연결 종료 시 스트림 정리 (Controller is already closed 방지)
 * - GITHUB_TOKEN 미설정 시 rate limit(60/h) 주의; 5초 간격 사용 시 토큰 설정 권장
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sortParam = searchParams.get("sort") ?? "stars";
  const sort: TrendingSort = SORT_VALUES.includes(sortParam as (typeof SORT_VALUES)[number])
    ? (sortParam as TrendingSort)
    : "stars";

  const encoder = new TextEncoder();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      async function send() {
        if (closed) return;

        try {
          const repos = await fetchTrendingReposFromGitHub({ perPage: 10, sort });
          for (const payload of repos) {
            if (closed) break;
            const data = JSON.stringify({ type: "trend_update", payload });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        } catch (err) {
          console.error("[SSE /api/events/trends]", err);
          // 다음 주기에 재시도
        }

        if (!closed) {
          timeoutId = setTimeout(send, SSE_INTERVAL_MS);
        }
      }

      send(); // 첫 배치 즉시 전송, 이후 5초 간격
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
