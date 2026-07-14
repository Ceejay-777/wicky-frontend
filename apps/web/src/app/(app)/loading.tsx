import { IconBell } from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

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

      <div className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <Skeleton className="h-9 w-72 sm:h-10 sm:w-96" />
        <Skeleton className="mt-3 h-5 w-64 sm:h-6 sm:w-80" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <Skeleton className="mt-10 h-3 w-40 sm:mt-12" />
        <div className="mt-3 border-t border-ink">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b border-ink px-2 py-4 sm:px-4 sm:py-5"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-8 lg:hidden" aria-hidden="true" />
    </div>
  );
}
