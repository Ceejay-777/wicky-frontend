import { Skeleton } from "@/components/ui/skeleton";

// Shaped like the result: close button, stamp, headline, points, summary card, two actions.
export default function QuizResultLoading() {
  return (
    <div aria-busy="true" aria-label="Loading result" className="mx-auto min-h-dvh pb-[200px] md:max-w-[600px] xl:max-w-[640px]">
      <div className="flex h-14 items-center px-1.5">
        <Skeleton className="m-2.5 size-6" />
      </div>
      <div className="px-[22px] pt-1.5">
        <Skeleton className="mx-auto mt-2 size-[240px] rounded-full" />
        <Skeleton className="mx-auto mt-[22px] h-[50px] w-64" />
        <Skeleton className="mx-auto mt-2.5 h-4 w-28" />
        <Skeleton className="mx-auto mt-[18px] h-[68px] w-40" />
        <Skeleton className="mt-5 h-[210px] rounded-[14px]" />
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] md:px-0">
        <div className="mx-auto flex flex-col gap-2.5 md:max-w-[600px] xl:max-w-[640px]">
          <Skeleton className="h-[52px] rounded-xl" />
          <Skeleton className="h-[52px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
