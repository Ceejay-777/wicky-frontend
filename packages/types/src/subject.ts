import type { ContentStatus, ReviewStatus, SubjectStatus } from "./common";

export interface Subject {
  id: number;
  name: string;
  enrollment_count: number;
  is_enrolled: boolean;
  is_completed: boolean;
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
}

export interface SubjectTopicItem {
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
