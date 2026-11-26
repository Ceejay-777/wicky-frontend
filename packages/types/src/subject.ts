import type { ContentStatus, ReviewStatus, SubjectStatus } from "./common";

// GET /explore item: enrolled subjects are excluded by the BE, so no enrolled/completed flags.
export interface Subject {
  id: number;
  name: string;
  enrollment_count: number;
  topic_count: number;
  is_interested: boolean;
}

export interface EnrolledSubject {
  id: number;
  name: string;
  status: SubjectStatus;
  points: number;
  level_unlocked: number;
  topics_total: number;
  topics_passed: number;
  topics_advanced_passed: number;
  percent_complete: number;
  created_at: string;
  notification_frequency_hours: number;
  next_due_at: string | null;
  /** Enough to draw a quiz card without opening the topic (opening a topic starts its content generation). */
  current_topic: {
    id: number;
    title: string;
    level: number;
    /** Topic number, a running 1..N across the subject. */
    order: number;
    /** ISO end of the normal quiz cooldown; null when a quiz can start. */
    normal_quiz_available_at: string | null;
  } | null;
}

export interface SubjectTopicItem {
  id: number;
  title: string;
  /** One-sentence goal of the topic; "" when the roadmap has none. */
  description: string;
  level: number;
  order: number;
  content_status: ContentStatus;
  review_status: ReviewStatus;
  user_progress_status: string | null;
  is_passed: boolean;
  advanced_passed: boolean;
  completed_at: string | null;
  resource_links_viewed_at: string | null;
}

export interface SubjectLevelProgress {
  level: number;
  total: number;
  passed: number;
  threshold: number;
  is_unlocked: boolean;
}

export interface SubjectDetail {
  id: number;
  name: string;
  status: SubjectStatus;
  points: number;
  level_unlocked: number;
  created_at: string;
  notification_frequency_hours: number;
  next_due_at: string | null;
  roadmap_status: ContentStatus;
  percent_complete: number;
  levels: SubjectLevelProgress[];
  topics: SubjectTopicItem[];
}

export interface SubjectSuggestion {
  id: number;
  name: string;
  reason: string;
}

export interface ProgressCheckResponse {
  action: "none" | "level_up" | "subject_completed";
  new_level_unlocked?: number;
  slots_available?: number;
  needs_subject_selection?: boolean;
  suggestions: SubjectSuggestion[];
}

export interface NotificationStatus {
  frequency_hours: number | null;
  next_due_at: string | null;
}

export interface SubjectCreateRequest {
  name: string;
}

export interface SubjectCreateResolved {
  action: "resolved";
  subject: { id: number; name: string };
}

export interface SubjectCreateNarrow {
  action: "narrow";
  suggestion: string;
}

export type SubjectCreateResponse = SubjectCreateResolved | SubjectCreateNarrow;
