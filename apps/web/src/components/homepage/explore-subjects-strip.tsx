"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { SubjectDiscoveryCard } from "./subject-discovery-card";
import { AddSubjectCard } from "./add-subject-card";
import { cn } from "@/lib/utils";
import type { Subject } from "@wicky/types";

type ExploreSubjectsStripProps = {
  subjects: Subject[];
  slotsUsed: number;
  slotsTotal: number;
};

export function ExploreSubjectsStrip({
  subjects,
  slotsUsed,
  slotsTotal,
}: ExploreSubjectsStripProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [scrollThumb, setScrollThumb] = useState<{
    left: string;
    width: string;
  } | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const updateScrollThumb = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth) {
      setScrollThumb(null);
      return;
    }
    const thumbPct = (clientWidth / scrollWidth) * 100;
    const trackPct = 100 - thumbPct;
    const leftPct =
      (scrollLeft / (scrollWidth - clientWidth)) * trackPct;
    setScrollThumb({ left: `${leftPct}%`, width: `${thumbPct}%` });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollThumb();

    const ro = new ResizeObserver(updateScrollThumb);
    ro.observe(el);
    el.addEventListener("scroll", updateScrollThumb, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollThumb);
    };
  }, [updateScrollThumb]);

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
          "snap-x snap-mandatory",
          "[-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        )}
        role="list"
        aria-label="Subject discovery"
      >
        {subjects.map((s) => (
          <div key={s.id} role="listitem" className="shrink-0 snap-start">
            <SubjectDiscoveryCard subject={s} />
          </div>
        ))}
        <div role="listitem" className="shrink-0 snap-start">
          <AddSubjectCard slotsUsed={slotsUsed} slotsTotal={slotsTotal} />
        </div>
      </div>
      {scrollThumb && (
        <div
          className="mt-2 h-0.75 bg-muted lg:hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-foreground"
            style={{
              width: scrollThumb.width,
              marginLeft: scrollThumb.left,
            }}
          />
        </div>
      )}
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
