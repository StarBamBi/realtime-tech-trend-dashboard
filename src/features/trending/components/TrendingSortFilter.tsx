"use client";

import { useStore, type TrendingSort } from "@/store";
import * as s from "./TrendingSortFilter.css";

const OPTIONS: { value: TrendingSort; label: string }[] = [
  { value: "stars", label: "Star 순" },
  { value: "forks", label: "Fork 순" },
];

/** UI: GitHub Trending 정렬 필터 (Star 순 / Fork 순) */
export function TrendingSortFilter() {
  const trendingSort = useStore((state) => state.trendingSort);
  const setTrendingSort = useStore((state) => state.setTrendingSort);

  return (
    <div className={s.root}>
      <span className={s.label}>정렬</span>
      <div
        className={s.group}
        role="group"
        aria-label="정렬 기준"
      >
        {OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTrendingSort(value)}
            aria-pressed={trendingSort === value}
            className={trendingSort === value ? `${s.button} ${s.buttonActive}` : s.button}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
