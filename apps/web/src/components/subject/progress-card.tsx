import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { ACCENT_TEXT, accentFor } from "@/lib/learning/accent";
import { formatPoints } from "@/lib/format/number";
import type { SubjectDetail } from "@wicky/types";

type Props = { subject: SubjectDetail; percent: number; passed: number; total: number };

export function ProgressCard({ subject, percent, passed, total }: Props) {
  return (
    <section aria-labelledby="your-progress" className="rounded-[14px] border-[1.5px] border-ink bg-field p-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 id="your-progress" className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">YOUR PROGRESS</h2>
          <p className="mt-1.5 font-display text-[72px] leading-[0.9] font-black">
            {percent}<span className="text-[34px]">%</span>
          </p>
        </div>
        <div className="min-w-0 text-right">
          <p className="truncate font-display text-[40px] leading-none font-black text-gold">{formatPoints(subject.points)}</p>
          <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">POINTS</p>
        </div>
      </div>
      <div className="mt-3">
        <SegmentedProgress percent={percent} className={ACCENT_TEXT[accentFor(subject.id)]} label="Topics passed" />
      </div>
      <div className="mt-3 flex justify-between gap-2 font-mono text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-muted-ink">
        <span><b className="text-ink">{passed}/{total}</b> TOPICS PASSED</span>
        <span>LEVEL <b className="text-ink">{subject.level_unlocked}</b> OF {Math.max(subject.levels.length, subject.level_unlocked)}</span>
      </div>
    </section>
  );
}
