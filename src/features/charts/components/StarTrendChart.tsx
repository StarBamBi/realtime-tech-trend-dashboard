"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface StarTrendDataPoint {
  name: string;
  stars: number;
  timestamp?: string;
}

interface StarTrendChartProps {
  data: StarTrendDataPoint[];
  title?: string;
}

/** UI 전용: Recharts — star 증가 추이 (TASK: 데이터 시각화) */
export function StarTrendChart({ data, title = "Star 증가 추이" }: StarTrendChartProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 sm:p-4">
      <h3 className="mb-2 text-sm font-medium text-zinc-700 sm:mb-3 dark:text-zinc-300">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Line type="monotone" dataKey="stars" stroke="var(--color-emerald-500)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
