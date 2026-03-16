"use client";

import { TrendingFeature } from "@/features/trending";
import { useTrendSSE, SSEStatus } from "@/features/realtime";
import { ChartsFeature } from "@/features/charts";
import { formatRelativeTime } from "@/utils";
import { useTrendingRepos } from "@/features/trending/hooks";
import * as s from "./dashboard.css";

/** 메인 대시보드: GitHub Trending + SSE 실시간 갱신 + Recharts */
export function DashboardView() {
  const { data } = useTrendingRepos();
  useTrendSSE();

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <h1 className={s.title}>실시간 기술 트렌드 대시보드</h1>
          <div className={s.headerMeta}>
            {data?.lastUpdated && (
              <span className={s.lastUpdated}>
                {formatRelativeTime(data.lastUpdated)}
              </span>
            )}
            <span className={s.headerMetaText}>
              <SSEStatus />
            </span>
          </div>
        </div>
      </header>

      <main className={s.main}>
        <section>
          <h2 className={s.sectionTitle}>GitHub Trending</h2>
          <TrendingFeature />
        </section>
        <section>
          <h2 className={s.sectionTitle}>데이터 시각화</h2>
          <ChartsFeature />
        </section>
      </main>
    </div>
  );
}
