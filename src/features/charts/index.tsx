"use client";

import { useTrendingRepos } from "@/features/trending/hooks";
import { StarTrendChart, TechTrendChart } from "./components";
import { useStarTrendData, useTechTrendData } from "./hooks";

/** Feature: 데이터 시각화 — Recharts (star 증가 추이, 기술 트렌드) */
export function ChartsFeature() {
  const { data } = useTrendingRepos();
  const repos = data?.repos ?? [];
  const starData = useStarTrendData(repos);
  const techData = useTechTrendData(repos);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
      <StarTrendChart data={starData} />
      <TechTrendChart data={techData} />
    </div>
  );
}
