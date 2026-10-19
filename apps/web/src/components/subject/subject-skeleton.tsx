"use client";

import { useParams, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectTabs } from "./subject-tabs";
import { cn } from "@/lib/utils";

// Skeletons for the subject page. They use the same grids as the real tabs, and pick the
// tab from the URL, so the roadmap does not flash an overview-shaped skeleton.

const rows = (n: number) => Array.from({ length: n }, (_, i) => i);

function OverviewBody() {
  return (
    <div className="grid items-start gap-3.5 md:grid-cols-[1.2fr_1fr] md:gap-8 xl:grid-cols-2 xl:gap-12">
      <div className="flex flex-col gap-3.5">
        <Skeleton className="h-[260px] rounded-[14px]" />
        <Skeleton className="h-[190px] rounded-[14px]" />
      </div>
      <div className="flex flex-col gap-3.5">
        <Skeleton className="h-[230px] rounded-[14px]" />
        <Skeleton className="h-[76px] rounded-[14px]" />
        <Skeleton className="h-[52px] rounded-[14px]" />
      </div>
    </div>
  );
}

// One column on phones, two on tablet (levels 1 and 3 left, 2 right), three on desktop.
const LEVEL_PLACEMENT = [
  "",
  "md:col-start-2 md:row-span-2 md:row-start-1 xl:col-auto xl:row-auto xl:row-span-1",
  "md:col-start-1 md:row-start-2 xl:col-auto xl:row-auto",
];

function RoadmapBody() {
  return (
    <div aria-hidden="true" className="grid items-start gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
      {[4, 5, 3].map((count, i) => (
        <section key={i} className={LEVEL_PLACEMENT[i]}>
          <div className="mb-2.5 flex min-h-11 flex-col justify-center gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="flex flex-col gap-2">
            {rows(count).map((r) => (
              <Skeleton key={r} className="h-14 rounded-xl" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function LeaderboardBody() {
  return (
    <div aria-hidden="true">
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="mt-1.5 mb-4 h-[30px] w-1/2 md:h-[34px]" />
      <div className="md:grid md:grid-cols-[1.4fr_1fr] md:items-start md:gap-10 xl:grid-cols-[1.3fr_1fr] xl:gap-12">
        <div className="flex flex-col gap-2">
          {rows(6).map((r) => (
            <Skeleton key={r} className="h-[60px] rounded-xl" />
          ))}
        </div>
        <Skeleton className="hidden h-[240px] rounded-[14px] md:block" />
      </div>
    </div>
  );
}

// The body that goes inside the page padding, for whichever tab the URL is on.
export function SubjectBodySkeleton() {
  const pathname = usePathname();
  return pathname.endsWith("/roadmap") ? <RoadmapBody /> : pathname.endsWith("/leaderboard") ? <LeaderboardBody /> : <OverviewBody />;
}

// Header, real tab bar and body: for the first load, before the subject is known.
export function SubjectPageSkeleton({ className }: { className?: string }) {
  const { id } = useParams<{ id: string }>();
  return (
    <div aria-busy="true" aria-label="Loading subject" className={cn(className)}>
      <div aria-hidden="true" className="px-[22px] pt-[26px] md:px-12 md:pt-8 xl:px-14">
        <div className="flex min-h-11 items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2.5">
          <Skeleton className="h-[54px] w-3/4" />
          <Skeleton className="size-14 shrink-0 rounded-full" />
        </div>
      </div>
      <SubjectTabs subjectId={Number(id)} />
      <div className="px-[22px] pt-5 pb-8 md:px-12 xl:px-14">
        <SubjectBodySkeleton />
      </div>
    </div>
  );
}
