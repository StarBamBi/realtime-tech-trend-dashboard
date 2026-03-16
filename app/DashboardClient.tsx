"use client";

import dynamic from "next/dynamic";

const DashboardView = dynamic(
  () => import("@/features/dashboard").then((m) => m.DashboardView),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-zinc-500">로딩 중...</p>
      </div>
    ),
  }
);

export default function DashboardClient() {
  return <DashboardView />;
}
