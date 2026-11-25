import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ApiRequestError } from "@wicky/api-client";
import { QuizHub, type QuizHubItem } from "@/components/quiz/quiz-hub";
import { accentFor } from "@/lib/learning/accent";
import { waitMinutes } from "@/lib/learning/reading";
import { getEnrolledSubjects } from "@/lib/learning/service.server";

export const metadata: Metadata = { title: "Quizzes · Wicky" };

export default async function QuizHubPage() {
  const subjects = await getEnrolledSubjects().catch((err) => {
    if (err instanceof ApiRequestError && err.status === 401) redirect("/signin");
    throw err;
  });

  // The subject list carries the current topic's level, number and cooldown, so a card needs no topic request.
  const items: QuizHubItem[] = subjects.flatMap((s) =>
    s.status === "ACTIVE" && s.current_topic
      ? [
          {
            topicId: s.current_topic.id,
            title: s.current_topic.title,
            subjectName: s.name,
            accent: accentFor(s.id),
            level: s.current_topic.level,
            number: s.current_topic.order,
            wait: waitMinutes(s.current_topic.normal_quiz_available_at),
            availableAt: s.current_topic.normal_quiz_available_at,
          },
        ]
      : [],
  );

  return <QuizHub items={items} />;
}
