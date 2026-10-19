import { ReadingHeader } from "@/components/topic/reading-header";
import { READING_GRID, READING_PAGE, READING_RAIL } from "@/components/topic/reading-layout";
import { BodySkeleton, Bone, RailSkeleton, TitleBlockSkeleton } from "@/components/topic/reading-skeleton";

// Same grid as the loaded page (reading column, plus the rail on desktop) so nothing moves.
export default function TopicLoading() {
  return (
    <div aria-busy="true" aria-label="Loading topic" className="leading-[normal]">
      <ReadingHeader backHref="/subjects" />
      <div className={READING_PAGE}>
        <div className={READING_GRID}>
          <div>
            <TitleBlockSkeleton />
            <BodySkeleton />
          </div>
          <div className={READING_RAIL}>
            <RailSkeleton />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(18px+env(safe-area-inset-bottom))] md:px-0 md:pb-[calc(20px+env(safe-area-inset-bottom))]">
        <div className="mx-auto md:max-w-[620px] xl:max-w-[680px] xl:px-[22px]">
          <Bone className="h-[52px] rounded-[12px]" />
        </div>
      </div>
    </div>
  );
}
