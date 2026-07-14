export interface ApiSuccess<T> {
  data: T;
  status: "success";
}

export interface ApiError {
  detail: string;
  status: "error";
  errors?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type ContentStatus = "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED";
export type ReviewStatus = "PENDING" | "PASSED" | "FAILED" | "FLAGGED";
export type SubjectStatus = "ACTIVE" | "COMPLETED";
export type QuizType = "NORMAL" | "ADVANCED";
