import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NoAttempt } from "@/components/quiz/no-attempt";
import { ReviewView } from "@/components/quiz/review-view";
import { loadSubmittedAttempt } from "@/lib/learning/load-attempt";
import { loadTopic } from "@/lib/learning/load-topic";

export const metadata: Metadata = { title: "Review answers · Wicky" };

export default async function QuizReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ attempt?: string; type?: string }>;
}) {
  const loaded = await loadTopic((await params).id);
  if (loaded.locked) redirect("/subjects");
  const { topic } = loaded;
  const attempt = await loadSubmittedAttempt(topic.id, await searchParams);
  if (!attempt) return <NoAttempt topicId={topic.id} subjectName={topic.subject_name} review />;
  return <ReviewView attempt={attempt} topicId={topic.id} />;
}
