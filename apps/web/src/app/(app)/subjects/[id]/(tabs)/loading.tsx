import { Skeleton } from "@/components/ui/skeleton";

// Matches the final layout: header, tabs, then the overview cards.
export default function SubjectLoading() {
  return (
    <div aria-busy="true" aria-label="Loading subject" className="px-[22px] pt-[26px] md:px-12 xl:px-14">
      <Skeleton className="h-11 w-24" />
      <Skeleton className="mt-2 h-[100px] w-3/4" />
      <Skeleton className="mt-[18px] h-12 w-full" />
      <div className="mt-5 flex flex-col gap-3.5 xl:max-w-2xl">
        <Skeleton className="h-[260px] rounded-[14px]" />
        <Skeleton className="h-[190px] rounded-[14px]" />
        <Skeleton className="h-[210px] rounded-[14px]" />
      </div>
    </div>
  );
}
