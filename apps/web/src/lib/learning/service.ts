import "@/lib/client-api";
import { apiClient } from "@wicky/api-client";
import type { ApiSuccess, ContentStatus, ProgressCheckResponse, SubjectCreateResponse } from "@wicky/types";

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
