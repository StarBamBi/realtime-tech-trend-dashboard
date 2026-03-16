"use client";

import type { TechTrend } from "@/types";
import { formatScoreChange } from "@/utils";
import { Card, CardHeader, CardTitle } from "@/components";
import * as s from "./TrendList.css";

interface TrendListProps {
  trends: TechTrend[];
  title?: string;
}

function RankBadge({ rank }: { rank: 1 | 2 | 3 }) {
  const rankClass = rank === 1 ? s.rank1 : rank === 2 ? s.rank2 : s.rank3;
  return (
    <span className={rankClass} aria-label={`${rank}등`}>
      {rank}
    </span>
  );
}

/** 기술 트렌드 목록. 1·2·3등 뱃지로 순위 구분 */
export function TrendList({ trends, title = "기술 트렌드" }: TrendListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ul className={s.list}>
        {trends.map((t, index) => {
          const rank = (index + 1) as 1 | 2 | 3;
          const isTopThree = index < 3;
          return (
            <li key={t.id} className={isTopThree ? `${s.item} ${s.itemWithRank}` : s.item}>
              {isTopThree && <RankBadge rank={rank} />}
              <div className={s.itemLeft}>
                <span className={s.itemName}>{t.name}</span>
                <span className={s.itemCategory}>{t.category}</span>
              </div>
              <div className={s.itemRight}>
                <span className={s.itemScore}>{t.score}</span>
                <span
                  className={
                    t.change >= 0 ? s.itemChangePositive : s.itemChangeNegative
                  }
                >
                  {formatScoreChange(t.change)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
