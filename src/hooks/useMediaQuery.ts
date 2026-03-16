"use client";

import { useSyncExternalStore, useCallback } from "react";

/** 브레이크포인트 (px). 프로젝트 기준: mobile < 640, tablet 640~1023, desktop 1024+ */
export const BREAKPOINTS = {
  tablet: 640,
  desktop: 1024,
} as const;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  return { width: window.innerWidth, height: window.innerHeight };
}

function getServerSnapshot() {
  return { width: 0, height: 0 };
}

/**
 * 뷰포트 크기를 구독하는 훅. JS 기반 반응형(조건부 렌더링 등)이 필요할 때 사용.
 * 스타일만으로 충분하면 Tailwind의 sm:/md:/lg: 클래스를 우선 사용한다.
 */
export function useViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * 특정 min-width 미디어 쿼리 일치 여부를 반환한다.
 * @param query - CSS min-width (예: "640px", "48rem")
 */
export function useMediaQuery(query: string): boolean {
  const getMatch = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(min-width: ${query})`).matches;
  }, [query]);

  const subscribeMQ = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(`(min-width: ${query})`);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribeMQ,
    getMatch,
    () => false
  );
}

/** tablet(640px) 이상 여부 */
export function useIsTablet() {
  return useMediaQuery(`${BREAKPOINTS.tablet}px`);
}

/** desktop(1024px) 이상 여부 */
export function useIsDesktop() {
  return useMediaQuery(`${BREAKPOINTS.desktop}px`);
}
