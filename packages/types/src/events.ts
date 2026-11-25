import type { ContentStatus, QuizType, ReviewStatus } from "./common";

// Payloads of GET /api/events. They only say "something changed": re-fetch, never render from them.
export interface TopicStatusEvent {
  subject_id: number;
  topic_id: number;
  content_status: Exclude<ContentStatus, "GENERATING">;
  review_status: ReviewStatus;
}

export interface RoadmapStatusEvent {
  subject_id: number;
  roadmap_status: ContentStatus;
  topic_count: number;
}

// Sent only to the learner who started the quiz, when an attempt becomes READY or FAILED.
export interface QuizStatusEvent {
  subject_id: number;
  topic_id: number;
  attempt_id: number;
  quiz_type: QuizType;
  status: "READY" | "FAILED";
}
