import type { QuizType } from "./common";

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correct_index: number;
  explanation: string;
}

export interface QuizGenerateRequest {
  quiz_type?: QuizType;
  prior_missed_questions?: string[];
}

export interface QuizGenerateResponse {
  id: number;
  quiz_type: QuizType;
  attempt_number: number;
  questions: QuizQuestion[];
  total_points: number;
}

export interface QuizSubmitRequest {
  attempt_id: number;
  answers: number[];
}

export interface QuizSubmitResponse {
  id: number;
  passed: boolean;
  score: number;
  total_points: number;
  attempt_number: number;
  quiz_type: QuizType;
}
