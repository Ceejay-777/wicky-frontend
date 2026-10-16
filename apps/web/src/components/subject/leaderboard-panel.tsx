import { formatPoints } from "@/lib/format/number";
import { initials } from "@/lib/format/initials";
import { cn } from "@/lib/utils";
import type { TopicLeaderboardEntry } from "@wicky/types";

// Ranks 1 to 3 are larger and inked (gold, ink, tomato). Avatar and points never shrink; names take one line.
const TOP_COLOR = ["text-gold", "text-ink", "text-tomato"];

export function LeaderboardPanel({ entries, viewerId }: { entries: TopicLeaderboardEntry[]; viewerId: number | null }) {
  return (
    <ol className="flex flex-col gap-2">
      {entries.map((e, i) => {
        const top = e.rank <= 3;
        const you = e.user_id === viewerId;
        const gap = i > 0 && e.rank - entries[i - 1].rank > 1;
        return (
          <li key={e.user_id} className="contents">
            {gap && <div aria-hidden="true" className="py-0.5 text-center font-mono text-sm text-muted-ink">· · ·</div>}
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl bg-field px-3.5 py-2",
                top ? "min-h-16" : "min-h-14",
                you ? "border-2 border-tomato bg-tomato/15" : "border-[1.5px] border-ink",
              )}
            >
              <span className={cn("w-[34px] shrink-0 font-display leading-none font-black", top ? cn("text-4xl", TOP_COLOR[e.rank - 1]) : "text-[26px] text-muted-ink")}>
                <span className="sr-only">Rank </span>{e.rank}
              </span>
              <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink font-mono text-xs font-bold">
                {initials(e.display_name)}
              </span>
              <span className={cn("flex min-w-0 flex-1 items-center gap-1.5 text-base", you ? "font-semibold" : "font-medium")}>
                <span className="min-w-0 truncate">{e.display_name}</span>
                {you && <span className="shrink-0 rounded-full bg-tomato px-[7px] py-0.5 font-mono text-[10px] font-bold tracking-[0.1em] text-on-tomato">YOU</span>}
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-display text-2xl leading-none font-black">{formatPoints(e.points)}</span>
                <span className="block font-mono text-[9px] font-bold tracking-[0.1em] text-muted-ink">PTS</span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
