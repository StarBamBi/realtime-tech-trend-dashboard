"use client";

import type { ReactNode } from "react";

interface LikeButtonProps {
  repoId: string;
  liked: boolean;
  onToggle: (repoId: string) => void;
  children?: ReactNode;
}

/** UI 전용: repository 좋아요 버튼 */
export function LikeButton({ repoId, liked, onToggle, children }: LikeButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={liked}
      onClick={() => onToggle(repoId)}
      className="rounded px-2 py-1 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      {children ?? (liked ? "❤️" : "🤍")}
    </button>
  );
}
