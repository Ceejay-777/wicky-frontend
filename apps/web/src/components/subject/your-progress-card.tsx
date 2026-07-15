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
      className="border border-ink"
    >
      <h2 id="your-progress-heading" className="sr-only">
        Your progress
      </h2>
      <div className="flex items-center justify-between gap-2 border-b border-ink bg-ink px-3 py-2 text-paper sm:px-4 sm:py-2.5">
        <span className="font-display text-base font-semibold sm:text-lg">
          {subject.name}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 bg-card px-4 py-6 sm:px-6 sm:py-8">
        <div>
          <p
            className={cn(
              "font-display font-semibold leading-none text-foreground",
              "text-[28px] tracking-[-0.015em]",
              "sm:text-[32px] sm:tracking-[-0.018em]",
              "lg:text-[36px] lg:tracking-[-0.02em]",
            )}
          >
            Level {subject.level_unlocked}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {tier}
          </p>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-display font-semibold leading-none text-foreground",
              "text-[28px] tracking-[-0.015em]",
              "sm:text-[32px] sm:tracking-[-0.018em]",
              "lg:text-[36px] lg:tracking-[-0.02em]",
            )}
          >
            {formatPercent(percentComplete)}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Topic {passed} of {total}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 border-y border-ink -mx-0 bg-card">
        <StatCell label="Streak" value="--" />
        <StatCell label="Time" value="--" />
        <StatCell label="Points" value={formatPoints(subject.points)} />
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
