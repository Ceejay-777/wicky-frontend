import { Skeleton } from "@/components/ui/skeleton";

export default function SubjectOverviewLoading() {
  return (
    <div className="flex flex-col gap-2" aria-busy="true">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <Skeleton className="size-11" />
        <Skeleton className="size-11" />
      </div>
      <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-5 sm:pt-3 lg:px-8 lg:pb-6 lg:pt-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-2 h-9 w-56 sm:h-10 sm:w-72 lg:h-11 lg:w-80" />
      </div>
      <hr className="border-t border-ink" />

      <div className="px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
        <div className="flex gap-1">
          <Skeleton className="h-11 w-24" />
          <Skeleton className="h-11 w-24" />
          <Skeleton className="h-11 w-28" />
        </div>
      </div>

      <div className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="border border-ink">
          <div className="flex items-center justify-between gap-3 border-b border-ink bg-ink px-3 py-2 sm:px-4 sm:py-2.5">
            <Skeleton className="h-5 w-32 bg-paper/20" />
            <Skeleton className="h-4 w-16 rounded-sm bg-paper/20" />
          </div>
          <div className="bg-card px-4 py-5 sm:px-6 sm:py-6">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="mt-2 h-7 w-3/4 sm:h-8" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-5/6" />
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Skeleton className="h-10 w-40 sm:min-h-0" />
              <Skeleton className="h-10 w-32 sm:min-h-0" />
            </div>
          </div>
        </div>

        <div className="mt-6 border border-ink bg-card p-4 sm:mt-8 sm:p-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-5 w-20" />
          <Skeleton className="mt-3 h-10 w-24 sm:h-12" />
          <Skeleton className="mt-4 h-1 w-full" />
          <Skeleton className="mt-2 h-3 w-32" />
          <div className="mt-4 grid grid-cols-3 border-t border-b border-ink -mx-4 sm:-mx-6">
            <Skeleton className="mx-auto my-3 h-4 w-12 sm:my-4" />
            <Skeleton className="mx-auto my-3 h-4 w-6 sm:my-4" />
            <Skeleton className="mx-auto my-3 h-4 w-6 sm:my-4" />
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="mb-2 flex items-baseline justify-between gap-3 sm:mb-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="grid grid-cols-3 border border-ink">
            <Skeleton className="h-14 sm:h-16" />
            <Skeleton className="h-14 border-l border-ink sm:h-16" />
            <Skeleton className="h-14 border-l border-ink sm:h-16" />
          </div>
        </div>

        <div className="h-8 lg:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}
