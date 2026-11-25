import "server-only";
import { ApiRequestError } from "@wicky/api-client";
import type { QuizAttempt, QuizType } from "@wicky/types";
import { getLatestQuizAttempt, getQuizAttempt } from "./service.server";

// The attempt the result and review pages show: the one named in `?attempt=`, else the newest submitted
// attempt of `?type=` (a new tab, another device). `null` when the BE has none, or it is not submitted yet.
export async function loadSubmittedAttempt(
  topicId: number,
  q: { attempt?: string; type?: string },
): Promise<QuizAttempt | null> {
  const id = Number(q.attempt);
  const type: QuizType = q.type === "advanced" ? "ADVANCED" : "NORMAL";
  try {
    const attempt = Number.isInteger(id) && id > 0 ? await getQuizAttempt(topicId, id) : await getLatestQuizAttempt(topicId, type);
    return attempt.answers && attempt.results ? attempt : null;
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) return null;
    throw err;
  }
}
