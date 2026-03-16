/** 기술 트렌드 단일 항목 */
export interface TechTrend {
  id: string;
  name: string;
  category: string;
  score: number;
  change: number;
  updatedAt: string;
}

/** 트렌드 목록 API 응답 */
export interface TechTrendsResponse {
  trends: TechTrend[];
  lastUpdated: string;
}

/** 실시간 이벤트 페이로드 */
export interface RealtimeTrendEvent {
  type: "trend_update" | "trend_add" | "trend_remove";
  payload: TechTrend;
}
