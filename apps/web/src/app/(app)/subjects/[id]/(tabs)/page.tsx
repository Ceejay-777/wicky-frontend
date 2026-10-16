import type { Metadata } from "next";
import { loadSubject } from "@/lib/learning/load-subject";
import { buildRoadmap, currentTopicOf } from "@/lib/learning/roadmap";
import { CurrentTopicCard } from "@/components/subject/current-topic-card";
import { ProgressCard } from "@/components/subject/progress-card";
import { LevelSummary } from "@/components/subject/level-summary";
import { ReminderRow } from "@/components/subject/reminder-row";
import { RemoveSubject } from "@/components/subject/remove-subject";

export const metadata: Metadata = { title: "Subject · Wicky" };

export default async function SubjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const subject = await loadSubject((await params).id);
  const topics = buildRoadmap(subject);
  return (
    // Tablet: 1.2fr / 1fr. Desktop: two equal columns, current topic and progress left.
    <div className="grid items-start gap-3.5 md:grid-cols-[1.2fr_1fr] md:gap-8 xl:grid-cols-2 xl:gap-12">
      <div className="flex flex-col gap-3.5">
        <CurrentTopicCard subjectId={subject.id} topic={currentTopicOf(topics)} roadmapEmpty={topics.length === 0} />
        <ProgressCard subject={subject} percent={subject.percent_complete} passed={topics.filter((t) => t.is_passed).length} total={topics.length} />
      </div>
      <div className="flex flex-col gap-3.5">
        <LevelSummary subject={subject} />
        <ReminderRow hours={subject.notification_frequency_hours} nextDueAt={subject.next_due_at} />
        <RemoveSubject subjectId={subject.id} name={subject.name} />
      </div>
    </div>
  );
}
