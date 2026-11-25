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

// Real values the BE sets; READING and QUIZ_READY are never used, so anything but a pass is "not passed".
export type ProgressStatus = "NOT_STARTED" | "PASSED" | "ADVANCED_PASSED";

// The signed-in learner's progress on one topic, returned with GET /topics/:id.
export interface TopicProgress {
  status: ProgressStatus;
  is_passed: boolean;
  advanced_passed: boolean;
  completed_at: string | null;
  /** When the advanced quiz was passed; null if not passed, or passed before the BE added the field. */
  advanced_completed_at: string | null;
  resource_links_viewed_at: string | null;
  /** Eligibility only: normal passed, links viewed, advanced not passed. Ignores the 1h retake cooldown. */
  advanced_quiz_available: boolean;
  /** ISO end of the 1h cooldown; null when the normal quiz can be generated now. */
  normal_quiz_available_at: string | null;
  /** Same for the advanced quiz; its cooldown is separate. */
  advanced_quiz_available_at: string | null;
  /** Next topic by `order`. `is_unlocked` is false when it sits in a level the learner has not opened. Null on the last topic. */
  next_topic: { id: number; title: string; is_unlocked: boolean } | null;
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
  progress: TopicProgress;
}

export interface OthersLearningEntry {
  user_id: number;
  display_name: string;
  status: string;
  level: number;
}
