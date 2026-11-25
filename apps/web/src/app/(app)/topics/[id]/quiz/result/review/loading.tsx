import { Skeleton } from "@/components/ui/skeleton";

// Shaped like the review: header, score headline, question cards, one action.
export default function QuizReviewLoading() {
  return (
    <div aria-busy="true" aria-label="Loading review" className="mx-auto min-h-dvh pb-[110px] md:max-w-[620px] xl:max-w-[1040px]">
      <div className="flex h-14 items-center justify-center">
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="px-[22px] pt-2 md:px-0 md:pt-0">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="mt-2 h-[42px] w-60" />
        <div className="mt-5 flex flex-col gap-3.5 md:mt-[18px] md:gap-3 xl:grid xl:grid-cols-2 xl:gap-3.5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[260px] rounded-[14px]" />
          ))}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] md:px-0">
        <Skeleton className="mx-auto h-[52px] rounded-xl md:max-w-[600px] xl:max-w-[640px]" />
      </div>
    </div>
  );
}
