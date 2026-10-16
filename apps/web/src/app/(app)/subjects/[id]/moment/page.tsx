import type { Metadata } from "next";
import { loadSubject } from "@/lib/learning/load-subject";
import { getEnrolledSubjects } from "@/lib/learning/service.server";
import { MAX_SUBJECT_SLOTS } from "@/lib/learning/constants";
import { MomentScreen } from "@/components/subject/moment-screen";

export const metadata: Metadata = { title: "Well done · Wicky" };

// Shown once, right after a quiz progress check reports a level up or a completed subject.
export default async function SubjectMomentPage({ params }: { params: Promise<{ id: string }> }) {
  const [subject, enrolled] = await Promise.all([params.then((p) => loadSubject(p.id)), getEnrolledSubjects()]);
  const active = enrolled.filter((s) => s.status === "ACTIVE").length;
  // Level up reports on the level just passed; completion reports across every level.
  const done = subject.status === "COMPLETED" ? subject.levels : subject.levels.filter((l) => l.level === subject.level_unlocked - 1);
  return (
    <MomentScreen
      subjectId={subject.id}
      name={subject.name}
      passed={done.reduce((n, l) => n + l.passed, 0)}
      total={done.reduce((n, l) => n + l.total, 0)}
      freeSlots={Math.max(0, MAX_SUBJECT_SLOTS - active)}
    />
  );
}
