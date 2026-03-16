"use client";

import { useEffect, useRef, useCallback } from "react";
import { createUserEventSocket } from "@/services";
import { useStore } from "@/store";
import type { WSUserEvent } from "@/types";

type SocketInstance = ReturnType<typeof createUserEventSocket>;

/** 사용자 이벤트: WebSocket 연결 및 좋아요/구독 상태 반영 */
export function useUserEventSocket() {
  const setLiked = useStore((s) => s.setLikedRepos);
  const setSubscribed = useStore((s) => s.setSubscribedTechs);
  const socketRef = useRef<SocketInstance>(null);

  useEffect(() => {
    const socket = createUserEventSocket((event: WSUserEvent) => {
      if (event.type === "repo_like" && event.payload.repoId) {
        setLiked((prev) =>
          prev.includes(event.payload.repoId!)
            ? prev.filter((id) => id !== event.payload.repoId)
            : [...prev, event.payload.repoId!]
        );
      }
      if ((event.type === "tech_subscribe" || event.type === "tech_unsubscribe") && event.payload.tech) {
        setSubscribed((prev) =>
          event.type === "tech_subscribe"
            ? prev.includes(event.payload.tech!) ? prev : [...prev, event.payload.tech!]
            : prev.filter((t) => t !== event.payload.tech)
        );
      }
    });

    socketRef.current = socket;

    return () => {
      socket?.close();
      socketRef.current = null;
    };
  }, [setLiked, setSubscribed]);

  const send = useCallback((event: WSUserEvent) => {
    socketRef.current?.send(event);
  }, []);

  return { send };
}
