"use client";

import { useStore } from "@/store";
import * as s from "./SSEStatus.css";

const labels: Record<string, string> = {
  connecting: "SSE 연결 중...",
  connected: "실시간 연결됨",
  disconnected: "연결 끊김",
  error: "오류",
};

function dotClass(status: string): string {
  switch (status) {
    case "connected":
      return s.dotConnected;
    case "connecting":
      return s.dotConnecting;
    case "error":
      return s.dotError;
    default:
      return s.dot;
  }
}

/** UI 전용: SSE 연결 상태 표시 */
export function SSEStatus() {
  const status = useStore((state) => state.connectionStatus);

  return (
    <div className={s.root}>
      <span className={`${s.dot} ${dotClass(status)}`} />
      {labels[status] ?? status}
    </div>
  );
}
