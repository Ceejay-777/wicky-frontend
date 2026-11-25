import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NoAttempt } from "@/components/quiz/no-attempt";
import { ResultView } from "@/components/quiz/result-view";
import { accentFor } from "@/lib/learning/accent";
import { loadSubmittedAttempt } from "@/lib/learning/load-attempt";
import { loadSubject } from "@/lib/learning/load-subject";
import { loadTopic } from "@/lib/learning/load-topic";
import { buildRoadmap } from "@/lib/learning/roadmap";

export const metadata: Metadata = { title: "Quiz result · Wicky" };

export default async function QuizResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ attempt?: string; type?: string }>;
}) {
  const loaded = await loadTopic((await params).id);
  if (loaded.locked) redirect("/subjects");
  const { topic } = loaded;
  const [subject, attempt] = await Promise.all([loadSubject(String(topic.subject_id)), loadSubmittedAttempt(topic.id, await searchParams)]);
  if (!attempt) return <NoAttempt topicId={topic.id} subjectName={subject.name} />;

  // Derived on the client (spec section 1): the next topic's number comes from the roadmap order.
  const { progress } = topic;
  const next = progress.next_topic;
  const nextNumber = next ? buildRoadmap(subject).find((t) => t.id === next.id)?.number : undefined;
  const advanced = attempt.quiz_type === "ADVANCED";

  return (
    <ResultView
      attempt={attempt}
      topicId={topic.id}
      title={topic.title}
      subjectId={subject.id}
      subjectName={subject.name}
      accent={accentFor(subject.id)}
      progress={{ passed: subject.topics.filter((t) => t.is_passed).length, total: subject.topics.length, percent: subject.percent_complete }}
      nextUp={next ? `${nextNumber ? `Topic ${nextNumber}: ` : ""}${next.title}` : null}
      availableAt={advanced ? progress.advanced_quiz_available_at : progress.normal_quiz_available_at}
      // An attempt submitted before the BE kept submit times still has the day it was passed.
      passedAt={advanced ? progress.advanced_completed_at : progress.completed_at}
    />
  );
}
