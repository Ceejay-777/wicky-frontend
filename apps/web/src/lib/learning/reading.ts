export type TextSize = "small" | "medium" | "large";

// Body text only. Medium is the designed 18px; small and large are not drawn, so they step by 2 and 3.
export const TEXT_SIZES: Record<TextSize, number> = { small: 16, medium: 18, large: 21 };
export const TEXT_SIZE_KEY = "wicky:reading-size";

// Derived on the client (spec section 18): the BE sends no read time. About 200 words a minute.
export function readMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// The summary is one text blob, treated as plain paragraphs (spec section 18).
export const toParagraphs = (summary: string) =>
  summary.split(/\n+/).map((p) => p.trim()).filter(Boolean);

// Full class names so Tailwind can see them. Long titles step down; the title is never clamped
// because the full title must stay readable on the page (spec section 9.2).
export function titleSizeClass(length: number): string {
  if (length <= 24) return "text-[44px]";
  if (length <= 44) return "text-[34px]";
  if (length <= 72) return "text-[26px]";
  return "text-[22px]";
}

// The quiz page sends the learner back here with one of these when generation is refused.
// Only known keys are read, so the URL never carries text that gets displayed.
export function quizNotice(q: { quiz?: string; minutes?: string }): string | null {
  if (q.quiz === "unavailable") return "The AI service is temporarily unavailable. Please try again shortly.";
  const m = Number(q.minutes);
  if (q.quiz === "busy" && Number.isInteger(m) && m >= 1 && m <= 60) {
    return `Please wait ${m} minute${m === 1 ? "" : "s"} before retaking this quiz.`;
  }
  return null;
}

export const isHttpUrl = (url: string) => /^https?:\/\//i.test(url);
