"use client";

import dynamic from "next/dynamic";
import * as s from "./loading.css";

const DashboardView = dynamic(
  () => import("@/features/dashboard").then((m) => m.DashboardView),
  {
    ssr: false,
    loading: () => (
      <div className={s.root}>
        <p className={s.text}>로딩 중...</p>
      </div>
    ),
  }
);

export default function DashboardClient() {
  return <DashboardView />;
}
