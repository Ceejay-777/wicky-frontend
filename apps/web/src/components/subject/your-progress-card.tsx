import { formatPoints, formatPercent } from "@/lib/format/number";
import { cn } from "@/lib/utils";
import type { SubjectDetail, SubjectTopicItem } from "@wicky/types";

type YourProgressCardProps = {
  subject: SubjectDetail;
  percentComplete: number;
};

const TIER_NAMES: Record<number, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

function tierName(level: number): string {
  if (level >= 4) return "Master";
  return TIER_NAMES[level] ?? "Beginner";
}

function tierLabel(level: number): string {
  return `L${level}`;
}

export function YourProgressCard({
  subject,
  percentComplete,
}: YourProgressCardProps) {
  const tier = tierName(subject.level_unlocked);
  const total = subject.topics.length;
  const passed = subject.topics.filter(
    (t: SubjectTopicItem) => t.is_passed,
  ).length;

  return (
    <section
      aria-labelledby="your-progress-heading"
      className="border border-ink bg-card p-4 sm:p-6"
    >
      <h2 id="your-progress-heading" className="sr-only">
        Your progress
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        Level {tierLabel(subject.level_unlocked)} · {tier}
      </p>
      <p
        className={cn(
          "mt-1 font-display italic text-muted-foreground",
          "text-[16px] sm:text-[18px]",
        )}
      >
        {tier}
      </p>
      <p
        className={cn(
          "mt-2 font-display font-semibold leading-none text-foreground",
          "text-[36px] tracking-[-0.015em]",
          "sm:text-[40px] sm:tracking-[-0.018em]",
          "lg:text-[44px] lg:tracking-[-0.02em]",
        )}
      >
        {formatPercent(percentComplete)}
      </p>
      <div
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Subject completion"
        className="mt-4 h-1 w-full bg-muted"
      >
        <div
          className="h-full bg-foreground"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        Topic {passed} of {total}
      </p>
      <div className="mt-4 grid grid-cols-3 border-t border-b border-ink -mx-4 sm:-mx-6">
        <StatCell label="Points" value={formatPoints(subject.points)} />
        <StatCell label="Streak" value="--" />
        <StatCell label="Time" value="--" />
      </div>
    </section>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-ink px-2 py-3 text-center last:border-r-0 sm:px-4">
      <div className="font-mono text-[14px] font-semibold text-foreground sm:text-[15px]">
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
