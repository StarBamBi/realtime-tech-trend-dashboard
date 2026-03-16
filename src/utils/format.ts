/**
 * 날짜/시간 포맷 유틸
 */
export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);

  if (diffSec < 60) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  return date.toLocaleString("ko-KR");
}

/**
 * 점수 변경량 포맷 (± 기호 포함)
 */
export function formatScoreChange(change: number): string {
  if (change === 0) return "0";
  const sign = change > 0 ? "+" : "";
  return `${sign}${change}`;
}
