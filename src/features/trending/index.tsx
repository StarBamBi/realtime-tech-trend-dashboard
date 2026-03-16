"use client";

import { useTrendingRepos } from "./hooks";
import { TrendingList, TrendingSortFilter } from "./components";
import * as s from "./index.css";

/** Feature: GitHub Trending 조회 — 초기 데이터는 React Query로 fetch, 정렬은 Star/Fork 순 */
export function TrendingFeature() {
  const { data, isLoading, error } = useTrendingRepos();

  if (isLoading) return <p className={s.loading}>트렌딩 로딩 중...</p>;
  if (error) {
    const message = error instanceof Error ? error.message : "트렌딩을 불러올 수 없습니다.";
    const isRateLimit = message.includes("rate limit") || message.includes("503");
    return (
      <div className={s.errorBox}>
        <p className={s.errorTitle}>트렌딩을 불러올 수 없습니다.</p>
        <p className={s.errorMessage}>{message}</p>
        {isRateLimit && (
          <p className={s.errorMessage}>
            프로젝트 루트에 <code className={s.errorCode}>.env.local</code> 파일을 만들고{" "}
            <code className={s.errorCode}>GITHUB_TOKEN=ghp_...</code> 를 설정한 뒤 서버를 재시작하세요.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={s.root}>
      <TrendingSortFilter />
      <TrendingList repos={data?.repos ?? []} />
    </div>
  );
}
