import { Skeleton } from "@/components/ui/skeleton";

export default function SubjectsLoading() {
  return (
    <div aria-busy="true" aria-label="Loading subjects" className="px-[22px] pt-[30px] md:px-12 md:pt-11 xl:px-14">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-2 h-14 w-56" />
      <div className="mt-7 grid gap-3 md:grid-cols-2 xl:max-w-[66%]">
        <Skeleton className="h-[150px] rounded-xl" />
        <Skeleton className="h-[150px] rounded-xl" />
        <Skeleton className="h-[90px] rounded-xl" />
      </div>
    </div>
  );
}
