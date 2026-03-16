"use client";

import { useTrendingRepos } from "./hooks";
import { TrendingList } from "./components";

/** Feature: GitHub Trending 조회 — 초기 데이터는 React Query로 fetch */
export function TrendingFeature() {
  const { data, isLoading, error } = useTrendingRepos();

  if (isLoading) return <p className="text-zinc-500">트렌딩 로딩 중...</p>;
  if (error) return <p className="text-rose-500">트렌딩을 불러올 수 없습니다.</p>;

  return <TrendingList repos={data?.repos ?? []} />;
}
