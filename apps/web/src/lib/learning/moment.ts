import type { ProgressCheckResponse } from "@wicky/types";

// The progress check is a POST and a level up is reported once, so the quiz flow hands the
// result to the moment screen through sessionStorage. Reading it removes it: no replay on revisit.
const key = (subjectId: number) => `wicky:moment:${subjectId}`;

export function saveMoment(subjectId: number, res: ProgressCheckResponse): boolean {
  if (res.action === "none") return false;
  try {
    sessionStorage.setItem(key(subjectId), JSON.stringify(res));
    return true;
  } catch {
    return false;
  }
}

export function takeMoment(subjectId: number): ProgressCheckResponse | null {
  try {
    const raw = sessionStorage.getItem(key(subjectId));
    if (!raw) return null;
    sessionStorage.removeItem(key(subjectId));
    return JSON.parse(raw) as ProgressCheckResponse;
  } catch {
    return null;
  }
}
