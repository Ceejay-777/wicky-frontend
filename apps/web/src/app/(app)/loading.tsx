import { Skeleton } from "@/components/ui/skeleton";

// Shaped like the final Home: greeting, subject cards, explore row.
export default function AppLoading() {
  return (
    <div className="px-[22px] pt-[30px] md:px-12 md:pt-11 xl:px-14" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-8 w-24 md:hidden" />
      <Skeleton className="mt-[26px] h-3 w-28 md:mt-0" />
      <Skeleton className="mt-2 h-14 w-56 md:h-16" />

      <div className="xl:grid xl:grid-cols-[2fr_1fr] xl:gap-12">
        <div>
          <Skeleton className="mt-7 mb-3 h-3 w-40 md:mt-[30px]" />
          <div className="grid gap-3 md:grid-cols-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-[142px] rounded-xl" />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="mt-7 mb-3 h-3 w-36 md:mt-[30px]" />
          <div className="-mr-[22px] flex gap-2.5 overflow-hidden md:mr-0 md:grid md:grid-cols-4 md:gap-3 xl:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[158px] w-[142px] shrink-0 rounded-xl md:w-auto" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
