import "server-only";
import "@/lib/server-api";

import { cache } from "react";
import { apiClient } from "@wicky/api-client";

import type {
  ApiSuccess,
  EnrolledSubject,
  OthersLearningEntry,
  Subject,
  SubjectDetail,
  TopicLeaderboardEntry,
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

// The BE filters before its limit; enrolled subjects drop out of the list.
export const getStarredSubjects = cache(
  async (): Promise<Subject[]> => {
    const res = await apiClient.get<ApiSuccess<Subject[]>>("/api/learning/explore?interested=true");
    return res.data;
  },
);

// Same row shape as the topic board.
export const getSubjectLeaderboard = cache(
  async (subjectId: number): Promise<TopicLeaderboardEntry[]> => {
    const res = await apiClient.get<ApiSuccess<TopicLeaderboardEntry[]>>(`/api/learning/subjects/${subjectId}/leaderboard`);
    return res.data;
  },
);

export const getTopicLeaderboard = cache(
  async (topicId: number): Promise<TopicLeaderboardEntry[]> => {
    const res = await apiClient.get<ApiSuccess<TopicLeaderboardEntry[]>>(`/api/learning/topics/${topicId}/leaderboard`);
    return res.data;
  },
);

export const getOthersLearning = cache(
  async (topicId: number): Promise<OthersLearningEntry[]> => {
    const res = await apiClient.get<ApiSuccess<OthersLearningEntry[]>>(`/api/learning/topics/${topicId}/others-learning`);
    return res.data;
  },
);
