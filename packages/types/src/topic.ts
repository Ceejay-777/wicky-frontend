import type { ContentStatus, ReviewStatus } from "./common";

export interface ResourceLink {
  url: string;
  type: "wikipedia" | "video" | "article";
  title: string;
}

export interface Topic {
  id: number;
  title: string;
  level: number;
  order: number;
  content_status: ContentStatus;
  review_status: ReviewStatus;
  user_progress_status: string | null;
  is_passed: boolean;
  completed_at: string | null;
}

export interface TopicDetail {
  id: number;
  title: string;
  summary: string;
  resource_links: ResourceLink[];
  level: number;
  order: number;
  content_status: ContentStatus;
  review_status: ReviewStatus;
  subject_id: number;
  subject_name: string;
}

export interface OthersLearningEntry {
  user_id: number;
  display_name: string;
  status: string;
  level: number;
}
