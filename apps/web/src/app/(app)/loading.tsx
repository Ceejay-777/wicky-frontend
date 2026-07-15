import { Skeleton } from "@/components/ui/skeleton";
import { IconBell } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function AppLoading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          An Almanac of Learning
        </span>
        <span
          aria-hidden="true"
          className="relative inline-flex size-11 items-center justify-center border border-ink bg-background text-ink"
        >
          <IconBell size={20} stroke={1.5} aria-hidden="true" />
        </span>
      </div>
      <hr className="border-t border-ink" />

      <header className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <Skeleton className="h-9 w-72 sm:h-10 sm:w-96" />
        <Skeleton className="mt-3 h-5 w-64 sm:h-6 sm:w-80" />
      </header>

      <div className="px-4 sm:px-6 lg:px-8">
        <Skeleton className="mt-8 h-3 w-40 sm:mt-10" />
        <div className="mt-3 border-t border-ink">
          <CurrentlyLearningRow maxNameWidth={180} pointsWidth={20} />
          <CurrentlyLearningRow maxNameWidth={140} pointsWidth={20} />
          <CurrentlyLearningRow maxNameWidth={200} pointsWidth={20} />
        </div>

        <Skeleton className="mt-10 h-3 w-40 sm:mt-12" />
        <div
          className={cn(
            "mt-3 flex gap-4 overflow-x-auto pb-2",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          <DiscoveryCardSkeleton nameMaxWidth={140} />
          <DiscoveryCardSkeleton nameMaxWidth={110} />
          <DiscoveryCardSkeleton nameMaxWidth={160} />
          <DiscoveryCardSkeleton nameMaxWidth={120} />
          <AddSubjectCardSkeleton />
        </div>
      </div>

      <div className="h-8 lg:hidden" aria-hidden="true" />
    </div>
  );
}

function CurrentlyLearningRow({
  maxNameWidth,
  pointsWidth,
}: {
  maxNameWidth: number;
  pointsWidth: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink px-2 py-4 sm:px-4 sm:py-5">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Skeleton
          className="h-[18px] w-full"
          style={{ maxWidth: maxNameWidth }}
        />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Skeleton className="h-3.5" style={{ width: pointsWidth * 4 }} />
        <Skeleton className="size-[18px]" />
      </div>
    </div>
  );
}

function DiscoveryCardSkeleton({ nameMaxWidth }: { nameMaxWidth: number }) {
  return (
    <div className="flex h-[110px] w-[200px] shrink-0 flex-col justify-between border border-ink bg-background p-4">
      <Skeleton className="h-[18px] w-full" style={{ maxWidth: nameMaxWidth }} />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

function AddSubjectCardSkeleton() {
  return (
    <div className="flex h-[110px] w-[200px] shrink-0 flex-col items-center justify-center border border-dashed border-ink bg-background p-4">
      <Skeleton className="size-7" />
      <Skeleton className="mt-3 h-4 w-24" />
      <Skeleton className="mt-1 h-3 w-24" />
    </div>
  );
}
