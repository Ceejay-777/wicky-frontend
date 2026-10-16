import type { Metadata } from "next";
import { loadSubject } from "@/lib/learning/load-subject";
import { buildRoadmap, levelNote } from "@/lib/learning/roadmap";
import { RoadmapList } from "@/components/subject/roadmap-list";

export const metadata: Metadata = { title: "Roadmap · Wicky" };

export default async function SubjectRoadmapPage({ params }: { params: Promise<{ id: string }> }) {
  const subject = await loadSubject((await params).id);
  if (subject.topics.length === 0) {
    return <p className="rounded-[14px] border-[1.5px] border-dashed border-ink p-5 text-ink-2">Topics appear here once the roadmap is written.</p>;
  }
  const levels = subject.levels.map((l) => ({ ...l, note: levelNote(subject, l.level) }));
  return <RoadmapList levels={levels} topics={buildRoadmap(subject)} />;
}
