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

const COUNT_LABEL = "저장소 수";

import { colorVars } from "@/styles/theme.css";
import * as chartStyles from "./TechTrendChart.css";

/** UI 전용: Recharts — 기술 트렌드 차트 (TASK: 데이터 시각화) */
export function TechTrendChart({ data, title = "기술 트렌드" }: TechTrendChartProps) {
  return (
    <div className={chartStyles.root}>
      <h3 className={chartStyles.title}>{title}</h3>
      <p className={chartStyles.description}>
        트렌딩 목록 내 언어별 저장소 개수
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={`var(${colorVars.zinc200})`} />
          <XAxis dataKey="tech" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: COUNT_LABEL,
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: 12 },
            }}
          />
          <Tooltip
            formatter={(value) => [`${Number(value ?? 0)}개`, COUNT_LABEL]}
            contentStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="count" name={COUNT_LABEL} fill={`var(${colorVars.tossBlue})`} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
