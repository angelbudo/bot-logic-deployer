import { Star, Trophy, ThumbsDown } from "lucide-react";
import type { PlayerMiniStats as Stats } from "@/online/usePlayerMiniStats";

/** Compact inline stats badge: level · win% · abandoned. */
export function PlayerMiniStatsRow({ stats, className }: { stats: Stats | null | undefined; className?: string }) {
  if (!stats) return null;
  const total = stats.wins + stats.losses;
  const winRate = total > 0 ? Math.round((stats.wins / total) * 100) : 0;
  return (
    <span className={`inline-flex items-center gap-1.5 leading-none whitespace-nowrap ${className ?? ""}`}>
      <span className="inline-flex items-center gap-0.5 text-orange-500 text-xs font-bold" title="Nivell">
        <Star className="w-3 h-3" /> {stats.level}
      </span>
      <span className="inline-flex items-center gap-0.5 text-primary text-[10px]" title="% Victòries">
        <Trophy className="w-2.5 h-2.5" /> {winRate}%
      </span>
      <span className="inline-flex items-center gap-0.5 text-background/50 text-[10px]" title="Abandonades">
        <ThumbsDown className="w-2.5 h-2.5" /> {stats.abandoned}
      </span>
    </span>
  );
}
