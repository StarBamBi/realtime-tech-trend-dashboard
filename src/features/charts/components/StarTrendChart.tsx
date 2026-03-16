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

import { colorVars } from "@/styles/theme.css";
import * as chartStyles from "./StarTrendChart.css";

/** UI 전용: Recharts — star 증가 추이 (TASK: 데이터 시각화) */
export function StarTrendChart({ data, title = "Star 증가 추이" }: StarTrendChartProps) {
  return (
    <div className={chartStyles.root}>
      <h3 className={chartStyles.title}>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={`var(${colorVars.zinc200})`} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="stars" stroke={`var(${colorVars.tossBlue})`} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
