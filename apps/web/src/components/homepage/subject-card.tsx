import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { LevelSeal } from "@/components/stamp/level-seal";
import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { ACCENT_TEXT, accentFor } from "@/lib/learning/accent";
import { formatPercent, formatPoints } from "@/lib/format/number";
import type { EnrolledSubject } from "@wicky/types";

// One active subject: seal, name, current topic ("NOW"), segmented progress, totals.
export function SubjectCard({ subject }: { subject: EnrolledSubject }) {
  const accent = ACCENT_TEXT[accentFor(subject.id)];
  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="block rounded-xl border-[1.5px] border-ink bg-field p-3.5 text-ink transition-colors hover:bg-kraft/60"
    >
      <div className="flex items-center gap-3">
        <LevelSeal level={subject.level_unlocked} className={accent} />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 font-display text-[27px] leading-none font-black tracking-[0.01em] uppercase [hyphens:auto] [overflow-wrap:break-word]">
            {subject.name}
          </p>
          {subject.current_topic && (
            <p className="mt-1 truncate text-sm text-ink-2">
              <span className={`font-mono text-[10px] font-bold tracking-[0.1em] ${accent}`}>NOW</span>
              &nbsp; {subject.current_topic.title}
            </p>
          )}
        </div>
        <IconChevronRight size={20} stroke={2} aria-hidden="true" className="shrink-0 text-muted-ink" />
      </div>
      <div className="mt-3">
        <SegmentedProgress percent={subject.percent_complete} className={accent} label={`${subject.name} progress`} />
      </div>
      <div className="mt-2.5 flex justify-between gap-2 font-mono text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-muted-ink">
        <span><b className="text-ink">{subject.topics_passed}/{subject.topics_total}</b> TOPICS</span>
        <span><b className="text-ink">{formatPoints(subject.points)}</b> PTS</span>
        <span><b className="text-ink">{formatPercent(subject.percent_complete)}</b> DONE</span>
      </div>
    </Link>
  );
}
