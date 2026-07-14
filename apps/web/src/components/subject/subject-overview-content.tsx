"use client";

import { useMemo } from "react";
import { SubjectHeader } from "./subject-header";
import { SegmentedTabs } from "./segmented-tabs";
import { CurrentTopicCard } from "./current-topic-card";
import { YourProgressCard } from "./your-progress-card";
import { RoadmapPreview } from "./roadmap-preview";
import type { SubjectDetail, SubjectTopicItem } from "@wicky/types";

type SubjectOverviewContentProps = {
  data: SubjectDetail;
};

export function SubjectOverviewContent({ data }: SubjectOverviewContentProps) {
  const { currentTopic, percentComplete } = useMemo(
    () => derive(data),
    [data],
  );

  return (
    <div className="flex flex-col gap-2">
      <SubjectHeader name={data.name} />
      <div className="px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
        <SegmentedTabs
          tabs={[
            { label: "Overview", href: `/subjects/${data.id}` },
            {
              label: "Roadmap",
              href: `/subjects/${data.id}/roadmap`,
            },
            {
              label: "Leaderboard",
              href: `/subjects/${data.id}/leaderboard`,
            },
          ]}
        />
      </div>
      <div className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <CurrentTopicCard subject={data} topic={currentTopic} />
        <div className="mt-6 sm:mt-8">
          <YourProgressCard
            subject={data}
            percentComplete={percentComplete}
          />
        </div>
        <RoadmapPreview
          subjectId={data.id}
          levels={data.levels}
          topicsTotal={data.topics.length}
        />
        <div className="h-8 lg:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}

function derive(data: SubjectDetail): {
  currentTopic: SubjectTopicItem | null;
  percentComplete: number;
} {
  const topics = data.topics;
  if (topics.length === 0) {
    return { currentTopic: null, percentComplete: 0 };
  }
  const current = topics.find((t) => !t.is_passed) ?? null;
  const passed = topics.filter((t) => t.is_passed).length;
  const percent = Math.round((passed / topics.length) * 100);
  return { currentTopic: current, percentComplete: percent };
}
