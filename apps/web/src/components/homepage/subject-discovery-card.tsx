import Link from "next/link";
import type { Subject } from "@wicky/types";
import { cn } from "@/lib/utils";

type SubjectDiscoveryCardProps = {
  subject: Subject;
};

export function SubjectDiscoveryCard({ subject }: SubjectDiscoveryCardProps) {
  return (
    <Link
      href={`/subjects/${subject.id}`}
      aria-label={`Browse ${subject.name}`}
      className={cn(
        "group flex h-full w-[200px] shrink-0 flex-col justify-between",
        "border border-ink bg-card p-4",
        "transition-colors hover:bg-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
      )}
    >
      <div className="font-display text-[18px] font-semibold leading-tight text-foreground">
        {subject.name}
      </div>
      <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {formatLearnerCount(subject.enrollment_count)} learners
      </div>
    </Link>
  );
}

function formatLearnerCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}
