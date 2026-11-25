import { Skeleton } from "@/components/ui/skeleton";

export default function QuizHubLoading() {
  return (
    <div aria-busy="true" aria-label="Loading quizzes" className="px-[22px] pt-[30px] md:px-12 md:pt-11 xl:px-14">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-2 h-14 w-56 md:h-16 xl:h-[72px]" />
      <Skeleton className="mt-3.5 h-4 w-full max-w-[420px]" />
      <div className="mt-[22px] grid gap-3 md:grid-cols-2 md:gap-3.5 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[158px] rounded-[14px]" />
        ))}
      </div>
    </div>
  );
}
