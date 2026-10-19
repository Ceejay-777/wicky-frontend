import "server-only";
import { notFound } from "next/navigation";
import { ApiRequestError } from "@wicky/api-client";
import type { TopicDetail } from "@wicky/types";
import { getTopicDetail } from "./service.server";

// A bad id, or a topic outside the learner's subjects (BE 404), renders the not-found page.
// A topic in a locked level (BE 403) comes back as `locked`: the BE gives no subject for it.
export async function loadTopic(id: string): Promise<{ topic: TopicDetail; locked?: never } | { locked: true; topic?: never }> {
  const topicId = Number(id);
  if (!Number.isInteger(topicId) || topicId <= 0) notFound();
  try {
    return { topic: await getTopicDetail(topicId) };
  } catch (err) {
    if (err instanceof ApiRequestError) {
      if (err.status === 404) notFound();
      if (err.status === 403) return { locked: true };
    }
    throw err;
  }
}
