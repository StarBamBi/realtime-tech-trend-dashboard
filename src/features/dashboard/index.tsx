"use client";

import { TrendingFeature } from "@/features/trending";
import { useTrendSSE, SSEStatus } from "@/features/realtime";
import { useUserEventSocket } from "@/features/interaction";
import { ChartsFeature } from "@/features/charts";
import { formatRelativeTime } from "@/utils";
import { useTrendingRepos } from "@/features/trending/hooks";

/** 메인 대시보드: TASK 기반 Feature 조합 (GitHub Trending + SSE + WebSocket 인터랙션 + Recharts) */
export function DashboardView() {
  const { data } = useTrendingRepos();
  useTrendSSE();
  useUserEventSocket();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 sm:py-4 dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-base font-semibold text-zinc-900 sm:text-xl dark:text-zinc-100">
            실시간 기술 트렌드 대시보드
          </h1>
          <div className="flex min-h-[44px] items-center gap-3 sm:gap-4">
            {data?.lastUpdated && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatRelativeTime(data.lastUpdated)}
              </span>
            )}
            <SSEStatus />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-4 sm:px-6 sm:py-6 lg:space-y-8 lg:py-8">
        <section>
          <h2 className="mb-3 text-base font-medium text-zinc-800 sm:text-lg dark:text-zinc-200">
            GitHub Trending
          </h2>
          <TrendingFeature />
        </section>
        <section>
          <h2 className="mb-3 text-base font-medium text-zinc-800 sm:text-lg dark:text-zinc-200">
            데이터 시각화
          </h2>
          <ChartsFeature />
        </section>
      </main>
    </div>
  );
}
