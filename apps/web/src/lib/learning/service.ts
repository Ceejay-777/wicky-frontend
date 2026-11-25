import "@/lib/client-api";
import { apiClient } from "@wicky/api-client";
import type { ApiSuccess, ContentStatus, ProgressCheckResponse, QuizAttempt, QuizGenerateResponse, QuizSubmitResponse, QuizType, SubjectCreateResponse } from "@wicky/types";

export async function createSubject(
  name: string,
): Promise<SubjectCreateResponse> {
  const res = await apiClient.post<ApiSuccess<SubjectCreateResponse>>(
    "/api/learning/subjects/create",
    { name },
  );
  return res.data;
}

export async function addSubject(id: number): Promise<void> {
  await apiClient.post(`/api/learning/subjects/${id}/add`);
}

export async function removeSubject(id: number): Promise<void> {
  await apiClient.delete(`/api/learning/subjects/${id}/remove`);
}

export async function retryRoadmap(id: number): Promise<ContentStatus> {
  const res = await apiClient.post<ApiSuccess<{ roadmap_status: ContentStatus }>>(
    `/api/learning/subjects/${id}/roadmap/retry`,
  );
  return res.data.roadmap_status;
}

export async function checkProgress(id: number): Promise<ProgressCheckResponse> {
  const res = await apiClient.post<ApiSuccess<ProgressCheckResponse>>(
    `/api/learning/subjects/${id}/progress/check`,
  );
  return res.data;
}

// Restarts a FAILED topic; the result is normally GENERATING. Completion arrives as a topic.status event.
export async function retryTopic(id: number): Promise<ContentStatus> {
  const res = await apiClient.post<ApiSuccess<{ content_status: ContentStatus }>>(`/api/learning/topics/${id}/retry`);
  return res.data.content_status;
}

// Prerequisite for the advanced quiz. Null until the BE has recorded a view.
export async function markResourceLinksViewed(topicId: number): Promise<string | null> {
  const res = await apiClient.post<ApiSuccess<{ resource_links_viewed_at: string | null }>>(
    `/api/learning/topics/${topicId}/resource-links-viewed`,
  );
  return res.data.resource_links_viewed_at;
}

// Starts a quiz or hands back the learner's unfinished one, so calling it on page load is safe. It does not wait
// for the AI: GENERATING (202) means the questions arrive later, with a quiz.status event.
// To retry a FAILED quiz, call it again.
export async function generateQuiz(topicId: number, quizType: QuizType): Promise<QuizGenerateResponse> {
  const res = await apiClient.post<ApiSuccess<QuizGenerateResponse>>(`/api/learning/topics/${topicId}/quiz/generate`, { quiz_type: quizType });
  return res.data;
}

export async function getQuizAttempt(topicId: number, attemptId: number): Promise<QuizAttempt> {
  const res = await apiClient.get<ApiSuccess<QuizAttempt>>(`/api/learning/topics/${topicId}/quiz/attempts/${attemptId}`);
  return res.data;
}

// One time per attempt: the BE refuses a second submit of the same attempt.
export async function submitQuiz(topicId: number, attemptId: number, answers: number[]): Promise<QuizSubmitResponse> {
  const res = await apiClient.post<ApiSuccess<QuizSubmitResponse>>(`/api/learning/topics/${topicId}/quiz/submit`, { attempt_id: attemptId, answers });
  return res.data;
}
