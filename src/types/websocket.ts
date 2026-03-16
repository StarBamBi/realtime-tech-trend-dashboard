/** 사용자 인터랙션: WebSocket 이벤트 (TASK: repository 좋아요, 관심 기술 구독) */
export type UserEventType = "repo_like" | "tech_subscribe" | "tech_unsubscribe";

export interface UserEventPayload {
  repoId?: string;
  tech?: string;
}

export interface WSUserEvent {
  type: UserEventType;
  payload: UserEventPayload;
}
