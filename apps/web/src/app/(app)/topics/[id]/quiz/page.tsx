import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuizFlow } from "@/components/quiz/quiz-flow";
import { loadTopic } from "@/lib/learning/load-topic";
import { waitMinutes } from "@/lib/learning/reading";

export const metadata: Metadata = { title: "Quiz · Wicky" };

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const loaded = await loadTopic((await params).id);
  if (loaded.locked) redirect("/subjects");
  const { topic } = loaded;
  const { progress } = topic;
  const advanced = (await searchParams).type === "advanced";
  const back = `/topics/${topic.id}`;

  // The topic page only offers a quiz that can start, so these are stale links. The BE stays the judge: it checks again on generate.
  if (topic.content_status !== "READY" || (advanced ? !progress.advanced_quiz_available : progress.is_passed)) redirect(back);
  const wait = waitMinutes(advanced ? progress.advanced_quiz_available_at : progress.normal_quiz_available_at);
  if (wait) redirect(`${back}?quiz=busy&minutes=${Math.min(wait, 60)}`);

  return <QuizFlow topicId={topic.id} title={topic.title} subjectName={topic.subject_name} quizType={advanced ? "ADVANCED" : "NORMAL"} />;
}
