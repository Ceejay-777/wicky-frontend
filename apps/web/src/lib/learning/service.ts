import { apiClient } from "@wicky/api-client";
import type {
  ApiSuccess,
  EnrolledSubject,
  Subject,
  UserProfile,
} from "@wicky/types";

type WrappedUserProfile = ApiSuccess<UserProfile>;

export async function getProfile(): Promise<UserProfile> {
  const res = await apiClient.get<WrappedUserProfile>("/api/profile/");
  return res.data;
}

export async function getEnrolledSubjects(): Promise<EnrolledSubject[]> {
  return apiClient.get<EnrolledSubject[]>("/api/learning/subjects");
}

export async function getExploreSubjects(): Promise<Subject[]> {
  return apiClient.get<Subject[]>("/api/learning/explore");
}

export { ApiRequestError } from "@/lib/api";
