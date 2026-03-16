import { NextResponse } from "next/server";
import type { TechTrendsResponse } from "@/types";

/** Mock API: 개발 시 트렌드 목록 반환 (실제 백엔드 연동 시 교체) */
export async function GET() {
  const mockTrends: TechTrendsResponse = {
    trends: [
      { id: "1", name: "Next.js", category: "Framework", score: 92, change: 2, updatedAt: new Date().toISOString() },
      { id: "2", name: "React Query", category: "Library", score: 88, change: -1, updatedAt: new Date().toISOString() },
      { id: "3", name: "TypeScript", category: "Language", score: 95, change: 0, updatedAt: new Date().toISOString() },
    ],
    lastUpdated: new Date().toISOString(),
  };
  return NextResponse.json(mockTrends);
}
