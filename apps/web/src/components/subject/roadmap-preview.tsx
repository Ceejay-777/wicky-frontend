import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { SubjectLevelProgress } from "@wicky/types";

type RoadmapPreviewProps = {
  subjectId: number;
  levels: SubjectLevelProgress[];
  topicsTotal: number;
};

export function RoadmapPreview({
  subjectId,
  levels,
  topicsTotal,
}: RoadmapPreviewProps) {
  const href = `/subjects/${subjectId}/roadmap`;
  return (
    <section aria-labelledby="roadmap-preview-heading" className="mt-8 sm:mt-10">
      <div className="mb-2 flex items-baseline justify-between gap-3 sm:mb-3">
        <h2
          id="roadmap-preview-heading"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
        >
          {topicsTotal} topics · {levels.length} levels
        </h2>
        <Link
          href={href}
          className={cn(
            "inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-primary",
            "underline-offset-4 hover:underline",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
        >
          View roadmap
          <IconArrowRight size={14} stroke={1.5} aria-hidden="true" />
        </Link>
      </div>
      <Link
        href={href}
        aria-label="View full roadmap"
        className={cn(
          "grid grid-cols-3 border border-ink",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        )}
      >
        {levels.map((lvl, i) => (
          <div
            key={lvl.level}
            className={cn(
              "relative px-2 py-3 text-center sm:px-3 sm:py-4",
              i !== levels.length - 1 && "border-r border-ink",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0",
                lvl.is_unlocked ? "bg-foreground" : "bg-muted",
              )}
            />
            <span className="relative font-mono text-[10px] uppercase tracking-[0.08em] text-paper mix-blend-difference">
              Level {lvl.level}
            </span>
            <div className="relative mt-1 font-mono text-[11px] text-paper mix-blend-difference">
              {lvl.passed}/{lvl.total}
            </div>
          </div>
        ))}
      </Link>
    </section>
  );
}
