"use client";

import { useStore } from "@/store";

const labels: Record<string, string> = {
  connecting: "SSE 연결 중...",
  connected: "실시간 연결됨",
  disconnected: "연결 끊김",
  error: "오류",
};

/** UI 전용: SSE 연결 상태 표시 */
export function SSEStatus() {
  const status = useStore((s) => s.connectionStatus);

  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
      <span
        className={`h-2 w-2 rounded-full ${
          status === "connected"
            ? "bg-emerald-500"
            : status === "connecting"
              ? "animate-pulse bg-amber-500"
              : status === "error"
                ? "bg-rose-500"
                : "bg-zinc-400"
        }`}
      />
      {labels[status] ?? status}
    </div>
  );
}
