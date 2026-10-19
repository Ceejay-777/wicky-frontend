import type { ContentStatus, ReviewStatus } from "./common";

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
