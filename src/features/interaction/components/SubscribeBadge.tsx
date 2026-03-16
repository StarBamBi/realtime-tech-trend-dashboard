"use client";

interface SubscribeBadgeProps {
  tech: string;
  subscribed: boolean;
  onToggle: (tech: string) => void;
}

/** UI 전용: 관심 기술 구독 뱃지 */
export function SubscribeBadge({ tech, subscribed, onToggle }: SubscribeBadgeProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(tech)}
      className={`rounded-full px-2 py-0.5 text-xs font-medium transition ${
        subscribed
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
      }`}
    >
      {subscribed ? "✓ 구독 중" : "구독"}
    </button>
  );
}
