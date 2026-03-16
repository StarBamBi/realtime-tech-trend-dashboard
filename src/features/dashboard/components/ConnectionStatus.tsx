"use client";

import { useStore } from "@/store";
import type { ConnectionStatus } from "@/store";
import * as s from "./ConnectionStatus.css";

const labels: Record<ConnectionStatus, string> = {
  connecting: "연결 중...",
  connected: "실시간 연결됨",
  disconnected: "연결 끊김",
  error: "오류",
};

function dotClass(status: ConnectionStatus): string {
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

export function ConnectionStatus() {
  const status = useStore((s) => s.connectionStatus);
  const label = labels[status];

  return (
    <div className={s.root}>
      <span className={`${s.dot} ${dotClass(status)}`} />
      {label}
    </div>
  );
}
