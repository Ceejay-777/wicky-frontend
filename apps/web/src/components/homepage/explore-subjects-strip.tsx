"use client";

import { useRef } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SubjectDiscoveryCard } from "./subject-discovery-card";
import { AddSubjectCard } from "./add-subject-card";
import { cn } from "@/lib/utils";
import type { Subject } from "@wicky/types";

type ExploreSubjectsStripProps = {
  subjects: Subject[];
  slotsUsed: number;
  slotsTotal: number;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export function ExploreSubjectsStrip({
  subjects,
  slotsUsed,
  slotsTotal,
  loading,
  error,
  onRetry,
}: ExploreSubjectsStripProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (error) {
    return (
      <section aria-labelledby="explore-heading" className="mt-10 sm:mt-12">
        <div className="mb-3 flex items-baseline justify-between sm:mb-4">
          <h2
            id="explore-heading"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            Explore Other Subjects
          </h2>
        </div>
        <div className="border border-ink px-4 py-6 text-center sm:px-6 sm:py-8">
          <p className="text-[15px] text-foreground">{error}</p>
          {onRetry ? (
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={onRetry}>
                Retry
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section aria-labelledby="explore-heading" className="mt-10 sm:mt-12">
        <div className="mb-3 flex items-baseline justify-between sm:mb-4">
          <h2
            id="explore-heading"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            Explore Other Subjects
          </h2>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-[120px] w-[200px] shrink-0 border border-ink"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="explore-heading" className="mt-10 sm:mt-12">
      <div className="mb-3 flex items-baseline justify-between sm:mb-4">
        <h2
          id="explore-heading"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
        >
          Explore Other Subjects
        </h2>
        <div className="hidden gap-1 lg:flex">
          <ScrollButton dir={-1} onClick={() => scrollBy(-1)} />
          <ScrollButton dir={1} onClick={() => scrollBy(1)} />
        </div>
      </div>
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-4 overflow-x-auto pb-2",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
        role="list"
        aria-label="Subject discovery"
      >
        {subjects.map((s) => (
          <div key={s.id} role="listitem" className="contents">
            <SubjectDiscoveryCard subject={s} />
          </div>
        ))}
        <div role="listitem" className="contents">
          <AddSubjectCard slotsUsed={slotsUsed} slotsTotal={slotsTotal} />
        </div>
      </div>
    </section>
  );
}

function ScrollButton({
  dir,
  onClick,
}: {
  dir: 1 | -1;
  onClick: () => void;
}) {
  const Icon = dir === 1 ? IconChevronRight : IconChevronLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Scroll right" : "Scroll left"}
      className="inline-flex size-9 items-center justify-center border border-ink bg-background text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Icon size={18} stroke={1.5} aria-hidden="true" />
    </button>
  );
}
