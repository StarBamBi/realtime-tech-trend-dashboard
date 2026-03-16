"use client";

/**
 * Vanilla Extract 글로벌 스타일을 클라이언트에서만 로드합니다.
 * layout(Server Component)에서 import하면 서버 번들에서 실행되어
 * "Styles were unable to be assigned to a file" 오류가 발생하므로
 * 이 클라이언트 컴포넌트에서만 import합니다.
 */
import "@/styles/theme.css";
import "@/styles/global.css";

export function GlobalStyles() {
  return null;
}
