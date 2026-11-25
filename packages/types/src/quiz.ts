import type { QuizType } from "./common";
import type { ProgressCheckResponse } from "./subject";

// A question as the learner sees it. The BE never sends the answer or the explanation before submit.
export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
}

export type QuizStatus = "GENERATING" | "READY" | "FAILED";

// One entry per question, filled in only after the attempt is submitted.
export interface QuizResult {
  selected_index: number;
  correct_index: number;
  is_correct: boolean;
  explanation: string;
}

// The attempt object every quiz endpoint returns.
export interface QuizAttempt {
  id: number;
  status: QuizStatus;
  quiz_type: QuizType;
  attempt_number: number;
  /** [] until READY. */
  questions: QuizQuestion[];
  /** 0 until READY. */
  total_points: number;
  /** The learner's picks; null until submitted. */
  answers: number[] | null;
  /** 0 until submitted, or if failed. */
  score: number;
  passed: boolean;
  /** Null until submitted, and on attempts submitted before the BE added the field. */
  submitted_at: string | null;
  /** Null until submitted. */
  results: QuizResult[] | null;
  correct_count: number | null;
  /** 0 until READY. Not fixed: 4-6 for normal, 9-12 for advanced. */
  question_count: number;
}

export interface QuizGenerateRequest {
  quiz_type?: QuizType;
  prior_missed_questions?: string[];
}

// 202 while GENERATING, 200 otherwise. `resumed` is true when the call started no generation.
export interface QuizGenerateResponse extends QuizAttempt {
  resumed: boolean;
}

export interface QuizSubmitRequest {
  attempt_id: number;
  answers: number[];
}

export interface QuizSubmitResponse extends QuizAttempt {
  /** Set only after a passed normal quiz; same shape as the progress check. */
  level_check: ProgressCheckResponse | null;
}
