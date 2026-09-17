import "@/lib/client-api";
import { apiClient } from "@wicky/api-client";
import type { SubjectCreateResponse, ApiSuccess } from "@wicky/types";

export async function createSubject(
  name: string,
): Promise<SubjectCreateResponse> {
  const res = await apiClient.post<ApiSuccess<SubjectCreateResponse>>(
    "/api/learning/subjects/create",
    { name },
  );
  return res.data;
}
