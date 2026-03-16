/** GitHub Trending 저장소 (TASK: repository 이름, star, fork, language) */
export interface GitHubRepo {
  id: string;
  name: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
}

export interface TrendingReposResponse {
  repos: GitHubRepo[];
  lastUpdated: string;
}

/** SSE 실시간 업데이트 이벤트 (스트리밍 기반, polling 미사용) */
export interface SSETrendEvent {
  type: "trend_update" | "trend_add" | "trend_remove";
  payload: GitHubRepo;
}
