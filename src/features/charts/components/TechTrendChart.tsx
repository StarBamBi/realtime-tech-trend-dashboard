"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface TechTrendDataPoint {
  tech: string;
  count: number;
  score?: number;
}

interface TechTrendChartProps {
  data: TechTrendDataPoint[];
  title?: string;
}

/** UI 전용: Recharts — 기술 트렌드 차트 (TASK: 데이터 시각화) */
export function TechTrendChart({ data, title = "기술 트렌드" }: TechTrendChartProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 sm:p-4">
      <h3 className="mb-2 text-sm font-medium text-zinc-700 sm:mb-3 dark:text-zinc-300">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis dataKey="tech" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Bar dataKey="count" fill="var(--color-violet-500)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
