"use client";

import type { TechTrend } from "@/types";
import { formatScoreChange } from "@/utils";
import { Card, CardHeader, CardTitle } from "@/components";

interface TrendListProps {
  trends: TechTrend[];
  title?: string;
}

export function TrendList({ trends, title = "기술 트렌드" }: TrendListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ul className="space-y-2">
        {trends.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between rounded-md border border-zinc-100 px-3 py-2 dark:border-zinc-800"
          >
            <div>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{t.name}</span>
              <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">{t.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{t.score}</span>
              <span
                className={`text-sm ${t.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
              >
                {formatScoreChange(t.change)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
