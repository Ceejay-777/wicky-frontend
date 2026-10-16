import "server-only";
import "@/lib/server-api";

import { cache } from "react";
import { apiClient } from "@wicky/api-client";

import type {
  EnrolledSubject,
  Subject,
    SubjectDetail,
  ApiSuccess
} from "@wicky/types";

export const getEnrolledSubjects = cache(
  async (): Promise<EnrolledSubject[]> => {
    const res = await apiClient.get<ApiSuccess<EnrolledSubject[]>>("/api/learning/subjects");
    return res.data;
  },
);

export const getExploreSubjects = cache(
  async (): Promise<Subject[]> => {
    const res = await apiClient.get<ApiSuccess<Subject[]>>("/api/learning/explore?limit=8");
    return res.data;
  },
);

export const getSubjectDetail = cache(
  async (id: number): Promise<SubjectDetail> => {
    const res = await apiClient.get<ApiSuccess<SubjectDetail>>(`/api/learning/subjects/${id}`);
    return res.data;
  },
);
