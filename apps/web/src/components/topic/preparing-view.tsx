"use client";

import { useRouter } from "next/navigation";
import { useRefetchOnEvent } from "@/lib/events/use-refetch-on-event";
import { ReadingFooter } from "./reading-footer";
import { ReadingHeader } from "./reading-header";
import { READING_GRID, READING_PAGE, READING_RAIL } from "./reading-layout";
import { BodySkeleton, RailSkeleton } from "./reading-skeleton";
import { TitleBlock } from "./title-block";

type Props = { topicId: number; title: string; subjectId: number; subjectName: string; level: number; number: number };

// The reading is written the first time a topic is opened. Wait for its topic.status event, then re-fetch.
export function PreparingView({ topicId, title, subjectId, subjectName, level, number }: Props) {
  const router = useRouter();
  useRefetchOnEvent({ active: true, event: "topic.status", match: (p) => p.topic_id === topicId, onChange: () => router.refresh() });

  const backHref = `/subjects/${subjectId}/roadmap`;
  return (
    <div className="leading-[normal]">
      <ReadingHeader backHref={backHref} subject={subjectName} />
      <div className={READING_PAGE}>
        <div className={READING_GRID}>
          <div>
          <TitleBlock level={level} number={number} title={title} meta="PREPARING YOUR READING" passed={false} />
          <div role="status" className="mx-[22px] mt-5 rounded-[10px] border-[1.5px] border-dashed border-muted-ink px-3.5 py-3 text-sm leading-[1.45] text-muted-ink">
            Writing your reading. The first time a topic is opened this can take a moment.
          </div>
          <BodySkeleton className="pt-6" />
          </div>
          <div className={READING_RAIL}>
            <RailSkeleton />
          </div>
        </div>
      </div>
      <ReadingFooter topicId={topicId} backHref={backHref} passed={false} nextHref={null} advancedReady={false} hasLinks={false} notice={null} disabled />
    </div>
  );
}
